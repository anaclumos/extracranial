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

export async function loadNote(
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

async function loadNoteGraphNode(
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
