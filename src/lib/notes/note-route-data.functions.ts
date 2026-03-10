import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const noteRouteLoaderInputSchema = z.object({
  rootSlug: z.string().trim().min(1),
  stack: z.string().optional(),
});

export const getNoteRouteLoaderData = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => noteRouteLoaderInputSchema.parse(input))
  .handler(async ({ data }) => {
    const { buildNoteRouteData } = await import("./note-route-data");

    const routeData = await buildNoteRouteData({
      rootSlug: data.rootSlug,
      search: { stack: data.stack },
    });

    return {
      rootNote: routeData.rootNote,
      rootNoteExists: routeData.rootNoteExists,
      noteSummaries: routeData.noteSummaries,
      paneNotes: routeData.paneNotes,
    };
  });
