"use client"

import { AnimatePresence, LayoutGroup } from "motion/react"
import { memo, useCallback, useMemo } from "react"
import { AllNotesList } from "@/components/notes-list/all-notes-list"
import { NotePane } from "@/components/pane/note-pane"
import { PaneSkeleton } from "@/components/pane/pane-skeleton"
import { useSetKeyboardFocusIndex } from "@/lib/stores/pane-ui-store"
import type { NotePaneData, NoteSummary } from "@/lib/types"
import { useNoteStackContext } from "./note-stack-provider"

interface PaneOrchestratorProps {
  paneNotes: NotePaneData[]
  noteSummaries: NoteSummary[]
}

export const PaneOrchestrator = memo(function PaneOrchestrator({
  paneNotes,
  noteSummaries,
}: PaneOrchestratorProps) {
  const { stack, isPending, pushNote, focusPane, setStack } = useNoteStackContext()
  const setKeyboardFocusIndex = useSetKeyboardFocusIndex()

  const panesData = useMemo(() => {
    const paneDataMap = new Map<string, NotePaneData>()
    for (const pane of paneNotes) {
      paneDataMap.set(pane.slug, pane)
    }

    return stack
      .map((slug) => paneDataMap.get(slug))
      .filter((pane): pane is NotePaneData => pane !== undefined)
  }, [stack, paneNotes])

  const handleLinkClick = useCallback(
    (slug: string, fromPaneIndex: number) => {
      pushNote(slug, fromPaneIndex)
    },
    [pushNote]
  )

  const handleExpandPane = useCallback(
    (index: number) => {
      setKeyboardFocusIndex(index)
      if (index < stack.length) {
        focusPane(index)
      }
    },
    [focusPane, stack.length, setKeyboardFocusIndex]
  )

  const handleAllNotesClick = useCallback(
    (slug: string) => {
      const fromIndex = Math.max(0, panesData.length - 1)
      pushNote(slug, fromIndex)
    },
    [pushNote, panesData.length]
  )

  const handleClosePane = useCallback(
    (index: number) => {
      const availableStack = stack.slice(0, panesData.length)
      if (index === 0 || availableStack.length <= 1) {
        return
      }
      const newStack = [
        ...availableStack.slice(0, index),
        ...availableStack.slice(index + 1),
      ]
      const newFocusIndex = Math.min(index, newStack.length - 1)
      setStack(newStack, newFocusIndex)
    },
    [stack, panesData.length, setStack]
  )

  return (
    <LayoutGroup>
      <AnimatePresence initial={false} mode="popLayout">
        {panesData.map((pane, index) => (
          <NotePane
            backlinks={pane.backlinks}
            description={pane.description}
            editUrl={pane.editUrl}
            index={index}
            isClosable={index > 0}
            key={`pane-${index}-${pane.slug}`}
            onClose={handleClosePane}
            onExpand={handleExpandPane}
            onLinkClick={handleLinkClick}
            serializedContent={pane.serializedContent}
            title={pane.title}
          />
        ))}
        {isPending && <PaneSkeleton key="pending-skeleton" />}
        <AllNotesList
          currentStack={stack}
          index={panesData.length}
          key="all-notes-list"
          notes={noteSummaries}
          onExpand={handleExpandPane}
          onNoteClick={handleAllNotesClick}
        />
      </AnimatePresence>
    </LayoutGroup>
  )
})
