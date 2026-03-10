"use client"

import { Suspense, useEffect, useRef } from "react"
import { PageSkeleton } from "@/components/page-skeleton"
import { PaneContainer } from "@/components/pane/container"
import { usePaneUIStore } from "@/lib/stores/pane-ui-store"
import type { NotePaneData, NoteSummary } from "@/lib/types"
import { KeyboardHandler } from "./keyboard-handler"
import { NoteStackProvider } from "./note-stack-provider"
import { PaneOrchestrator } from "./pane-orchestrator"

interface NotesPageClientProps {
  rootSlug: string
  noteSummaries: NoteSummary[]
  paneNotes: NotePaneData[]
}

function NotesContent({
  rootSlug,
  noteSummaries,
  paneNotes,
}: NotesPageClientProps) {
  const scrollToPaneRef = useRef<((index: number) => void) | null>(null)
  const setScrollToPaneHandler = usePaneUIStore(
    (state) => state.setScrollToPaneHandler
  )

  useEffect(() => {
    const handler = (index: number) => {
      scrollToPaneRef.current?.(index)
    }
    setScrollToPaneHandler(handler)
  }, [setScrollToPaneHandler])

  return (
    <NoteStackProvider rootSlug={rootSlug}>
      <KeyboardHandler />
      <PaneContainer paneNotes={paneNotes} scrollToPaneRef={scrollToPaneRef}>
        <PaneOrchestrator
          noteSummaries={noteSummaries}
          paneNotes={paneNotes}
        />
      </PaneContainer>
    </NoteStackProvider>
  )
}

export function NotesPageClient(props: NotesPageClientProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <NotesContent {...props} />
    </Suspense>
  )
}
