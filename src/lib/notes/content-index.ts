import "server-only"

import { execFile } from "node:child_process"
import fs from "node:fs/promises"
import { promisify } from "node:util"
import path from "node:path"
import matter from "gray-matter"
import { cache } from "react"
import type { NoteKind } from "@/lib/types"
import { normalizeNoteSlug } from "../note-links"

const EXTRACRANIAL_ROOT = process.cwd()
const RESEARCH_ROOT = path.join(EXTRACRANIAL_ROOT, "Research")
const POSTS_ROOT = path.join(RESEARCH_ROOT, "posts")
const RESEARCH_ASSETS_ROOT = path.join(RESEARCH_ROOT, "assets")

const MARKDOWN_EXTENSIONS = new Set([".md", ".mdx"])
const SKIPPED_DIRECTORIES = new Set([".obsidian", "assets", "templates"])
const POSTS_LOCALES = new Set(["en", "ko"])
const execFileAsync = promisify(execFile)

export interface SourceNote {
  aliases: string[]
  content: string
  date?: string
  description?: string
  dirPath: string
  editUrl?: string
  filePath: string
  kind: NoteKind
  lastEditedAt?: number
  locale: string
  slug: string
  title: string
}

interface ContentIndex {
  notesBySlug: Map<string, Map<string, SourceNote>>
  titleLookup: Map<string, string>
}

function normalizeLookupKey(value: string): string {
  return value.normalize("NFC").trim().toLowerCase()
}

function toSlug(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim()) {
    return normalizeNoteSlug(value)
  }
  return normalizeNoteSlug(fallback)
}

function parseAliases(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === "string")
  }

  if (typeof value === "string" && value.trim()) {
    return [value]
  }

  return []
}

function inferKind(filePath: string): NoteKind {
  if (filePath.startsWith(POSTS_ROOT)) {
    return "blog"
  }

  if (filePath.includes(`${path.sep}journals${path.sep}`)) {
    return "journal"
  }

  return "research"
}

function inferLocale(filePath: string, frontmatterLang: unknown): string {
  if (filePath.startsWith(POSTS_ROOT)) {
    const baseName = path.basename(filePath, path.extname(filePath))
    if (POSTS_LOCALES.has(baseName)) {
      return baseName
    }
  }

  if (typeof frontmatterLang === "string" && frontmatterLang.trim()) {
    return frontmatterLang
  }

  return "en"
}

function buildEditUrl(filePath: string): string | undefined {
  const relativePath = path.relative(EXTRACRANIAL_ROOT, filePath).split(path.sep)
  if (relativePath.length === 0) {
    return undefined
  }

  return `https://github.com/anaclumos/extracranial/tree/main/${relativePath.join("/")}`
}

function parseDate(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) {
    return value
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().split("T")[0]
  }

  return undefined
}

async function collectMarkdownFiles(root: string): Promise<string[]> {
  const entries = await fs.readdir(root, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name)

    if (entry.isDirectory()) {
      if (SKIPPED_DIRECTORIES.has(entry.name)) {
        continue
      }
      files.push(...(await collectMarkdownFiles(fullPath)))
      continue
    }

    if (MARKDOWN_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }

  return files
}

async function getGitTimestampsByPath(): Promise<Map<string, number>> {
  const { stdout } = await execFileAsync(
    "git",
    [
      "-C",
      EXTRACRANIAL_ROOT,
      "log",
      "--name-only",
      "--format=__COMMIT__ %ct",
      "--",
      "Research",
    ],
    {
      maxBuffer: 16 * 1024 * 1024,
    }
  )

  const timestampsByPath = new Map<string, number>()
  let currentTimestamp: number | null = null

  for (const line of stdout.split("\n")) {
    if (!line.trim()) {
      continue
    }

    if (line.startsWith("__COMMIT__ ")) {
      const rawTimestamp = line.slice("__COMMIT__ ".length).trim()
      const parsedTimestamp = Number.parseInt(rawTimestamp, 10)
      currentTimestamp = Number.isFinite(parsedTimestamp) ? parsedTimestamp : null
      continue
    }

    if (currentTimestamp === null || timestampsByPath.has(line)) {
      continue
    }

    timestampsByPath.set(path.join(EXTRACRANIAL_ROOT, line), currentTimestamp)
  }

  return timestampsByPath
}

const getCachedGitTimestampsByPath = cache(getGitTimestampsByPath)

async function readSourceNote(filePath: string): Promise<SourceNote | null> {
  const fileContents = await fs.readFile(filePath, "utf8")
  const { data, content } = matter(fileContents)
  const fallbackSlug = path.basename(filePath, path.extname(filePath))
  const slug = toSlug(data.slug, fallbackSlug)

  if (!slug) {
    return null
  }

  return {
    aliases: parseAliases(data.aliases),
    content,
    date: parseDate(data.date),
    description: typeof data.description === "string" ? data.description : undefined,
    dirPath: path.dirname(filePath),
    editUrl: buildEditUrl(filePath),
    filePath,
    kind: inferKind(filePath),
    lastEditedAt: undefined,
    locale: inferLocale(filePath, data.lang),
    slug,
    title:
      typeof data.title === "string" && data.title.trim()
        ? data.title
        : path.basename(filePath, path.extname(filePath)),
  }
}

