"use client"

import { useCallback, useMemo } from "react"
import type { NotePaneData } from "@/lib/types"
import { useNoteStackContext } from "./note-stack-provider"

interface MobileOrchestratorProps {
  paneNotes: NotePaneData[]
}

export function useMobileData({ paneNotes }: MobileOrchestratorProps) {
  const { stack, pushNote, setStack } = useNoteStackContext()

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

  return useMemo(
    () => ({
      panes: panesData,
      onLinkClick: handleLinkClick,
      onClose: handleClosePane,
    }),
    [panesData, handleLinkClick, handleClosePane]
  )
}
