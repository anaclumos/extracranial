export type NoteKind = "blog" | "journal" | "research"
export type SerializedNoteContent = string

interface NoteMeta {
  slug: string
  title: string
  description?: string
  date?: string
  lastEditedAt?: number
  kind: NoteKind
  locale: string
  editUrl?: string
}

interface NoteBase extends NoteMeta {
  content: string
}

export interface NoteGraphNode extends NoteBase {
  outboundLinks: string[]
}

export interface Note extends NoteBase {
  serializedContent: SerializedNoteContent
  excerpt: string
}

export interface BacklinkInfo {
  slug: string
  title: string
  excerpt?: string
}

export interface NoteSummary {
  slug: string
  title: string
  description?: string
  excerpt?: string
  date?: string
  lastEditedAt?: number
  kind: NoteKind
}

export interface NotePaneData {
  slug: string
  title: string
  description?: string
  serializedContent: SerializedNoteContent
  backlinks: BacklinkInfo[]
  editUrl?: string
}
