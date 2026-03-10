export type NoteKind = "blog" | "journal" | "research";
export type SerializedNoteContent = string;

interface NoteMeta {
  date?: string;
  description?: string;
  editUrl?: string;
  kind: NoteKind;
  lastModified?: number;
  slug: string;
  title: string;
}

interface NoteBase extends NoteMeta {
  content: string;
}

export interface NoteGraphNode extends NoteBase {
  outboundLinks: string[];
}

export interface Note extends NoteBase {
  excerpt: string;
  serializedContent: SerializedNoteContent;
}

export interface BacklinkInfo {
  excerpt?: string;
  slug: string;
  title: string;
}

export interface NoteSummary {
  date?: string;
  description?: string;
  excerpt?: string;
  kind: NoteKind;
  lastModified?: number;
  slug: string;
  title: string;
}

export interface NotePaneData {
  backlinks: BacklinkInfo[];
  description?: string;
  editUrl?: string;
  serializedContent: SerializedNoteContent;
  slug: string;
  title: string;
}
