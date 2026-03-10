"use client";

import { useEffect, useEffectEvent } from "react";

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

  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey
    ) {
      return;
    }

    if (isTextInput(event.target)) {
      return;
    }

    const upperBound = Math.max(0, maxFocusIndex - 1);

    switch (event.key) {
      case "ArrowLeft":
        if (focusIndex > 0) {
          event.preventDefault();
          onFocusChange(focusIndex - 1);
          onScrollToPane(focusIndex - 1);
        }
        break;
      case "ArrowRight":
        if (focusIndex < upperBound) {
          event.preventDefault();
          onFocusChange(focusIndex + 1);
          onScrollToPane(focusIndex + 1);
        }
        break;
      case "Escape":
        if (stackLength > 1) {
          event.preventDefault();
          onPopStack();
        }
        break;
      case "Home":
        event.preventDefault();
        onFocusChange(0);
        onScrollToPane(0);
        break;
      case "End":
        event.preventDefault();
        onFocusChange(upperBound);
        onScrollToPane(upperBound);
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      handleKeyDown(event);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
}
