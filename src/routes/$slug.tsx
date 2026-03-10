import { createFileRoute, notFound } from "@tanstack/react-router";
import { getNoteRouteLoaderData } from "@/lib/notes/note-route-data.functions";
import {
  parseNoteStackSearch,
  toNoteStackSearchParams,
} from "@/lib/stores/note-stack-parsers";

const DIRECT_NOTE_SLUG_REGEX = /^[A-F0-9]{6}$/i;

type NoteRouteSearch = Record<string, unknown> & {
  stack?: string;
  focus?: number;
};

export const Route = createFileRoute("/$slug")({
  validateSearch: (search): NoteRouteSearch => {
    const parsed = parseNoteStackSearch(search);
    const normalized = toNoteStackSearchParams(parsed.stack, parsed.focus);

    return {
      ...search,
      focus: normalized.focus,
      stack: normalized.stack,
    };
  },
  beforeLoad: ({ params }) => {
    if (!DIRECT_NOTE_SLUG_REGEX.test(params.slug)) {
      throw notFound();
    }
  },
  loaderDeps: ({ search }) => ({
    stack: search.stack,
  }),
  loader: async ({ params, deps }) => {
    const routeData = await getNoteRouteLoaderData({
      data: {
        rootSlug: params.slug,
        stack: deps.stack,
      },
    });

    if (!(routeData.rootNoteExists && routeData.rootNote)) {
      throw notFound();
    }

    return {
      rootSlug: params.slug,
      noteSummaries: routeData.noteSummaries,
      paneNotes: routeData.paneNotes,
      title: routeData.rootNote.title,
      description:
        routeData.rootNote.description ||
        routeData.rootNote.excerpt ||
        "cho.sh",
    };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.title ?? "cho.sh";
    const description = loaderData?.description ?? "cho.sh";
    const rootSlug = loaderData?.rootSlug;
    const imageUrl = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
    const notePath = rootSlug ? `/${rootSlug}` : null;
    const pageUrl =
      notePath && typeof window !== "undefined"
        ? `${window.location.origin}${notePath}`
        : null;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        ...(pageUrl ? [{ property: "og:url", content: pageUrl }] : []),
        { property: "og:image", content: imageUrl },
        { property: "og:image:width", content: "2400" },
        { property: "og:image:height", content: "1260" },
        { property: "og:image:alt", content: title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: imageUrl },
      ],
    };
  },
});
