"use client"

import { useTranslations } from "next-intl"
import { memo } from "react"
import { BacklinksSection } from "@/components/backlinks-section"
import { NoteContent } from "@/components/note-content"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { BacklinkInfo, SerializedNoteContent } from "@/lib/types"
import { PaneHeader } from "./pane-header"

interface PaneBodyProps {
  slug: string
  title: string
  description?: string
  serializedContent: SerializedNoteContent
  backlinks: BacklinkInfo[]
  editUrl?: string
  onLinkClick: (slug: string) => void
}

export const PaneBody = memo(function PaneBody(props: PaneBodyProps) {
  const { title, description, serializedContent, backlinks, onLinkClick, editUrl } =
    props
  const t = useTranslations("notePane")
  const tCommon = useTranslations("common")

  return (
    <ScrollArea className="relative z-0 h-full">
      <div className="flex min-h-full flex-col">
        <PaneHeader description={description} title={title} />

        <div className="flex-1">
          <NoteContent
            onLinkClick={onLinkClick}
            serializedContent={serializedContent}
          />
        </div>

        {backlinks.length > 0 && (
          <footer className="border-border/40 border-t px-8 py-6">
            <BacklinksSection
              backlinks={backlinks}
              onBacklinkClick={onLinkClick}
            />
          </footer>
        )}

        {editUrl && (
          <footer className="border-border/40 border-t px-8 py-4">
            <a
              className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              href={editUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("editOnGitHub")}
              <span className="sr-only"> ({tCommon("opensInNewTab")})</span>
            </a>
          </footer>
        )}
      </div>
    </ScrollArea>
  )
})
