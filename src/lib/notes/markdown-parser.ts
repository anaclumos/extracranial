import type { SerializedNoteContent } from "@/lib/types";
import { getContentIndex, type SourceNote } from "./content-index";
import {
  extractOutboundLinks,
  generateExcerpt,
  preprocessNoteSource,
} from "./source-transform";

export interface NoteFrontmatter {
  createdAt?: string;
  description?: string;
  last_modified?: string;
  sourceHash?: string;
  sourceLocale?: string;
  title: string;
  translatedAt?: string;
  updatedAt?: string;
  [key: string]: unknown; // Allow additional fields
}

export interface ParsedNote {
  content: string;
  data: NoteFrontmatter;
  excerpt: string;
  outboundLinks: string[];
  serializedContent: SerializedNoteContent;
}

export async function parseMarkdown(note: SourceNote): Promise<ParsedNote> {
  const { titleLookup } = await getContentIndex();
  const serializedContent = preprocessNoteSource(
    note,
    titleLookup
  ) as SerializedNoteContent;

  return {
    data: {
      description: note.description,
      title: note.title,
    },
    content: note.content,
    excerpt: generateExcerpt(note.content),
    outboundLinks: extractOutboundLinks(note, titleLookup),
    serializedContent,
  };
}
