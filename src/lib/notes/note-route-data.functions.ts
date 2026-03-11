import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import { z } from "zod";

export const getAllNoteSummaries = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    const { getNoteSummaries } = await import("./note-route-data");
    return getNoteSummaries();
  });

export const getNotePaneData = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .inputValidator((input: unknown) =>
    z.object({ slug: z.string().trim().min(1) }).parse(input)
  )
  .handler(async ({ data }) => {
    const { getNotePaneDataBySlug } = await import("./note-route-data");
    return getNotePaneDataBySlug(data.slug);
  });

export const checkNoteExists = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .inputValidator((input: unknown) =>
    z.object({ slug: z.string().trim().min(1) }).parse(input)
  )
  .handler(async ({ data }) => {
    const { noteExists } = await import("./note-route-data");
    return noteExists(data.slug);
  });
