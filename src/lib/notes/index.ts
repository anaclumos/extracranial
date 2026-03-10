import { cacheLife, cacheTag } from "next/cache"
import { buildNoteGraph as buildNoteGraphUncached } from "./graph-builder"
import { loadNote as loadNoteUncached } from "./note-loader"

export { getAllNoteSlugs, getLatestJournalSlug } from "./content-index"

const BLOG_CACHE_LIFE = {
  stale: 300,
  revalidate: 86400,
  expire: 604800,
} as const

export async function getNoteBySlug(slug: string, locale?: string) {
  "use cache"
  cacheLife(BLOG_CACHE_LIFE)
  cacheTag(`note-${slug}`, `locale-${locale ?? "en"}`)
  return loadNoteUncached(slug, locale)
}

export async function buildNoteGraph(locale?: string) {
  "use cache"
  cacheLife(BLOG_CACHE_LIFE)
  cacheTag(`graph-${locale ?? "en"}`)
  return buildNoteGraphUncached(locale)
}
