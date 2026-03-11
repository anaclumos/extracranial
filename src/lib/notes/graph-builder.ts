import type { BacklinkInfo, NoteSummary } from "@/lib/types";
import { loadAllNoteGraphNodes } from "./note-loader";
import { generateExcerpt } from "./source-transform";

interface NoteGraph {
  backlinks: Map<string, BacklinkInfo[]>;
  notes: Map<string, NoteSummary>;
}

let graphCache: Promise<NoteGraph> | null = null;

async function buildNoteGraphUncached(): Promise<NoteGraph> {
  console.log("[graph-builder] Loading all note graph nodes...");
  const allNotes = await loadAllNoteGraphNodes();
  console.log(`[graph-builder] Loaded ${allNotes.length} graph nodes`);

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

  let totalBacklinks = 0;
  for (const note of allNotes) {
    const sourceExcerpt = notes.get(note.slug)?.excerpt;
    for (const targetSlug of note.outboundLinks) {
      if (notes.has(targetSlug)) {
        backlinks.get(targetSlug)?.push({
          slug: note.slug,
          title: note.title,
          excerpt: sourceExcerpt,
        });
        totalBacklinks += 1;
      }
    }
  }

  console.log(`[graph-builder] Complete: ${notes.size} notes, ${totalBacklinks} backlink edges`);
  return { notes, backlinks };
}

export function buildNoteGraph(): Promise<NoteGraph> {
  if (graphCache) {
    return graphCache;
  }
  const start = performance.now();
  const promise = buildNoteGraphUncached()
    .then((graph) => {
      console.log(`[graph-builder] Built in ${((performance.now() - start) / 1000).toFixed(1)}s`);
      return graph;
    })
    .catch((error: unknown) => {
      graphCache = null;
      throw error;
    });
  graphCache = promise;
  return promise;
}
