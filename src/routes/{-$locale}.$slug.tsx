import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { NotesPageClient } from "@/components/client/index";
import { defaultLocale, isLocale } from "@/i18n/routing";
import {
  isDirectNoteSlug,
  throwCanonicalNoteRedirect,
} from "@/lib/canonical-note-redirect";
import { getNoteRouteLoaderData } from "@/lib/notes/note-route-data.functions";
import { IndexComponent } from "./{-$locale}.index";

export const Route = createFileRoute("/{-$locale}/$slug")({
  beforeLoad: ({ params, search }) => {
    if (!params.locale && isLocale(params.slug)) {
      throw redirect({
        to: "/{-$locale}/$slug",
        params: { locale: params.slug, slug: "000000" },
        search,
        replace: true,
      });
    }
    if (params.locale === defaultLocale && isDirectNoteSlug(params.slug)) {
      return throwCanonicalNoteRedirect({ slug: params.slug });
    }
    return { isLocaleIndex: false as const };
  },
  loaderDeps: ({ search }) => ({
    stack: search.stack,
  }),
  loader: async ({ context, params, deps }) => {
    if (context.isLocaleIndex) {
      return { isLocaleIndex: true as const };
    }

    const locale = params.locale ?? defaultLocale;
    const routeData = await getNoteRouteLoaderData({
      data: {
        rootSlug: params.slug,
        locale,
        stack: deps.stack,
      },
    });

    if (!(routeData.rootNoteExists && routeData.rootNote)) {
      throw notFound();
    }

    return {
      isLocaleIndex: false as const,
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
  head: ({ loaderData, params }) => {
    if (loaderData?.isLocaleIndex) {
      return {
        meta: [{ title: "cho.sh" }, { name: "description", content: "cho.sh" }],
      };
    }

    const title = loaderData?.title ?? "cho.sh";
    const description = loaderData?.description ?? "cho.sh";
    const locale = params.locale ?? defaultLocale;
    const rootSlug = loaderData?.rootSlug;
    const imageUrl = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&locale=${encodeURIComponent(locale)}`;
    let notePath: string | null = null;

    if (rootSlug) {
      notePath =
        locale === defaultLocale ? `/${rootSlug}` : `/${locale}/${rootSlug}`;
    }

    const pageUrl =
      notePath && typeof window !== "undefined"
        ? `${window.location.origin}${notePath}`
        : null;

    return {
      meta: [
        {
          title,
        },
        {
          name: "description",
          content: description,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:locale", content: locale },
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
  component: NoteRoutePage,
});

function NoteRoutePage() {
  const data = Route.useLoaderData();

  if (data.isLocaleIndex) {
    return <IndexComponent />;
  }

  return (
    <NotesPageClient
      noteSummaries={data.noteSummaries}
      paneNotes={data.paneNotes}
      rootSlug={data.rootSlug}
    />
  );
}
