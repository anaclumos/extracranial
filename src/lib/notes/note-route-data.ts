import type { NotePaneData, NoteSummary } from "@/lib/types";
import { buildNoteGraph } from "./graph-builder";
import { loadNote } from "./note-loader";

function toSortedNoteSummaries(notes: Map<string, NoteSummary>) {
  const noteSummaries = Array.from(notes.values()).map((note) => ({ ...note }));
  const collator = new Intl.Collator();

  noteSummaries.sort((a, b) => {
    const aTime = a.date
      ? new Date(a.date).getTime() / 1000
      : (a.lastModified ?? 0);
    const bTime = b.date
      ? new Date(b.date).getTime() / 1000
      : (b.lastModified ?? 0);
    const delta = bTime - aTime;

    if (delta !== 0) {
      return delta;
    }

    return collator.compare(b.title, a.title);
  });

  return noteSummaries;
}

export async function getNoteSummaries(): Promise<NoteSummary[]> {
  console.log("[note-route-data] Building note graph for summaries...");
  const graph = await buildNoteGraph();
  const summaries = toSortedNoteSummaries(graph.notes);
  console.log(`[note-route-data] Returning ${summaries.length} sorted note summaries`);
  return summaries;
}

export async function getNotePaneDataBySlug(
  slug: string
): Promise<NotePaneData | null> {
  console.log(`[note-route-data] Loading pane data for slug: ${slug}`);
  const [graph, note] = await Promise.all([buildNoteGraph(), loadNote(slug)]);

  if (!note) {
    console.log(`[note-route-data] Note not found: ${slug}`);
    return null;
  }

  const backlinkCount = graph.backlinks.get(note.slug)?.length ?? 0;
  console.log(`[note-route-data] Loaded "${note.title}" (${backlinkCount} backlinks)`);
  return {
    slug: note.slug,
    title: note.title,
    description: note.description,
    editUrl: note.editUrl,
    excerpt: note.excerpt,
    serializedContent: note.serializedContent,
    backlinks: graph.backlinks.get(note.slug) || [],
  };
}

export async function noteExists(slug: string): Promise<boolean> {
  const graph = await buildNoteGraph();
  return graph.notes.has(slug);
}
