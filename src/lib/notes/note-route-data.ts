import { buildFullStack, parseStackString } from "@/lib/stores/stack-utils";
import type { BacklinkInfo, NotePaneData, NoteSummary } from "@/lib/types";
import { buildNoteGraph } from "./graph-builder";
import { loadNote } from "./note-loader";

export interface NoteRouteSearchInput {
  stack?: string | string[] | null | undefined;
}

export interface BuildNoteRouteDataInput {
  rootSlug: string;
  search?: NoteRouteSearchInput;
}

export interface NoteRouteData {
  backlinks: Map<string, BacklinkInfo[]>;
  fullStack: string[];
  noteSummaries: NoteSummary[];
  notes: Map<string, NoteSummary>;
  paneNotes: NotePaneData[];
  rootNote: NoteSummary | null;
  rootNoteExists: boolean;
}

function normalizeStackSearch(
  search: NoteRouteSearchInput | undefined
): string {
  const stack = search?.stack;
  return Array.isArray(stack) ? (stack[0] ?? "") : (stack ?? "");
}

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

function loadStackNotes(fullStack: string[]) {
  return Promise.all(fullStack.map((slug) => loadNote(slug)));
}

export async function buildNoteRouteData({
  rootSlug,
  search,
}: BuildNoteRouteDataInput): Promise<NoteRouteData> {
  const additionalSlugs = parseStackString(normalizeStackSearch(search));
  const fullStack = buildFullStack(rootSlug, additionalSlugs);

  const [graph, stackNotes] = await Promise.all([
    buildNoteGraph(),
    loadStackNotes(fullStack),
  ]);

  const rootNote = graph.notes.get(rootSlug) ?? null;
  const paneNotes = stackNotes.reduce<NotePaneData[]>((acc, note) => {
    if (!note) {
      return acc;
    }

    acc.push({
      slug: note.slug,
      title: note.title,
      description: note.description,
      editUrl: note.editUrl,
      serializedContent: note.serializedContent,
      backlinks: graph.backlinks.get(note.slug) || [],
    });
    return acc;
  }, []);

  return {
    rootNoteExists: rootNote !== null,
    rootNote,
    noteSummaries: toSortedNoteSummaries(graph.notes),
    paneNotes,
    notes: graph.notes,
    backlinks: graph.backlinks,
    fullStack,
  };
}
