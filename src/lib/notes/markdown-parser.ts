import "server-only"

import type { SerializedNoteContent } from "@/lib/types"
import { getContentIndex, type SourceNote } from "./content-index"
import {
  extractOutboundLinks,
  generateExcerpt,
  preprocessNoteSource,
} from "./source-transform"

export interface NoteFrontmatter {
  title: string
  description?: string
  sourceLocale?: string
  sourceHash?: string
  translatedAt?: string
  createdAt?: string
  last_updated?: string
  updatedAt?: string
  [key: string]: unknown // Allow additional fields
}

export interface ParsedNote {
  data: NoteFrontmatter
  content: string
  serializedContent: SerializedNoteContent
  excerpt: string
  outboundLinks: string[]
}

export async function parseMarkdown(note: SourceNote): Promise<ParsedNote> {
  const { titleLookup } = await getContentIndex()
  const serializedContent = preprocessNoteSource(
    note,
    titleLookup
  ) as SerializedNoteContent

  return {
    data: {
      description: note.description,
      title: note.title,
    },
    content: note.content,
    excerpt: generateExcerpt(note.content),
    outboundLinks: extractOutboundLinks(note, titleLookup),
    serializedContent,
  }
}

export { generateExcerpt } from "./source-transform"
