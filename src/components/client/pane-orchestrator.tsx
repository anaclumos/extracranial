"use client";

import { memo, useCallback, useMemo } from "react";
import { AllNotesList } from "@/components/notes-list/all-notes-list";
import { NotePane } from "@/components/pane/note-pane";
import { resolvePanesFromStack } from "@/lib/stores/stack-utils";
import type { NoteLanguageFilter, NotePaneData, NoteSummary } from "@/lib/types";
import { useNoteStackContext } from "./note-stack-provider";

interface PaneOrchestratorProps {
  isBlogOnly: boolean;
  languageFilter: NoteLanguageFilter;
  noteSummaries: NoteSummary[];
  onBlogOnlyChange: (nextValue: boolean) => void;
  onLanguageFilterChange: (nextValue: NoteLanguageFilter) => void;
  paneNotes: NotePaneData[];
}

export const PaneOrchestrator = memo(function PaneOrchestrator({
  isBlogOnly,
  languageFilter,
  paneNotes,
  noteSummaries,
  onBlogOnlyChange,
  onLanguageFilterChange,
}: PaneOrchestratorProps) {
  const { stack, pushNote, pushFocusedNote, focusPane, removePane } = useNoteStackContext();

  const panesData = useMemo(() => resolvePanesFromStack(stack, paneNotes), [stack, paneNotes]);

  const paneEntries = useMemo(() => {
    const counts = new Map<string, number>();

    return panesData.map((pane) => {
      const occurrence = (counts.get(pane.slug) ?? 0) + 1;
      counts.set(pane.slug, occurrence);

      return {
        pane,
        renderKey: `pane-${pane.slug}-${occurrence}`,
      };
    });
  }, [panesData]);

  const handleNoteListClick = useCallback(
    (slug: string, stackPosition?: number) => {
      if (typeof stackPosition === "number") {
        focusPane(stackPosition);
        return;
      }

      pushFocusedNote(slug);
    },
    [focusPane, pushFocusedNote],
  );

  return (
    <>
      {paneEntries.map(({ pane, renderKey }, index) => (
        <NotePane
          backlinks={pane.backlinks}
          description={pane.description}
          editUrl={pane.editUrl}
          excerpt={pane.excerpt}
          index={index}
          isClosable={index > 0}
          key={renderKey}
          onClose={removePane}
          onExpand={focusPane}
          onLinkClick={pushNote}
          serializedContent={pane.serializedContent}
          title={pane.title}
        />
      ))}
      <AllNotesList
        currentStack={stack}
        index={paneEntries.length}
        isBlogOnly={isBlogOnly}
        key="all-notes-list"
        languageFilter={languageFilter}
        notes={noteSummaries}
        onBlogOnlyChange={onBlogOnlyChange}
        onExpand={focusPane}
        onLanguageFilterChange={onLanguageFilterChange}
        onNoteClick={handleNoteListClick}
      />
    </>
  );
});
