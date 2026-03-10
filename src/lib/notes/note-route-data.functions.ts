import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { locales } from "@/i18n/routing";

const noteRouteLoaderInputSchema = z.object({
  locale: z.enum(locales),
  rootSlug: z.string().trim().min(1),
  stack: z.string().optional(),
});

export const getNoteRouteLoaderData = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => noteRouteLoaderInputSchema.parse(input))
  .handler(async ({ data }) => {
    const { buildNoteRouteData } = await import("./note-route-data");

    const routeData = await buildNoteRouteData({
      rootSlug: data.rootSlug,
      locale: data.locale,
      search: { stack: data.stack },
    });

    return {
      rootNote: routeData.rootNote,
      rootNoteExists: routeData.rootNoteExists,
      noteSummaries: routeData.noteSummaries,
      paneNotes: routeData.paneNotes,
    };
  });
