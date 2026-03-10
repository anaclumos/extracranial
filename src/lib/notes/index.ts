import { cacheLife, cacheTag } from "next/cache"
import { buildNoteGraph as buildNoteGraphUncached } from "./graph-builder"
import { loadNote as loadNoteUncached } from "./note-loader"

export { getAllNoteSlugs } from "./file-io"
export { getLatestJournalSlug } from "./content-index"

export async function getNoteBySlug(slug: string, locale?: string) {
  "use cache"
  cacheLife("blog")
  cacheTag(`note-${slug}`, `locale-${locale ?? "en"}`)
  return loadNoteUncached(slug, locale)
}

export async function buildNoteGraph(locale?: string) {
  "use cache"
  cacheLife("blog")
  cacheTag(`graph-${locale ?? "en"}`)
  return buildNoteGraphUncached(locale)
}
