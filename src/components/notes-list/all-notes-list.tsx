"use client"

import { useTranslations } from "next-intl"
import { memo, useCallback } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import {
  reducedMotionTransition,
  springQuick,
  springSubtle,
} from "@/lib/animations"
import type { NoteSummary } from "@/lib/types"
import { usePaneCollapse } from "../pane/pane-collapse-context"
import { usePaneRegistration } from "../pane/use-pane-registration"
import { useNotesListState } from "./list-state"
import { NoteItem } from "./note-item"
import { PaneWrapper } from "./pane-wrapper"

interface AllNotesListProps {
  notes: NoteSummary[]
  currentStack: string[]
  index: number
  onNoteClick: (slug: string) => void
  onExpand: (index: number) => void
}

export const AllNotesList = memo(function AllNotesList({
  notes,
  currentStack,
  index,
  onNoteClick,
  onExpand,
}: AllNotesListProps) {
  const { collapsedIndices } = usePaneCollapse()
  const isCollapsed = collapsedIndices.has(index)
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations("allNotes")
  const tPane = useTranslations("notePane")
  const paneRef = usePaneRegistration(index)

  const { filteredNotes, isBlogOnly, setIsBlogOnly, stackIndexBySlug } =
    useNotesListState({
      notes,
      currentStack,
    })

  const handleExpand = useCallback(() => {
    onExpand(index)
  }, [onExpand, index])

  const getCurrentlyOpenLabel = useCallback(
    (pos: number) => t("currentlyOpen", { position: pos }),
    [t]
  )

  const transition = prefersReducedMotion
    ? reducedMotionTransition
    : springSubtle
  const quickTransition = prefersReducedMotion
    ? reducedMotionTransition
    : springQuick

  return (
    <PaneWrapper
      expandLabel={`${tPane("expand")} ${t("title")}`}
      index={index}
      isCollapsed={isCollapsed}
      onExpand={handleExpand}
      paneRef={paneRef}
      prefersReducedMotion={prefersReducedMotion}
      quickTransition={quickTransition}
      title={t("title")}
      transition={transition}
    >
      <ScrollArea className="relative z-0 h-full">
        <div className="sticky top-0 z-sticky border-border/50 border-b bg-background/80 px-4 pt-4 pb-2 backdrop-blur-md">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-normal text-2xl text-foreground tracking-tight dark:bg-gradient-to-br dark:from-white dark:via-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent">
              {t("title")}
            </h2>
            <label className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>{t("blogOnly")}</span>
              <Switch
                aria-label={t("blogOnlyToggle")}
                checked={isBlogOnly}
                onCheckedChange={setIsBlogOnly}
              />
            </label>
          </div>
          <p className="mt-1 font-mono text-muted-foreground text-sm">
            {t("noteCount", { count: filteredNotes.length })}
          </p>
        </div>
        <div className="px-8 py-6">
          <ul className="space-y-1">
            {filteredNotes.map((note) => (
              <NoteItem
                currentlyOpenLabel={getCurrentlyOpenLabel}
                key={note.slug}
                note={note}
                onNoteClick={onNoteClick}
                stackPosition={stackIndexBySlug.get(note.slug)}
              />
            ))}
          </ul>
        </div>
      </ScrollArea>
    </PaneWrapper>
  )
})
