import { cache } from "react"
import { buildNoteGraph as buildNoteGraphFromBuilder } from "./graph-builder"
import { loadNote } from "./note-loader"

export { getAllNoteSlugs } from "./file-io"
export { getLatestJournalSlug } from "./content-index"

export const getNoteBySlug = cache(loadNote)
export const buildNoteGraph = cache(buildNoteGraphFromBuilder)
