"use client";

import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTranslations } from "@/i18n/provider";
import {
  paneContentVariants,
  paneVariants,
  reducedMotionTransition,
  spineVariants,
  springQuick,
  springSubtle,
} from "@/lib/animations";
import type { NoteSummary } from "@/lib/types";
import { PaneBackground } from "../pane/pane-background";
import {
  useIsPaneCollapsed,
  usePaneCollapseScrollTo,
  useRegisterPaneRef,
} from "../pane/pane-collapse-context";
import { PaneSpine } from "../pane/pane-spine";
import { NoteItem } from "./note-item";

interface AllNotesListProps {
  currentStack: string[];
  index: number;
  notes: NoteSummary[];
  onExpand: (index: number) => void;
  onNoteClick: (slug: string, stackPosition?: number) => void;
}

export const AllNotesList = memo(function AllNotesList({
  notes,
  currentStack,
  index,
  onNoteClick,
  onExpand,
}: AllNotesListProps) {
  const isCollapsed = useIsPaneCollapsed(index);
  const scrollToPane = usePaneCollapseScrollTo();
  const registerPaneRef = useRegisterPaneRef();
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("allNotes");
  const tPane = useTranslations("notePane");
  const paneRef = useRef<HTMLElement>(null);
  const [isBlogOnly, setIsBlogOnly] = useState(false);

  useEffect(() => {
    registerPaneRef(index, paneRef.current);
    return () => registerPaneRef(index, null);
  }, [index, registerPaneRef]);

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
    return isBlogOnly ? notes.filter((note) => note.kind === "blog") : notes;
  }, [notes, isBlogOnly]);

  const handleExpand = useCallback(() => {
    onExpand(index);
    scrollToPane(index);
  }, [index, onExpand, scrollToPane]);

  const getCurrentlyOpenLabel = useCallback(
    (pos: number) => t("currentlyOpen", { position: pos }),
    [t]
  );

  const transition = prefersReducedMotion
    ? reducedMotionTransition
    : springSubtle;
  const quickTransition = prefersReducedMotion
    ? reducedMotionTransition
    : springQuick;

  return (
    <motion.aside
      animate="animate"
      className="group/allnotes relative sticky left-0 h-full w-full flex-shrink-0 overflow-hidden border-border border-x bg-background md:w-1/3 md:max-w-3xl md:min-w-pane-min md:opacity-20 md:transition-opacity md:duration-300 md:hover:opacity-100"
      data-index={index}
      data-pane
      exit="exit"
      initial={prefersReducedMotion ? false : "initial"}
      layout="position"
      ref={paneRef}
      style={{
        left: `calc(${index} * var(--pane-spine-width))`,
        zIndex: `calc(var(--z-pane) + ${index})`,
      }}
      transition={transition}
      variants={paneVariants}
    >
      <PaneBackground />

      <AnimatePresence>
        {isCollapsed && (
          <motion.div
            animate="visible"
            className="absolute inset-0 z-10 cursor-pointer"
            exit="hidden"
            initial="hidden"
            key="spine"
            onClick={handleExpand}
            transition={quickTransition}
            variants={spineVariants}
          >
            <PaneSpine index={index} showIndex={false} title={t("title")} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={isCollapsed ? "collapsed" : "expanded"}
        className="absolute top-0 bottom-0 left-0 h-full w-full"
        transition={transition}
        variants={paneContentVariants}
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
          <div className="sticky top-0 z-sticky border-border/50 border-b bg-background/80 px-4 pt-4 pb-2 backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-normal text-2xl text-foreground tracking-tight dark:bg-gradient-to-br dark:from-white dark:via-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent">
                {t("title")}
              </h2>
              <label
                className="flex items-center gap-2 text-muted-foreground text-sm"
                htmlFor="blog-only-toggle"
              >
                <span>{t("blogOnly")}</span>
                <Switch
                  aria-label={t("blogOnlyToggle")}
                  checked={isBlogOnly}
                  id="blog-only-toggle"
                  onCheckedChange={setIsBlogOnly}
                />
              </label>
            </div>
            <p className="mt-1 font-mono text-muted-foreground text-sm">
              {t("noteCount", { count: filteredNotes.length })}
            </p>
          </div>
          <div className="px-8 py-6">
            <ul className="space-y-1">
              {filteredNotes.map((note) => (
                <NoteItem
                  currentlyOpenLabel={getCurrentlyOpenLabel}
                  key={note.slug}
                  note={note}
                  onNoteClick={onNoteClick}
                  stackPosition={stackIndexBySlug.get(note.slug)}
                />
              ))}
            </ul>
          </div>
        </ScrollArea>
      </motion.div>
    </motion.aside>
  );
});
