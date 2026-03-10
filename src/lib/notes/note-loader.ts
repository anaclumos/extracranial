import type { Note, NoteGraphNode } from "@/lib/types";
import {
  getAllNoteSlugs,
  getContentIndex,
  getSourceNoteBySlug,
} from "./content-index";
import { parseMarkdown } from "./markdown-parser";
import { extractOutboundLinks } from "./source-transform";

export async function loadNote(
  slug: string,
  locale = "en"
): Promise<Note | null> {
  const sourceNote = await getSourceNoteBySlug(slug, locale);
  if (!sourceNote) {
    return null;
  }

  const { content, data, excerpt, serializedContent } =
    await parseMarkdown(sourceNote);

  return {
    slug,
    date: sourceNote.date,
    description: data.description,
    editUrl: sourceNote.editUrl,
    kind: sourceNote.kind,
    lastModified: sourceNote.lastModified,
    locale: sourceNote.locale,
    content,
    serializedContent,
    excerpt,
    title: data.title || sourceNote.title || slug,
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
