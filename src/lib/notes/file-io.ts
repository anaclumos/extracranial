import "server-only"

export {
  getSourceNoteBySlug,
  resolveAssetPathForNote,
} from "./content-index"

import { getAllNoteSlugs as getAllContentNoteSlugs } from "./content-index"

export async function getAllNoteSlugs(_locale = "en") {
  return getAllContentNoteSlugs()
}
