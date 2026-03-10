import type { BacklinkInfo, NoteSummary } from "@/lib/types";
import { loadAllNoteGraphNodes } from "./note-loader";
import { generateExcerpt } from "./source-transform";

interface NoteGraph {
  backlinks: Map<string, BacklinkInfo[]>;
  notes: Map<string, NoteSummary>;
}

const graphCache = new Map<string, Promise<NoteGraph>>();

async function buildNoteGraphUncached(locale: string): Promise<NoteGraph> {
  const allNotes = await loadAllNoteGraphNodes(locale);
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

export function buildNoteGraph(locale = "en"): Promise<NoteGraph> {
  const cached = graphCache.get(locale);
  if (cached) {
    return cached;
  }
  const promise = buildNoteGraphUncached(locale).catch((error: unknown) => {
    graphCache.delete(locale);
    throw error;
  });
  graphCache.set(locale, promise);
  return promise;
}
