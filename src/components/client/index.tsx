"use client"

import { Suspense, useEffect, useMemo, useRef } from "react"
import { PaneContainer } from "@/components/pane/container"
import { NotePreviewProvider } from "@/components/preview-link"
import { Spinner } from "@/components/ui/spinner"
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

  const summariesMap = useMemo(() => {
    const map = new Map<string, NoteSummary>()
    for (const summary of noteSummaries) {
      map.set(summary.slug, summary)
    }
    return map
  }, [noteSummaries])

  return (
    <NoteStackProvider rootSlug={rootSlug}>
      <KeyboardHandler initialPanesLength={1} />
      <NotePreviewProvider summariesMap={summariesMap}>
        <PaneContainer paneNotes={paneNotes} scrollToPaneRef={scrollToPaneRef}>
          <PaneOrchestrator
            noteSummaries={noteSummaries}
            paneNotes={paneNotes}
          />
        </PaneContainer>
      </NotePreviewProvider>
    </NoteStackProvider>
  )
}

export function NotesPageClient(props: NotesPageClientProps) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center bg-muted">
          <Spinner size="lg" />
        </div>
      }
    >
      <NotesContent {...props} />
    </Suspense>
  )
}
