"use client"

import type { SerializedNoteContent } from "@/lib/types"
import { MdxNoteContent } from "@/components/content/mdx-components"

interface NoteContentProps {
  serializedContent: SerializedNoteContent
  onLinkClick: (slug: string) => void
}

export function NoteContent({
  onLinkClick,
  serializedContent,
}: NoteContentProps) {
  return <MdxNoteContent onLinkClick={onLinkClick} source={serializedContent} />
}
