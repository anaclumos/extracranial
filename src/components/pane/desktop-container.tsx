"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { PaneCollapseContext } from "./pane-collapse-context";

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
  const [collapsedIndices, setCollapsedIndices] = useState<Set<number>>(
    new Set()
  );

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
      setCollapsedIndices((prev) => (prev.size === 0 ? prev : new Set()));
      return;
    }

    const next = new Set<number>();
    let index = 0;
    while ((index + 1) * collapseThreshold <= container.scrollLeft) {
      next.add(index);
      index += 1;
    }

    setCollapsedIndices((prev) => {
      if (prev.size !== next.size) {
        return next;
      }
      for (const value of next) {
        if (!prev.has(value)) {
          return next;
        }
      }
      return prev;
    });
  }, []);

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
    const container = containerRef.current;
    if (!container) {
      return;
    }

    updateCollapseThreshold();
    const frameId = requestAnimationFrame(updateCollapsedIndices);

    if (typeof ResizeObserver === "undefined") {
      const handleResize = () => {
        updateCollapseThreshold();
        updateCollapsedIndices();
      };
      window.addEventListener("resize", handleResize);
      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
      };
    }

    const observer = new ResizeObserver(() => {
      updateCollapseThreshold();
      updateCollapsedIndices();
    });
    observer.observe(container);

    const firstPane = container.querySelector("[data-pane]");
    if (firstPane) {
      observer.observe(firstPane);
    }

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [updateCollapseThreshold, updateCollapsedIndices]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.addEventListener("scroll", updateCollapsedIndices, {
      passive: true,
    });
    return () => {
      container.removeEventListener("scroll", updateCollapsedIndices);
    };
  }, [updateCollapsedIndices]);

  const contextValue = useMemo(
    () => ({ collapsedIndices, registerPaneRef, scrollToPane }),
    [collapsedIndices, registerPaneRef, scrollToPane]
  );

  return (
    <PaneCollapseContext.Provider value={contextValue}>
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
    </PaneCollapseContext.Provider>
  );
}
