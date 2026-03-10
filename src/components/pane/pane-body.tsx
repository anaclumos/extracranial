"use client";

import { Component, memo, type ReactNode } from "react";
import { BacklinksSection } from "@/components/backlinks-section";
import { MdxNoteContent } from "@/components/content/mdx-components";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "@/i18n/provider";
import type { BacklinkInfo, SerializedNoteContent } from "@/lib/types";

interface PaneBodyProps {
  backlinks: BacklinkInfo[];
  description?: string;
  editUrl?: string;
  onLinkClick: (slug: string) => void;
  serializedContent: SerializedNoteContent;
  title: string;
}

interface NoteContentBoundaryProps {
  children: ReactNode;
}

interface NoteContentBoundaryState {
  hasError: boolean;
}

class NoteContentBoundary extends Component<
  NoteContentBoundaryProps,
  NoteContentBoundaryState
> {
  state: NoteContentBoundaryState = { hasError: false };

  static getDerivedStateFromError(): NoteContentBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="px-4 py-3 text-muted-foreground text-sm">
          Some rich content failed to render in this note. The rest of the page
          remains available.
        </div>
      );
    }

    return this.props.children;
  }
}

export const PaneBody = memo(function PaneBody(props: PaneBodyProps) {
  const {
    title,
    description,
    serializedContent,
    backlinks,
    onLinkClick,
    editUrl,
  } = props;
  const t = useTranslations("notePane");
  const tCommon = useTranslations("common");

  return (
    <ScrollArea className="relative z-0 h-full">
      <div className="flex min-h-full flex-col">
        <header className="px-4 pt-4 pb-2">
          <h1 className="font-normal text-3xl text-foreground tracking-tight dark:bg-gradient-to-br dark:from-white dark:via-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent">
            {title}
          </h1>
          {description && (
            <p className="mt-2 font-normal text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </header>

        <div className="flex-1">
          <NoteContentBoundary>
            <MdxNoteContent
              onLinkClick={onLinkClick}
              source={serializedContent}
            />
          </NoteContentBoundary>
        </div>

        {backlinks.length > 0 && (
          <footer className="border-border/40 border-t px-8 py-6">
            <BacklinksSection
              backlinks={backlinks}
              onBacklinkClick={onLinkClick}
            />
          </footer>
        )}

        {editUrl && (
          <footer className="border-border/40 border-t px-8 py-4">
            <a
              className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              href={editUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("editOnGitHub")}
              <span className="sr-only"> ({tCommon("opensInNewTab")})</span>
            </a>
          </footer>
        )}
      </div>
    </ScrollArea>
  );
});
