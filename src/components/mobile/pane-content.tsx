"use client"

import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { NotePaneData } from "@/lib/types"
import { BacklinksSection } from "../backlinks-section"
import { NoteContent } from "../note-content"

interface PaneContentProps {
  pane: NotePaneData
  onLinkClick: (slug: string) => void
  onClose: () => void
  isClosable: boolean
  closeLabel: string
}

export function PaneContent({
  pane,
  onLinkClick,
  onClose,
  isClosable,
  closeLabel,
}: PaneContentProps) {
  return (
    <>
      <ScrollArea className="h-full">
        <div className="p-5 pb-10">
          <header className="mb-4 pr-8">
            <h1 className="font-semibold text-foreground text-xl leading-snug">
              {pane.title}
            </h1>
            {pane.description && (
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {pane.description}
              </p>
            )}
          </header>
          <NoteContent
            onLinkClick={onLinkClick}
            serializedContent={pane.serializedContent}
          />
          {pane.backlinks.length > 0 && (
            <footer className="mt-6 border-border/40 border-t pt-4">
              <BacklinksSection
                backlinks={pane.backlinks}
                onBacklinkClick={onLinkClick}
              />
            </footer>
          )}
        </div>
      </ScrollArea>

      {isClosable && (
        <button
          aria-label={closeLabel}
          className="absolute top-3 right-3 z-50 flex size-7 items-center justify-center rounded-full bg-muted/80 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          type="button"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={1.5} />
        </button>
      )}
    </>
  )
}
