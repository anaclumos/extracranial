"use client";

import { memo, useCallback } from "react";
import { buildNoteHref } from "@/lib/note-links";
import type { NoteSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NoteItemProps {
  currentlyOpenLabel: (position: number) => string;
  note: NoteSummary;
  onNoteClick: (slug: string, stackPosition?: number) => void;
  stackPosition?: number;
}

export const NoteItem = memo(function NoteItem({
  note,
  stackPosition,
  onNoteClick,
  currentlyOpenLabel,
}: NoteItemProps) {
  const isInStack = stackPosition !== undefined;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onNoteClick(note.slug, stackPosition);
    },
    [onNoteClick, note.slug, stackPosition]
  );

  return (
    <li>
      <a href={buildNoteHref(note.slug)} onClick={handleClick}>
        <span
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
            "hover:bg-muted/50 dark:hover:bg-white/5",
            isInStack
              ? "bg-primary/5 text-foreground dark:bg-white/5"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "w-6 flex-shrink-0 font-mono text-[10px] tabular-nums",
              isInStack
                ? "text-primary dark:text-white/70"
                : "text-muted-foreground/30"
            )}
          >
            {isInStack ? String(stackPosition + 1).padStart(2, "0") : "-"}
          </span>
          <span className="truncate">{note.title}</span>
          {isInStack && (
            <span className="sr-only">
              {" "}
              ({currentlyOpenLabel(stackPosition + 1)})
            </span>
          )}
        </span>
      </a>
    </li>
  );
});
