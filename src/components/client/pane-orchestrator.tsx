"use client";

import { AnimatePresence } from "motion/react";
import { memo, useCallback, useMemo } from "react";
import { AllNotesList } from "@/components/notes-list/all-notes-list";
import { NotePane } from "@/components/pane/note-pane";
import { PaneSkeleton } from "@/components/pane/pane-skeleton";
import type { NotePaneData, NoteSummary } from "@/lib/types";
import { useNoteStackContext } from "./note-stack-provider";

interface PaneOrchestratorProps {
  noteSummaries: NoteSummary[];
  paneNotes: NotePaneData[];
}

export const PaneOrchestrator = memo(function PaneOrchestrator({
  paneNotes,
  noteSummaries,
}: PaneOrchestratorProps) {
  const { stack, focusIndex, isPending, pushNote, focusPane, removePane } =
    useNoteStackContext();

  const panesData = useMemo(() => {
    const paneDataMap = new Map<string, NotePaneData>();
    for (const pane of paneNotes) {
      paneDataMap.set(pane.slug, pane);
    }

    return stack
      .map((slug) => paneDataMap.get(slug))
      .filter((pane): pane is NotePaneData => pane !== undefined);
  }, [stack, paneNotes]);

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

      pushNote(slug, focusIndex);
    },
    [focusIndex, focusPane, pushNote]
  );

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {paneEntries.map(({ pane, renderKey }, index) => (
        <NotePane
          backlinks={pane.backlinks}
          description={pane.description}
          editUrl={pane.editUrl}
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
      {isPending && <PaneSkeleton key="pending-skeleton" />}
      <AllNotesList
        currentStack={stack}
        index={paneEntries.length}
        key="all-notes-list"
        notes={noteSummaries}
        onExpand={focusPane}
        onNoteClick={handleNoteListClick}
      />
    </AnimatePresence>
  );
});
