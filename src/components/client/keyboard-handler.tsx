"use client";

import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { usePaneUIStore } from "@/lib/stores/pane-ui-store";
import { useNoteStackContext } from "./note-stack-provider";

export function KeyboardHandler() {
  const { stack, focusIndex, popNote, focusPane } = useNoteStackContext();
  const scrollToPane = usePaneUIStore((state) => state.scrollToPane);
  const maxFocusIndex = stack.length + 1;

  useKeyboardNavigation({
    stackLength: stack.length,
    focusIndex,
    maxFocusIndex,
    onFocusChange: focusPane,
    onPopStack: popNote,
    onScrollToPane: scrollToPane,
  });

  return null;
}
