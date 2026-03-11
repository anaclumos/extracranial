"use client";

import { type ReactNode, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  resetPaneCollapseStore,
  setCollapsedPaneIndices,
  setPaneRefRegistration,
  setPaneScrollTo,
} from "./pane-collapse-context";

interface DesktopContainerProps {
  children: ReactNode;
  focusIndex: number;
  scrollToPaneRef?: React.MutableRefObject<((index: number) => void) | null>;
}

export function DesktopContainer({
  children,
  focusIndex,
  scrollToPaneRef,
}: DesktopContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paneRefs = useRef(new Map<number, HTMLElement>());
  const focusIndexRef = useRef(focusIndex);
  const collapseThresholdRef = useRef(0);
  const collapsedIndicesRef = useRef(new Set<number>());
  const scrollFrameRef = useRef<number | null>(null);

  focusIndexRef.current = focusIndex;

  const getScrollBehavior = useCallback(() => {
    if (typeof window === "undefined") {
      return "smooth" as const;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
  }, []);

  const scrollPaneIntoViewIfFocused = useCallback(
    (index: number, element: HTMLElement) => {
      if (index !== focusIndexRef.current) {
        return;
      }
      requestAnimationFrame(() => {
        element.scrollIntoView({
          behavior: getScrollBehavior(),
          block: "nearest",
          inline: "center",
        });
      });
    },
    [getScrollBehavior]
  );

  const registerPaneRef = useCallback(
    (index: number, element: HTMLElement | null) => {
      if (element) {
        paneRefs.current.set(index, element);
        scrollPaneIntoViewIfFocused(index, element);
        return;
      }
      paneRefs.current.delete(index);
    },
    [scrollPaneIntoViewIfFocused]
  );

  const scrollToPane = useCallback(
    (index: number) => {
      const targetPane = paneRefs.current.get(index);
      if (!targetPane) {
        return;
      }
      targetPane.scrollIntoView({
        behavior: getScrollBehavior(),
        block: "nearest",
        inline: "center",
      });
      targetPane.focus();
    },
    [getScrollBehavior]
  );

  const updateCollapseThreshold = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const firstPane = container.querySelector(
      "[data-pane]"
    ) as HTMLElement | null;
    if (!firstPane) {
      return;
    }

    // --pane-spine-width: 2.5rem, root font-size: 16px = 40px
    const SPINE_WIDTH_PX = 40;
    collapseThresholdRef.current = Math.max(
      0,
      firstPane.offsetWidth - SPINE_WIDTH_PX
    );
  }, []);

  const updateCollapsedIndices = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const collapseThreshold = collapseThresholdRef.current;
    if (collapseThreshold <= 0) {
      if (collapsedIndicesRef.current.size === 0) {
        return;
      }

      const emptySet = new Set<number>();
      collapsedIndicesRef.current = emptySet;
      setCollapsedPaneIndices(emptySet);
      return;
    }

    const next = new Set<number>();
    let index = 0;
    while ((index + 1) * collapseThreshold <= container.scrollLeft) {
      next.add(index);
      index += 1;
    }

    const previous = collapsedIndicesRef.current;
    if (previous.size !== next.size) {
      collapsedIndicesRef.current = next;
      setCollapsedPaneIndices(next);
      return;
    }

    for (const value of next) {
      if (!previous.has(value)) {
        collapsedIndicesRef.current = next;
        setCollapsedPaneIndices(next);
        return;
      }
    }
  }, []);

  const scheduleCollapsedIndicesUpdate = useCallback(() => {
    if (scrollFrameRef.current !== null) {
      return;
    }

    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      updateCollapsedIndices();
    });
  }, [updateCollapsedIndices]);

  useEffect(() => {
    if (!scrollToPaneRef) {
      return;
    }
    scrollToPaneRef.current = scrollToPane;
    return () => {
      scrollToPaneRef.current = null;
    };
  }, [scrollToPane, scrollToPaneRef]);

  useEffect(() => {
    setPaneRefRegistration(registerPaneRef);
    setPaneScrollTo(scrollToPane);

    return () => {
      resetPaneCollapseStore();
    };
  }, [registerPaneRef, scrollToPane]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    updateCollapseThreshold();
    const frameId = requestAnimationFrame(updateCollapsedIndices);

    if (typeof ResizeObserver === "undefined") {
      const handleResize = () => {
        updateCollapseThreshold();
        scheduleCollapsedIndicesUpdate();
      };
      window.addEventListener("resize", handleResize);
      return () => {
        cancelAnimationFrame(frameId);
        if (scrollFrameRef.current !== null) {
          cancelAnimationFrame(scrollFrameRef.current);
          scrollFrameRef.current = null;
        }
        window.removeEventListener("resize", handleResize);
      };
    }

    const observer = new ResizeObserver(() => {
      updateCollapseThreshold();
      scheduleCollapsedIndicesUpdate();
    });
    observer.observe(container);

    const firstPane = container.querySelector("[data-pane]");
    if (firstPane) {
      observer.observe(firstPane);
    }

    return () => {
      cancelAnimationFrame(frameId);
      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
      observer.disconnect();
    };
  }, [
    scheduleCollapsedIndicesUpdate,
    updateCollapseThreshold,
    updateCollapsedIndices,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.addEventListener("scroll", scheduleCollapsedIndicesUpdate, {
      passive: true,
    });
    return () => {
      container.removeEventListener("scroll", scheduleCollapsedIndicesUpdate);
    };
  }, [scheduleCollapsedIndicesUpdate]);

  return (
    <div
      className={cn(
        "relative flex min-h-0 flex-1 overflow-x-auto overflow-y-hidden",
        "overscroll-x-none scroll-smooth bg-background",
        "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground/20"
      )}
      ref={containerRef}
    >
      {children}
    </div>
  );
}
