import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { NoteKind } from "@/lib/types";
import { normalizeNoteSlug } from "../note-links";

export interface SourceNoteBase {
  content: string;
  dirPath?: string;
  slug: string;
}

export interface SourceNote extends SourceNoteBase {
  aliases: string[];
  date?: string;
  description?: string;
  dirPath: string;
  editUrl?: string;
  filePath: string;
  kind: NoteKind;
  lastModified?: number;
  title: string;
}

const EXTRACRANIAL_ROOT = process.cwd();
const LIBRARY_ROOT = path.join(EXTRACRANIAL_ROOT, "library");
const POSTS_ROOT = path.join(LIBRARY_ROOT, "posts");
const LIBRARY_ASSETS_ROOT = path.join(LIBRARY_ROOT, "assets");

const MARKDOWN_EXTENSIONS = new Set([".md", ".mdx"]);
const MARKDOWN_SUFFIX_RE = /\.(md|mdx)$/i;
const SKIPPED_DIRECTORIES = new Set([".obsidian", "assets", "templates"]);
const GENERIC_BASENAMES = new Set(["en", "index", "ko"]);

interface ContentIndex {
  notesBySlug: Map<string, SourceNote>;
  titleLookup: Map<string, string>;
}

let contentIndexCache: Promise<ContentIndex> | null = null;

function normalizeLookupKey(value: string): string {
  return value.normalize("NFC").trim().toLowerCase();
}

function toSlug(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim()) {
    return normalizeNoteSlug(value);
  }
  return normalizeNoteSlug(fallback);
}

function parseAliases(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === "string");
  }

  if (typeof value === "string" && value.trim()) {
    return [value];
  }

  return [];
}

function inferKind(filePath: string): NoteKind {
  if (filePath.startsWith(POSTS_ROOT)) {
    return "blog";
  }

  if (filePath.includes(`${path.sep}journals${path.sep}`)) {
    return "journal";
  }

  return "research";
}

function buildEditUrl(filePath: string): string | undefined {
  const relativePath = path
    .relative(EXTRACRANIAL_ROOT, filePath)
    .split(path.sep);
  if (relativePath.length === 0) {
    return undefined;
  }

  return `https://github.com/anaclumos/extracranial/tree/main/${relativePath.join("/")}`;
}

function parseDate(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().split("T")[0];
  }

  return undefined;
}

function parseTimestamp(value: unknown): number | undefined {
  if (typeof value === "string" && value.trim()) {
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) {
      return Math.floor(parsed / 1000);
    }
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return Math.floor(value.getTime() / 1000);
  }

  return undefined;
}

async function collectMarkdownFiles(root: string): Promise<string[]> {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const files: string[] = [];
  const subdirPromises: Promise<string[]>[] = [];

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);

    if (entry.isDirectory()) {
      if (SKIPPED_DIRECTORIES.has(entry.name)) {
        continue;
      }
      subdirPromises.push(collectMarkdownFiles(fullPath));
      continue;
    }

    if (MARKDOWN_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  const subdirResults = await Promise.all(subdirPromises);
  return files.concat(...subdirResults);
}

async function readSourceNote(filePath: string): Promise<SourceNote | null> {
  const fileContents = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const fallbackSlug = path.basename(filePath, path.extname(filePath));
  const slug = toSlug(data.slug, fallbackSlug);

  if (!slug) {
    return null;
  }

  return {
    aliases: parseAliases(data.aliases),
    content,
    date: parseDate(data.date),
    description:
      typeof data.description === "string" ? data.description : undefined,
    dirPath: path.dirname(filePath),
    editUrl: buildEditUrl(filePath),
    filePath,
    kind: inferKind(filePath),
    lastModified:
      parseTimestamp(data.last_modified) ?? parseTimestamp(data.updatedAt),
    slug,
    title:
      typeof data.title === "string" && data.title.trim()
        ? data.title
        : path.basename(filePath, path.extname(filePath)),
  };
}

function registerLookup(
  lookup: Map<string, string>,
  label: string | undefined,
  slug: string
) {
  if (!label) {
    return;
  }

  const key = normalizeLookupKey(label);
  if (key && !lookup.has(key)) {
    lookup.set(key, slug);
  }
}

