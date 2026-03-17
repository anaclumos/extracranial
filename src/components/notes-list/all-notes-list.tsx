"use client";

import { memo, useCallback, useMemo } from "react";
import { Logo } from "@/components/brand/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SettingsDrawer } from "@/components/ui/settings-drawer";
import { useTranslations } from "@/i18n/provider";
import type { NoteLanguageFilter, NoteSummary } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  useIsPaneCollapsed,
  usePaneCollapseScrollTo,
  usePaneRef,
} from "../pane/pane-collapse-context";
import { PaneSpine } from "../pane/pane-spine";
import { NoteItem } from "./note-item";

interface AllNotesListProps {
  currentStack: string[];
  index: number;
  isBlogOnly: boolean;
  languageFilter: NoteLanguageFilter;
  notes: NoteSummary[];
  onBlogOnlyChange: (nextValue: boolean) => void;
  onExpand: (index: number) => void;
  onLanguageFilterChange: (nextValue: NoteLanguageFilter) => void;
  onNoteClick: (slug: string, stackPosition?: number) => void;
}

export const AllNotesList = memo(function AllNotesList({
  notes,
  currentStack,
  index,
  isBlogOnly,
  languageFilter,
  onNoteClick,
  onExpand,
  onBlogOnlyChange,
  onLanguageFilterChange,
}: AllNotesListProps) {
  const isCollapsed = useIsPaneCollapsed(index);
  const scrollToPane = usePaneCollapseScrollTo();
  const t = useTranslations("allNotes");
  const tPane = useTranslations("notePane");
  const paneRef = usePaneRef(index);

  const stackIndexBySlug = useMemo(() => {
    const map = new Map<string, number>();
    for (
      let currentIndex = 0;
      currentIndex < currentStack.length;
      currentIndex += 1
    ) {
      const slug = currentStack[currentIndex];
      if (!(slug && !map.has(slug))) {
        continue;
      }
      map.set(slug, currentIndex);
    }
    return map;
  }, [currentStack]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (isBlogOnly && note.kind !== "blog") {
        return false;
      }

      if (languageFilter !== "all" && note.language !== languageFilter) {
        return false;
      }

      return true;
    });
  }, [notes, isBlogOnly, languageFilter]);

  const handleExpand = useCallback(() => {
    onExpand(index);
    scrollToPane(index);
  }, [index, onExpand, scrollToPane]);

  return (
    <aside
      className="group/allnotes relative sticky left-0 h-full w-full flex-shrink-0 overflow-hidden border-border border-x bg-background md:w-1/3 md:min-w-pane-min md:max-w-3xl"
      data-index={index}
      data-pane
      ref={paneRef}
      style={{
        left: `calc(${index} * var(--pane-spine-width))`,
        zIndex: `calc(var(--z-pane) + ${index})`,
      }}
    >
      {isCollapsed && (
        <div aria-hidden="true" className="absolute inset-0 z-10">
          <PaneSpine index={index} showIndex={false} title={t("title")} />
        </div>
      )}

      <div
        className={cn(
          "absolute top-0 bottom-0 left-0 h-full w-full",
          isCollapsed
            ? "translate-x-[var(--pane-spine-width)] opacity-40"
            : "translate-x-0 opacity-100"
        )}
      >
        {isCollapsed && (
          <>
            <button
              aria-label={`${tPane("expand")} ${t("title")}`}
              className="absolute inset-0 z-overlay cursor-pointer"
              onClick={handleExpand}
              type="button"
            >
              <span className="sr-only">{tPane("expand")}</span>
            </button>
            <div className="absolute top-0 bottom-0 left-0 z-sticky w-px bg-border" />
          </>
        )}

        <ScrollArea className="relative z-0 h-full">
          <div className="sticky top-0 z-sticky border-border/50 border-b bg-background/80 px-4 pt-4 pb-3 backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <a
                  className="inline-flex items-center gap-2 text-foreground transition-opacity hover:opacity-80"
                  href="/"
                >
                  <span className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-muted/35">
                    <Logo className="text-foreground" size={18} />
                  </span>
                  <span className="font-medium text-sm uppercase tracking-[0.18em]">
                    cho.sh
                  </span>
                </a>
                <h2 className="mt-3 font-normal text-2xl text-foreground tracking-tight">
                  {t("title")}
                </h2>
              </div>
              <SettingsDrawer
                compact
                isBlogOnly={isBlogOnly}
                languageFilter={languageFilter}
                onBlogOnlyChange={onBlogOnlyChange}
                onLanguageFilterChange={onLanguageFilterChange}
                triggerClassName="mt-0.5 shrink-0"
              />
            </div>
            <p className="mt-1 font-mono text-muted-foreground text-sm">
              {t("noteCount", { count: filteredNotes.length })}
            </p>
          </div>
          <div className="px-8 py-6">
            <ul className="space-y-1">
              {filteredNotes.map((note) => {
                const stackPosition = stackIndexBySlug.get(note.slug);

                return (
                  <NoteItem
                    currentlyOpenLabel={
                      typeof stackPosition === "number"
                        ? t("currentlyOpen", { position: stackPosition + 1 })
                        : undefined
                    }
                    key={note.slug}
                    note={note}
                    onNoteClick={onNoteClick}
                    stackPosition={stackPosition}
                  />
                );
              })}
            </ul>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
});
