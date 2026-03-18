"use client";

import { useState } from "react";
import { PaneContainer } from "@/components/pane/container";
import { usePaneCollapseScrollTo } from "@/components/pane/pane-collapse-context";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import type { NoteLanguageFilter, NotePaneData, NoteSummary } from "@/lib/types";
import { NoteStackProvider, useNoteStackContext } from "./note-stack-provider";
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

function NotesContent({ rootSlug, noteSummaries, paneNotes }: NotesPageClientProps) {
  const [isBlogOnly, setIsBlogOnly] = useState(false);
  const [languageFilter, setLanguageFilter] = useState<NoteLanguageFilter>("all");

  return (
    <NoteStackProvider rootSlug={rootSlug}>
      <KeyboardHandler />
      <PaneContainer
        isBlogOnly={isBlogOnly}
        languageFilter={languageFilter}
        onBlogOnlyChange={setIsBlogOnly}
        onLanguageFilterChange={setLanguageFilter}
        paneNotes={paneNotes}
      >
        <PaneOrchestrator
          isBlogOnly={isBlogOnly}
          languageFilter={languageFilter}
          noteSummaries={noteSummaries}
          onBlogOnlyChange={setIsBlogOnly}
          onLanguageFilterChange={setLanguageFilter}
          paneNotes={paneNotes}
        />
      </PaneContainer>
    </NoteStackProvider>
  );
}

export function NotesPageClient(props: NotesPageClientProps) {
  return <NotesContent {...props} />;
}