async function buildContentIndex(): Promise<ContentIndex> {
  const allFiles = await collectMarkdownFiles(LIBRARY_ROOT);

  const notesBySlug = new Map<string, SourceNote>();
  const titleLookup = new Map<string, string>();

  const BATCH = 32;
  for (let i = 0; i < allFiles.length; i += BATCH) {
    const batch = allFiles.slice(i, i + BATCH);
    const notes = await Promise.all(batch.map(readSourceNote));

    for (const note of notes) {
      if (!note) {
        continue;
      }

      const existingNote = notesBySlug.get(note.slug);
      if (existingNote) {
        throw new Error(
          `Duplicate slug ${note.slug} in ${existingNote.filePath} and ${note.filePath}`
        );
      }
      notesBySlug.set(note.slug, note);

      registerLookup(titleLookup, note.slug, note.slug);
      registerLookup(titleLookup, note.title, note.slug);
      const baseName = path.basename(
        note.filePath,
        path.extname(note.filePath)
      );
      if (!GENERIC_BASENAMES.has(baseName)) {
        registerLookup(titleLookup, baseName, note.slug);
      }

      for (const alias of note.aliases) {
        registerLookup(titleLookup, alias, note.slug);
      }
    }
  }

  return { notesBySlug, titleLookup };
}

export function getContentIndex(): Promise<ContentIndex> {
  if (!contentIndexCache) {
    contentIndexCache = buildContentIndex().catch((error: unknown) => {
      contentIndexCache = null;

      throw new Error("Failed to initialize content index cache", {
        cause: error,
      });
    });
  }

  return contentIndexCache;
}

export async function getSourceNoteBySlug(
  slug: string
): Promise<SourceNote | null> {
  const { notesBySlug } = await getContentIndex();
  return notesBySlug.get(slug) ?? null;
}

export async function getAllNoteSlugs(): Promise<string[]> {
  const { notesBySlug } = await getContentIndex();
  return Array.from(notesBySlug.keys()).sort();
}

export async function getLatestJournalSlug(
  maxDate?: string
): Promise<string | null> {
  const { notesBySlug } = await getContentIndex();
  let latestSlug: string | null = null;
  let latestDate = "";

  for (const [slug, note] of notesBySlug.entries()) {
    if (!(note.kind === "journal" && note.date)) {
      continue;
    }

    if (maxDate && note.date > maxDate) {
      continue;
    }

    if (note.date > latestDate) {
      latestDate = note.date;
      latestSlug = slug;
    }
  }

  return latestSlug;
}

export async function resolveLookupSlug(
  reference: string
): Promise<string | null> {
  const { titleLookup, notesBySlug } = await getContentIndex();
  const trimmed = reference.trim();
  if (!trimmed) {
    return null;
  }

  const directSlug = normalizeNoteSlug(trimmed);
  if (directSlug && notesBySlug.has(directSlug)) {
    return directSlug;
  }

  const withoutExtension = trimmed.replace(MARKDOWN_SUFFIX_RE, "");
  return titleLookup.get(normalizeLookupKey(withoutExtension)) ?? null;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    const stats = await fs.stat(filePath);
    return stats.isFile();
  } catch {
    return false;
  }
}

export async function resolveAssetPathForNote(
  slug: string,
  requestedPath: string[]
): Promise<string | null> {
  const note = await getSourceNoteBySlug(slug);
  if (!note) {
    return null;
  }

  const relativeAssetPath = requestedPath
    .map((segment) => decodeURIComponent(segment))
    .join("/");
  const localCandidate = path.resolve(note.dirPath, relativeAssetPath);
  if (
    localCandidate.startsWith(note.dirPath) &&
    (await fileExists(localCandidate))
  ) {
    return localCandidate;
  }

  const fallbackCandidate = path.join(
    LIBRARY_ASSETS_ROOT,
    path.basename(relativeAssetPath)
  );
  if (await fileExists(fallbackCandidate)) {
    return fallbackCandidate;
  }

  return null;
}
