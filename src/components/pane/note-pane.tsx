"use client";

import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { type CSSProperties, memo, useCallback } from "react";
import { useTranslations } from "@/i18n/provider";
import type { BacklinkInfo, NotePaneData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PaneBody } from "./pane-body";
import { useIsPaneCollapsed, usePaneCollapseScrollTo, usePaneRef } from "./pane-collapse-context";
import { PaneSpine } from "./pane-spine";

interface NotePaneProps {
  backlinks: BacklinkInfo[];
  description?: string;
  editUrl?: string;
  excerpt?: string;
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
  excerpt,
  serializedContent,
  index,
  isClosable = false,
  backlinks,
  editUrl,
  onLinkClick,
  onExpand,
  onClose,
}: NotePaneProps) {
  const isCollapsed = useIsPaneCollapsed(index);
  const scrollToPane = usePaneCollapseScrollTo();
  const t = useTranslations("notePane");
  const paneRef = usePaneRef(index);

  const handleLinkClick = useCallback(
    (linkSlug: string) => {
      onLinkClick(linkSlug, index);
    },
    [onLinkClick, index],
  );

  const handleExpand = useCallback(() => {
    onExpand(index);
    scrollToPane(index);
  }, [index, onExpand, scrollToPane]);

  const handleClose = useCallback(() => {
    onClose(index);
  }, [onClose, index]);

  return (
    <article
      aria-label={title}
      className={cn(
        "h-full w-full flex-shrink-0 overflow-hidden md:w-1/3 md:min-w-pane-min md:max-w-3xl",
        "group/pane relative border-border border-l bg-background",
        "left-0 md:sticky md:left-[var(--pane-left-offset)]",
        "snap-start md:snap-align-none",
      )}
      data-index={index}
      data-pane
      ref={paneRef}
      style={
        {
          "--pane-left-offset": `calc(${index} * var(--pane-spine-width))`,
          zIndex: `calc(var(--z-pane) + ${index})`,
        } as CSSProperties
      }
      tabIndex={-1}
    >
      {isCollapsed && (
        <div className="absolute inset-0 z-10 cursor-pointer" onClick={handleExpand}>
          <PaneSpine
            description={description}
            excerpt={excerpt}
            index={index}
            showIndex
            title={title}
          />
        </div>
      )}

      <div
        className={cn(
          "absolute top-0 bottom-0 left-0 h-full w-full",
          isCollapsed
            ? "translate-x-[var(--pane-spine-width)] opacity-40"
            : "translate-x-0 opacity-100",
        )}
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
        {isCollapsed && <div className="absolute top-0 bottom-0 left-0 z-sticky w-px bg-border" />}

        <PaneBody
          backlinks={backlinks}
          description={description}
          editUrl={editUrl}
          onLinkClick={handleLinkClick}
          serializedContent={serializedContent}
          title={title}
        />

        {!isCollapsed && isClosable && (
          <button
            aria-label={t("closeNote", { title })}
            className={cn(
              "absolute top-4 right-4 z-overlay",
              "flex size-8 items-center justify-center rounded-full",
              "bg-transparent text-muted-foreground hover:bg-muted",
              "cursor-pointer",
            )}
            onClick={(event) => {
              event.stopPropagation();
              handleClose();
            }}
            type="button"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </article>
  );
});
