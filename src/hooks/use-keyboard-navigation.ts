"use client"

import { useCallback, useEffect } from "react"
import type { KeyHandlerContext } from "@/lib/keyboard/key-handlers"
import { isTextInput } from "@/lib/keyboard/key-handlers"
import { keyboardShortcuts } from "@/lib/keyboard/keyboard-config"

interface KeyboardNavigationProps {
  stackLength: number
  focusIndex: number
  maxFocusIndex?: number
  onFocusChange: (index: number) => void
  onPopStack: () => void
  onScrollToPane: (index: number) => void
}

export function useKeyboardNavigation({
  stackLength,
  focusIndex,
  maxFocusIndex,
  onFocusChange,
  onPopStack,
  onScrollToPane,
}: KeyboardNavigationProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) {
        return
      }

      if (isTextInput(e.target)) {
        return
      }

      const handler = keyboardShortcuts[e.key]
      if (handler) {
        e.preventDefault()
        const ctx: KeyHandlerContext = {
          focusIndex,
          stackLength,
          maxFocusIndex: maxFocusIndex ?? stackLength,
          onFocusChange,
          onPopStack,
          onScrollToPane,
        }
        handler(ctx)
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
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])
}
