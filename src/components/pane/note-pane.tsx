"use client";

import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "motion/react";
import {
  type CSSProperties,
  memo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTranslations } from "@/i18n/provider";
import {
  closeButtonVariants,
  paneContentVariants,
  paneVariants,
  reducedMotionTransition,
  spineVariants,
  springQuick,
  springSubtle,
} from "@/lib/animations";
import type { BacklinkInfo, NotePaneData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PaneBackground } from "./pane-background";
import { PaneBody } from "./pane-body";
import { usePaneCollapse } from "./pane-collapse-context";
import { PaneSpine } from "./pane-spine";

interface NotePaneProps {
  backlinks: BacklinkInfo[];
  description?: string;
  editUrl?: string;
  index: number;
  isClosable?: boolean;
  onClose: (index: number) => void;
  onExpand: (index: number) => void;
  onLinkClick: (slug: string, fromIndex: number) => void;
  serializedContent: NotePaneData["serializedContent"];
  title: string;
}

export const NotePane = memo(function NotePane({
  title,
  description,
  serializedContent,
  index,
  isClosable = false,
  backlinks,
  editUrl,
  onLinkClick,
  onExpand,
  onClose,
}: NotePaneProps) {
  const { collapsedIndices, registerPaneRef } = usePaneCollapse();
  const isCollapsed = collapsedIndices.has(index);
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("notePane");
  const paneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerPaneRef(index, paneRef.current);
    return () => registerPaneRef(index, null);
  }, [index, registerPaneRef]);

  const handleLinkClick = useCallback(
    (linkSlug: string) => {
      onLinkClick(linkSlug, index);
    },
    [onLinkClick, index]
  );

  const handleExpand = useCallback(() => {
    onExpand(index);
  }, [onExpand, index]);

  const handleClose = useCallback(() => {
    onClose(index);
  }, [onClose, index]);

  const transition = prefersReducedMotion
    ? reducedMotionTransition
    : springSubtle;
  const quickTransition = prefersReducedMotion
    ? reducedMotionTransition
    : springQuick;

  return (
    <motion.article
      animate="animate"
      aria-label={title}
      className={cn(
        "h-full w-full flex-shrink-0 overflow-hidden md:w-1/3 md:min-w-pane-min",
        "group/pane relative border-border border-l bg-background",
        "left-0 md:sticky md:left-[var(--pane-left-offset)]",
        "snap-start md:snap-align-none"
      )}
      data-index={index}
      data-pane
      exit="exit"
      initial={prefersReducedMotion ? false : "initial"}
      layout
      ref={paneRef}
      style={
        {
          "--pane-left-offset": `calc(${index} * var(--pane-spine-width))`,
          zIndex: `calc(var(--z-pane) + ${index})`,
        } as CSSProperties
      }
      tabIndex={-1}
      transition={transition}
      variants={paneVariants}
    >
      <PaneBackground />

      <AnimatePresence>
        {isCollapsed && (
          <motion.div
            animate="visible"
            className="absolute inset-0 z-10"
            exit="hidden"
            initial="hidden"
            key="spine"
            transition={quickTransition}
            variants={spineVariants}
          >
            <PaneSpine
              description={description}
              index={index}
              showIndex
              title={title}
            />
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
          <button
            aria-label={t("expandNote", { title })}
            className="absolute inset-0 z-overlay cursor-pointer"
            onClick={handleExpand}
            type="button"
          >
            <span className="sr-only">{t("expand")}</span>
          </button>
        )}
        {isCollapsed && (
          <div className="absolute top-0 bottom-0 left-0 z-sticky w-px bg-border" />
        )}

        <PaneBody
          backlinks={backlinks}
          description={description}
          editUrl={editUrl}
          onLinkClick={handleLinkClick}
          serializedContent={serializedContent}
          title={title}
        />

        <AnimatePresence>
          {!isCollapsed && isClosable && (
            <motion.button
              animate="animate"
              aria-label={t("closeNote", { title })}
              className={cn(
                "absolute top-4 right-4 z-overlay",
                "flex size-8 items-center justify-center rounded-full",
                "bg-transparent text-muted-foreground transition-colors hover:bg-muted",
                "cursor-pointer"
              )}
              exit="exit"
              initial="initial"
              onClick={(event) => {
                event.stopPropagation();
                handleClose();
              }}
              transition={quickTransition}
              type="button"
              variants={closeButtonVariants}
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={1.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.article>
  );
});
