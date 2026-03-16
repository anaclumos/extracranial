"use client";

import { lazy, type ReactNode, Suspense, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { resolvePanesFromStack } from "@/lib/stores/stack-utils";
import type { NotePaneData } from "@/lib/types";
import { useNoteStackContext } from "../client/note-stack-provider";
import { DesktopContainer } from "./desktop-container";

const MobilePaneCarousel = lazy(() =>
  import("../mobile/pane-carousel").then((mod) => ({
    default: mod.MobilePaneCarousel,
  }))
);

interface PaneContainerProps {
  children: ReactNode;
  paneNotes: NotePaneData[];
}

function MobilePaneFallback({
  focusIndex,
  panes,
}: {
  focusIndex: number;
  panes: NotePaneData[];
}) {
  const notchIds =
    panes.length > 0 ? panes.map((pane) => pane.slug) : ["placeholder"];
  const paneCount = Math.max(1, panes.length);
  const activeIndex = Math.min(Math.max(focusIndex, 0), paneCount - 1);
  const activePane = panes[activeIndex];

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center overflow-hidden bg-background">
      <div className="flex h-10 w-full items-center justify-center px-4">
        <div className="flex h-10 items-end justify-center">
          {notchIds.map((notchId, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                aria-hidden="true"
                className="flex h-10 items-center justify-center px-1"
                key={`fallback-notch-${notchId}`}
              >
                <div
                  className="h-6 w-1.5 bg-foreground"
                  style={{
                    opacity: isActive ? 1 : 0.3,
                    transform: `scaleY(${isActive ? 1 : 0.5})`,
                    transformOrigin: "center",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <article className="relative h-full w-[92dvw] overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
            {activeIndex > 0 ? (
              <div
                aria-hidden="true"
                className="absolute top-3 right-3 z-50 flex size-7 items-center justify-center rounded-full bg-muted/80 text-muted-foreground backdrop-blur-sm"
              >
                <div className="size-3 rounded-full bg-muted-foreground/50" />
              </div>
            ) : null}

            <div className="h-full overflow-hidden">
              <div className="p-5 pb-10">
                <header className="mb-4 pr-8">
                  {activePane?.title ? (
                    <h1 className="font-semibold text-foreground text-xl leading-snug">
                      {activePane.title}
                    </h1>
                  ) : (
                    <div className="h-7 w-40 rounded-md bg-muted/70" />
                  )}

                  {activePane?.description ? (
                    <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                      {activePane.description}
                    </p>
                  ) : (
                    <div className="mt-2 space-y-2">
                      <div className="h-4 w-full rounded-md bg-muted/60" />
                      <div className="h-4 w-4/5 rounded-md bg-muted/50" />
                    </div>
                  )}
                </header>

                <div className="space-y-3">
                  <div className="h-4 w-full rounded-md bg-muted/60" />
                  <div className="h-4 w-[94%] rounded-md bg-muted/50" />
                  <div className="h-4 w-[88%] rounded-md bg-muted/50" />
                  <div className="h-4 w-[76%] rounded-md bg-muted/40" />
                  <div className="h-28 rounded-xl border border-border/40 bg-muted/25" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export function PaneContainer({ children, paneNotes }: PaneContainerProps) {
  const isMobile = useIsMobile();
  const { focusIndex, stack, pushNote, removePane } = useNoteStackContext();
  const panes = useMemo(
    () => resolvePanesFromStack(stack, paneNotes),
    [stack, paneNotes]
  );

  if (isMobile) {
    return (
      <Suspense
        fallback={<MobilePaneFallback focusIndex={focusIndex} panes={panes} />}
      >
        <MobilePaneCarousel
          focusIndex={focusIndex}
          onClose={(index: number) => removePane(index, panes.length)}
          onLinkClick={pushNote}
          panes={panes}
        />
      </Suspense>
    );
  }

  return (
    <DesktopContainer focusIndex={focusIndex}>{children}</DesktopContainer>
  );
}
