import type { BacklinkInfo, NoteSummary } from "@/lib/types";
import { loadAllNoteGraphNodes } from "./note-loader";
import { generateExcerpt } from "./source-transform";

interface NoteGraph {
  backlinks: Map<string, BacklinkInfo[]>;
  notes: Map<string, NoteSummary>;
}

let graphCache: Promise<NoteGraph> | null = null;

async function buildNoteGraphUncached(): Promise<NoteGraph> {
  const allNotes = await loadAllNoteGraphNodes();
  const notes = new Map<string, NoteSummary>();
  const backlinks = new Map<string, BacklinkInfo[]>();

  for (const note of allNotes) {
    const excerpt = generateExcerpt(note.content, 180);
    notes.set(note.slug, {
      date: note.date,
      excerpt,
      kind: note.kind,
      lastModified: note.lastModified,
      slug: note.slug,
      title: note.title,
      description: note.description,
    });
    backlinks.set(note.slug, []);
  }

  for (const note of allNotes) {
    const sourceExcerpt = notes.get(note.slug)?.excerpt;
    for (const targetSlug of note.outboundLinks) {
      if (notes.has(targetSlug)) {
        backlinks.get(targetSlug)?.push({
          slug: note.slug,
          title: note.title,
          excerpt: sourceExcerpt,
        });
      }
    }
  }

  return { notes, backlinks };
}

export function buildNoteGraph(): Promise<NoteGraph> {
  if (graphCache) {
    return graphCache;
  }
  const promise = buildNoteGraphUncached().catch((error: unknown) => {
    graphCache = null;
    throw error;
  });
  graphCache = promise;
  return promise;
}
