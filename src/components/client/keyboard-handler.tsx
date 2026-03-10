"use client";

import { useEffect } from "react";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import {
  useKeyboardFocusIndex,
  usePaneUIStore,
  useSetKeyboardFocusIndex,
} from "@/lib/stores/pane-ui-store";
import { useNoteStackContext } from "./note-stack-provider";

export function KeyboardHandler() {
  const { stack, focusIndex, popNote } = useNoteStackContext();
  const keyboardFocusIndex = useKeyboardFocusIndex();
  const setKeyboardFocusIndex = useSetKeyboardFocusIndex();
  const scrollToPane = usePaneUIStore((state) => state.scrollToPane);
  const maxFocusIndex = stack.length + 1;

  useEffect(() => {
    const maxIndex = Math.max(0, maxFocusIndex - 1);
    const nextIndex = Math.min(Math.max(0, focusIndex), maxIndex);
    if (keyboardFocusIndex !== nextIndex) {
      setKeyboardFocusIndex(nextIndex);
    }
  }, [focusIndex, maxFocusIndex, keyboardFocusIndex, setKeyboardFocusIndex]);

  useKeyboardNavigation({
    stackLength: stack.length,
    focusIndex: keyboardFocusIndex,
    maxFocusIndex,
    onFocusChange: setKeyboardFocusIndex,
    onPopStack: popNote,
    onScrollToPane: scrollToPane,
  });

  return null;
}
