"use client"

import type { MotionValue, PanInfo } from "motion/react"
import { useCallback, useRef } from "react"
import type { NotePaneData } from "@/lib/types"
import { calculateDragTarget } from "./transform-calculator"

interface UseGestureHandlersProps {
  panes: NotePaneData[]
  currentIndex: MotionValue<number>
  animateToIndex: (index: number) => void
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function useGestureHandlers({
  panes,
  currentIndex,
  animateToIndex,
  containerRef,
}: UseGestureHandlersProps) {
  const dragStartIndex = useRef(0)
  const isDragging = useRef(false)

  const handleDragStart = useCallback(() => {
    isDragging.current = true
    dragStartIndex.current = currentIndex.get()
  }, [currentIndex])

  const handleDrag = useCallback(
    (_: unknown, info: PanInfo) => {
      const cardWidth = containerRef.current?.offsetWidth ?? 350
      const dragProgress = -info.offset.x / cardWidth
      const newIndex = dragStartIndex.current + dragProgress
      const clampedIndex = Math.max(
        -0.15,
        Math.min(newIndex, panes.length - 1 + 0.15)
      )
      currentIndex.set(clampedIndex)
    },
    [currentIndex, panes.length, containerRef]
  )

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      isDragging.current = false
      const cardWidth = containerRef.current?.offsetWidth ?? 350
      const targetIndex = calculateDragTarget(
        currentIndex.get(),
        info.velocity.x,
        info.offset.x,
        cardWidth,
        panes.length - 1
      )
      dragStartIndex.current = targetIndex
      animateToIndex(targetIndex)
    },
    [currentIndex, animateToIndex, panes.length, containerRef]
  )

  return {
    isDragging,
    dragStartIndex,
    handleDragStart,
    handleDrag,
    handleDragEnd,
  }
}
