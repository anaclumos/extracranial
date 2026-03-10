import type { BacklinkInfo, NoteSummary } from "@/lib/types";
import { loadAllNoteGraphNodes } from "./note-loader";
import { generateExcerpt } from "./source-transform";

async function buildNoteGraphUncached(locale: string): Promise<{
  notes: Map<string, NoteSummary>;
  backlinks: Map<string, BacklinkInfo[]>;
}> {
  const allNotes = await loadAllNoteGraphNodes(locale);
  const notes = new Map<string, NoteSummary>();
  const backlinks = new Map<string, BacklinkInfo[]>();

  for (const note of allNotes) {
    notes.set(note.slug, {
      date: note.date,
      excerpt: generateExcerpt(note.content, 180),
      kind: note.kind,
      lastModified: note.lastModified,
      slug: note.slug,
      title: note.title,
      description: note.description,
    });
    backlinks.set(note.slug, []);
  }

  for (const note of allNotes) {
    for (const targetSlug of note.outboundLinks) {
      if (notes.has(targetSlug)) {
        const targetBacklinks = backlinks.get(targetSlug) || [];
        targetBacklinks.push({
          slug: note.slug,
          title: note.title,
          excerpt: generateExcerpt(note.content, 180),
        });
        backlinks.set(targetSlug, targetBacklinks);
      }
    }
  }

  return { notes, backlinks };
}

export function buildNoteGraph(locale = "en"): Promise<{
  notes: Map<string, NoteSummary>;
  backlinks: Map<string, BacklinkInfo[]>;
}> {
  return buildNoteGraphUncached(locale);
}
