"use client";

import { Suspense } from "react";
import { PageSkeleton } from "@/components/page-skeleton";
import { PaneContainer } from "@/components/pane/container";
import { usePaneCollapseScrollTo } from "@/components/pane/pane-collapse-context";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import type { NotePaneData, NoteSummary } from "@/lib/types";
import {
  NoteStackProvider,
  useNoteStackContext,
} from "./note-stack-provider";
import { PaneOrchestrator } from "./pane-orchestrator";

function KeyboardHandler() {
  const { stack, focusIndex, popNote, focusPane } = useNoteStackContext();
  const scrollToPane = usePaneCollapseScrollTo();
  useKeyboardNavigation({
    stackLength: stack.length,
    focusIndex,
    maxFocusIndex: stack.length + 1,
    onFocusChange: focusPane,
    onPopStack: popNote,
    onScrollToPane: scrollToPane,
  });
  return null;
}

interface NotesPageClientProps {
  noteSummaries: NoteSummary[];
  paneNotes: NotePaneData[];
  rootSlug: string;
}

function NotesContent({
  rootSlug,
  noteSummaries,
  paneNotes,
}: NotesPageClientProps) {
  return (
    <NoteStackProvider rootSlug={rootSlug}>
      <KeyboardHandler />
      <PaneContainer paneNotes={paneNotes}>
        <PaneOrchestrator noteSummaries={noteSummaries} paneNotes={paneNotes} />
      </PaneContainer>
    </NoteStackProvider>
  );
}

export function NotesPageClient(props: NotesPageClientProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <NotesContent {...props} />
    </Suspense>
  );
}
