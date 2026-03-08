"use client"

import { animate, useMotionValue } from "motion/react"
import { useCallback } from "react"
import type { NotePaneData } from "@/lib/types"
import { useFocusSync } from "./focus-sync"
import { useGestureHandlers } from "./gesture-handlers"

interface UseCarouselStateProps {
  panes: NotePaneData[]
  focusIndex: number
  prefersReducedMotion: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function useCarouselState({
  panes,
  focusIndex,
  prefersReducedMotion,
  containerRef,
}: UseCarouselStateProps) {
  const currentIndex = useMotionValue(focusIndex)

  const animateToIndex = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, panes.length - 1))
      if (prefersReducedMotion) {
        currentIndex.set(clampedIndex)
      } else {
        animate(currentIndex, clampedIndex, {
          type: "spring",
          duration: 0.5,
          bounce: 0.12,
        })
      }
    },
    [panes.length, currentIndex, prefersReducedMotion]
  )

  const {
    isDragging,
    dragStartIndex,
    handleDragStart,
    handleDrag,
    handleDragEnd,
  } = useGestureHandlers({
    panes,
    currentIndex,
    animateToIndex,
    containerRef,
  })

  useFocusSync({
    panes,
    focusIndex,
    currentIndex,
    animateToIndex,
    isDragging,
    dragStartIndex,
  })

  return {
    currentIndex,
    animateToIndex,
    handleDragStart,
    handleDrag,
    handleDragEnd,
  }
}
