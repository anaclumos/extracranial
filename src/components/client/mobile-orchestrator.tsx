"use client";

import { useMemo } from "react";
import type { NotePaneData } from "@/lib/types";
import { useNoteStackContext } from "./note-stack-provider";

interface MobileOrchestratorProps {
  paneNotes: NotePaneData[];
}

export function useMobileData({ paneNotes }: MobileOrchestratorProps) {
  const { stack, pushNote, removePane } = useNoteStackContext();

  const panesData = useMemo(() => {
    const paneDataMap = new Map<string, NotePaneData>();
    for (const pane of paneNotes) {
      paneDataMap.set(pane.slug, pane);
    }
    return stack
      .map((slug) => paneDataMap.get(slug))
      .filter((pane): pane is NotePaneData => pane !== undefined);
  }, [stack, paneNotes]);

  return useMemo(
    () => ({
      panes: panesData,
      onLinkClick: pushNote,
      onClose: (index: number) => removePane(index, panesData.length),
    }),
    [panesData, pushNote, removePane]
  );
}