function registerLookup(
  lookup: Map<string, string>,
  label: string | undefined,
  slug: string
) {
  if (!label) {
    return
  }

  const key = normalizeLookupKey(label)
  if (key && !lookup.has(key)) {
    lookup.set(key, slug)
  }
}

export const getContentIndex = cache(async (): Promise<ContentIndex> => {
  const [researchFiles, postFiles] = await Promise.all([
    collectMarkdownFiles(RESEARCH_ROOT),
    collectMarkdownFiles(POSTS_ROOT),
  ])
  const timestampsByPath = await getCachedGitTimestampsByPath()

  const notesBySlug = new Map<string, Map<string, SourceNote>>()
  const titleLookup = new Map<string, string>()

  for (const filePath of [...researchFiles, ...postFiles]) {
    const note = await readSourceNote(filePath)
    if (!note) {
      continue
    }

    note.lastEditedAt = timestampsByPath.get(filePath)

    const localeNotes = notesBySlug.get(note.slug) ?? new Map<string, SourceNote>()
    localeNotes.set(note.locale, note)
    notesBySlug.set(note.slug, localeNotes)

    registerLookup(titleLookup, note.slug, note.slug)
    registerLookup(titleLookup, note.title, note.slug)
    registerLookup(
      titleLookup,
      path.basename(note.filePath, path.extname(note.filePath)),
      note.slug
    )

    for (const alias of note.aliases) {
      registerLookup(titleLookup, alias, note.slug)
    }
  }

  return { notesBySlug, titleLookup }
})

export function pickNoteForLocale(
  variants: Map<string, SourceNote>,
  locale: string
): SourceNote | null {
  return (
    variants.get(locale) ??
    variants.get("en") ??
    variants.get("ko") ??
    variants.values().next().value ??
    null
  )
}

export const getSourceNoteBySlug = cache(
  async (slug: string, locale: string): Promise<SourceNote | null> => {
    const { notesBySlug } = await getContentIndex()
    const variants = notesBySlug.get(slug)
    if (!variants) {
      return null
    }
    return pickNoteForLocale(variants, locale)
  }
)

export async function getSourceNoteBySlugAnyLocale(
  slug: string
): Promise<SourceNote | null> {
  const { notesBySlug } = await getContentIndex()
  const variants = notesBySlug.get(slug)
  if (!variants) {
    return null
  }
  return pickNoteForLocale(variants, "en")
}

export async function getAllNoteSlugs(): Promise<string[]> {
  const { notesBySlug } = await getContentIndex()
  return Array.from(notesBySlug.keys()).sort()
}

export async function getLatestJournalSlug(
  locale: string,
  maxDate?: string
): Promise<string | null> {
  const { notesBySlug } = await getContentIndex()
  let latestSlug: string | null = null
  let latestDate = ""

  for (const [slug, variants] of notesBySlug.entries()) {
    const note = pickNoteForLocale(variants, locale)
    if (!(note && note.kind === "journal" && note.date)) {
      continue
    }

    if (maxDate && note.date > maxDate) {
      continue
    }

    if (note.date > latestDate) {
      latestDate = note.date
      latestSlug = slug
    }
  }

  return latestSlug
}

export async function resolveLookupSlug(reference: string): Promise<string | null> {
  const { titleLookup, notesBySlug } = await getContentIndex()
  const trimmed = reference.trim()
  if (!trimmed) {
    return null
  }

  const directSlug = normalizeNoteSlug(trimmed)
  if (directSlug && notesBySlug.has(directSlug)) {
    return directSlug
  }

  const withoutExtension = trimmed.replace(/\.(md|mdx)$/i, "")
  return titleLookup.get(normalizeLookupKey(withoutExtension)) ?? null
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    const stats = await fs.stat(filePath)
    return stats.isFile()
  } catch {
    return false
  }
}

export async function resolveAssetPathForNote(
  slug: string,
  requestedPath: string[]
): Promise<string | null> {
  const note = await getSourceNoteBySlugAnyLocale(slug)
  if (!note) {
    return null
  }

  const relativeAssetPath = requestedPath
    .map((segment) => decodeURIComponent(segment))
    .join("/")
  const localCandidate = path.resolve(note.dirPath, relativeAssetPath)
  if (
    localCandidate.startsWith(note.dirPath) &&
    (await fileExists(localCandidate))
  ) {
    return localCandidate
  }

  const fallbackCandidate = path.join(
    RESEARCH_ASSETS_ROOT,
    path.basename(relativeAssetPath)
  )
  if (await fileExists(fallbackCandidate)) {
    return fallbackCandidate
  }

  return null
}
