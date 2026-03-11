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

export function loadNote(slug: string): Promise<Note | null> {
  const cachedNote = noteCache.get(slug);
  if (cachedNote) {
    return cachedNote;
  }

  const notePromise = loadNoteUncached(slug).catch((error: unknown) => {
    noteCache.delete(slug);
    throw error;
  });

  noteCache.set(slug, notePromise);
  return notePromise;
}

async function loadNoteUncached(slug: string): Promise<Note | null> {
  const sourceNote = await getSourceNoteBySlug(slug);
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
    content,
    serializedContent,
    excerpt,
    title: sourceNote.title || slug,
  };
}

function loadNoteGraphNode(slug: string): Promise<NoteGraphNode | null> {
  const cachedNoteGraphNode = noteGraphNodeCache.get(slug);
  if (cachedNoteGraphNode) {
    return cachedNoteGraphNode;
  }

  const noteGraphNodePromise = loadNoteGraphNodeUncached(slug).catch(
    (error: unknown) => {
      noteGraphNodeCache.delete(slug);
      throw error;
    }
  );

  noteGraphNodeCache.set(slug, noteGraphNodePromise);
  return noteGraphNodePromise;
}

async function loadNoteGraphNodeUncached(
  slug: string
): Promise<NoteGraphNode | null> {
  const sourceNote = await getSourceNoteBySlug(slug);
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
    content: sourceNote.content,
    outboundLinks,
    title: sourceNote.title || slug,
  };
}

export async function loadAllNoteGraphNodes(): Promise<NoteGraphNode[]> {
  const slugs = await getAllNoteSlugs();
  console.log(`[note-loader] Loading graph nodes for ${slugs.length} slugs...`);
  const notes = await Promise.all(slugs.map((slug) => loadNoteGraphNode(slug)));
  const valid = notes.filter((note): note is NoteGraphNode => note !== null);
  console.log(`[note-loader] Loaded ${valid.length}/${slugs.length} graph nodes`);
  return valid;
}
