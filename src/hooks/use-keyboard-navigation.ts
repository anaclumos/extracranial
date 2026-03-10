"use client";

import { useCallback, useEffect } from "react";

interface KeyboardNavigationProps {
  focusIndex: number;
  maxFocusIndex?: number;
  onFocusChange: (index: number) => void;
  onPopStack: () => void;
  onScrollToPane: (index: number) => void;
  stackLength: number;
}

function isTextInput(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target.isContentEditable
  );
}

export function useKeyboardNavigation({
  stackLength,
  focusIndex,
  maxFocusIndex: maxFocusIndexProp,
  onFocusChange,
  onPopStack,
  onScrollToPane,
}: KeyboardNavigationProps) {
  const maxFocusIndex = maxFocusIndexProp ?? stackLength;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      if (isTextInput(e.target)) {
        return;
      }

      const upperBound = Math.max(0, maxFocusIndex - 1);

      switch (e.key) {
        case "ArrowLeft":
          if (focusIndex > 0) {
            e.preventDefault();
            onFocusChange(focusIndex - 1);
            onScrollToPane(focusIndex - 1);
          }
          break;
        case "ArrowRight":
          if (focusIndex < upperBound) {
            e.preventDefault();
            onFocusChange(focusIndex + 1);
            onScrollToPane(focusIndex + 1);
          }
          break;
        case "Escape":
          if (stackLength > 1) {
            e.preventDefault();
            onPopStack();
          }
          break;
        case "Home":
          e.preventDefault();
          onFocusChange(0);
          onScrollToPane(0);
          break;
        case "End":
          e.preventDefault();
          onFocusChange(upperBound);
          onScrollToPane(upperBound);
          break;
        default:
          break;
      }
    },
    [
      focusIndex,
      stackLength,
      maxFocusIndex,
      onFocusChange,
      onPopStack,
      onScrollToPane,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
