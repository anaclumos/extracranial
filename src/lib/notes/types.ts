/**
 * Pure note domain types - framework-agnostic.
 * These types can be imported without pulling in server-only or Next.js semantics.
 */

import type { NoteKind } from "@/lib/types";

/**
 * Minimal source note interface for pure-domain transformations.
 * Only includes properties needed by content transformation functions.
 */
export interface SourceNoteBase {
  content: string;
  slug: string;
}

/**
 * Full source note with all metadata.
 * Used by server-side content indexing and loading.
 */
export interface SourceNote extends SourceNoteBase {
  aliases: string[];
  date?: string;
  description?: string;
  dirPath: string;
  editUrl?: string;
  filePath: string;
  kind: NoteKind;
  lastModified?: number;
  locale: string;
  title: string;
}
