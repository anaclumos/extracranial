"use client";

import { lazy, type MutableRefObject, type ReactNode, Suspense } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { NotePaneData } from "@/lib/types";
import { useMobileData } from "../client/mobile-orchestrator";
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
  scrollToPaneRef?: MutableRefObject<((index: number) => void) | null>;
}

export function PaneContainer({
  children,
  scrollToPaneRef,
  paneNotes,
}: PaneContainerProps) {
  const isMobile = useIsMobile();
  const { focusIndex } = useNoteStackContext();
  const mobileData = useMobileData({ paneNotes });

  if (isMobile) {
    return (
      <Suspense fallback={null}>
        <MobilePaneCarousel
          focusIndex={focusIndex}
          onClose={mobileData.onClose}
          onLinkClick={mobileData.onLinkClick}
          panes={mobileData.panes}
        />
      </Suspense>
    );
  }

  return (
    <DesktopContainer focusIndex={focusIndex} scrollToPaneRef={scrollToPaneRef}>
      {children}
    </DesktopContainer>
  );
}
