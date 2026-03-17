"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { cn } from "@/lib/utils";
import {
  resetPaneCollapseStore,
  setCollapsedPaneIndices,
  setPaneRefRegistration,
  setPaneScrollTo,
} from "./pane-collapse-context";

interface DesktopContainerProps {
  children: ReactNode;
  className?: string;
  focusIndex: number;
  paneCount: number;
}

export function DesktopContainer({
  className,
  children,
  focusIndex,
  paneCount,
}: DesktopContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paneRefs = useRef(new Map<number, HTMLElement>());
  const focusIndexRef = useRef(focusIndex);
  const collapseThresholdRef = useRef(0);
  const collapsedIndicesRef = useRef(new Set<number>());
  const scrollFrameRef = useRef<number | null>(null);
  focusIndexRef.current = focusIndex;

  const publishCollapsedIndices = useCallback((next: Set<number>) => {
    collapsedIndicesRef.current = next;
    setCollapsedPaneIndices(next);
  }, []);

  const cancelScheduledCollapsedIndicesUpdate = useCallback(() => {
    if (scrollFrameRef.current === null) {
      return;
    }

    cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = null;
  }, []);

  const getScrollBehavior = useCallback(() => {
    return "auto" as const;
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

      publishCollapsedIndices(new Set<number>());
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
      publishCollapsedIndices(next);
      return;
    }

    for (const value of next) {
      if (!previous.has(value)) {
        publishCollapsedIndices(next);
        return;
      }
    }
  }, [publishCollapsedIndices]);

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
        cancelScheduledCollapsedIndicesUpdate();
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
      cancelScheduledCollapsedIndicesUpdate();
      observer.disconnect();
    };
  }, [
    cancelScheduledCollapsedIndicesUpdate,
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

  useLayoutEffect(() => {
    if (paneCount < 1) {
      return;
    }

    updateCollapseThreshold();
    updateCollapsedIndices();
  }, [paneCount, updateCollapseThreshold, updateCollapsedIndices]);

  return (
    <div
      className={cn(
        "relative flex min-h-0 flex-1 overflow-x-auto overflow-y-hidden",
        "overscroll-x-none bg-background",
        "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground/20",
        className
      )}
      ref={containerRef}
    >
      {children}
    </div>
  );
}
