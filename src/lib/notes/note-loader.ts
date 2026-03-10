import type { Note, NoteGraphNode, SerializedNoteContent } from "@/lib/types";
import {
  getAllNoteSlugs,
  getContentIndex,
  getSourceNoteBySlug,
  type SourceNote,
} from "./content-index";
import {
  extractOutboundLinks,
  generateExcerpt,
  preprocessNoteSource,
} from "./source-transform";

const noteCache = new Map<string, Promise<Note | null>>();
const noteGraphNodeCache = new Map<string, Promise<NoteGraphNode | null>>();

function getNoteCacheKey(slug: string, locale: string) {
  return `${locale}:${slug}`;
}

async function parseAndSerialize(note: SourceNote) {
  const { titleLookup } = await getContentIndex();
  const serializedContent = preprocessNoteSource(
    note,
    titleLookup
  ) as SerializedNoteContent;

  return {
    content: note.content,
    excerpt: generateExcerpt(note.content),
    outboundLinks: extractOutboundLinks(note, titleLookup),
    serializedContent,
  };
}

export function loadNote(slug: string, locale = "en"): Promise<Note | null> {
  const cacheKey = getNoteCacheKey(slug, locale);
  const cachedNote = noteCache.get(cacheKey);
  if (cachedNote) {
    return cachedNote;
  }

  const notePromise = loadNoteUncached(slug, locale).catch((error: unknown) => {
    noteCache.delete(cacheKey);
    throw error;
  });

  noteCache.set(cacheKey, notePromise);
  return notePromise;
}

async function loadNoteUncached(
  slug: string,
  locale = "en"
): Promise<Note | null> {
  const sourceNote = await getSourceNoteBySlug(slug, locale);
  if (!sourceNote) {
    return null;
  }

  const { content, excerpt, serializedContent } =
    await parseAndSerialize(sourceNote);

  return {
    slug,
    date: sourceNote.date,
    description: sourceNote.description,
    editUrl: sourceNote.editUrl,
    kind: sourceNote.kind,
    lastModified: sourceNote.lastModified,
    locale: sourceNote.locale,
    content,
    serializedContent,
    excerpt,
    title: sourceNote.title || slug,
  };
}

function loadNoteGraphNode(
  slug: string,
  locale = "en"
): Promise<NoteGraphNode | null> {
  const cacheKey = getNoteCacheKey(slug, locale);
  const cachedNoteGraphNode = noteGraphNodeCache.get(cacheKey);
  if (cachedNoteGraphNode) {
    return cachedNoteGraphNode;
  }

  const noteGraphNodePromise = loadNoteGraphNodeUncached(slug, locale).catch(
    (error: unknown) => {
      noteGraphNodeCache.delete(cacheKey);
      throw error;
    }
  );

  noteGraphNodeCache.set(cacheKey, noteGraphNodePromise);
  return noteGraphNodePromise;
}

async function loadNoteGraphNodeUncached(
  slug: string,
  locale = "en"
): Promise<NoteGraphNode | null> {
  const sourceNote = await getSourceNoteBySlug(slug, locale);
  if (!sourceNote) {
    return null;
  }

  const { titleLookup } = await getContentIndex();
  const outboundLinks = extractOutboundLinks(sourceNote, titleLookup);

  return {
    slug,
    date: sourceNote.date,
    description: sourceNote.description,
    editUrl: sourceNote.editUrl,
    kind: sourceNote.kind,
    lastModified: sourceNote.lastModified,
    locale: sourceNote.locale,
    content: sourceNote.content,
    outboundLinks,
    title: sourceNote.title || slug,
  };
}

export async function loadAllNoteGraphNodes(
  locale = "en"
): Promise<NoteGraphNode[]> {
  const slugs = await getAllNoteSlugs();
  const notes = await Promise.all(
    slugs.map((slug) => loadNoteGraphNode(slug, locale))
  );
  return notes.filter((note): note is NoteGraphNode => note !== null);
}
