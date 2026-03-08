"use client"

import type { MotionValue } from "motion/react"
import { useEffect, useRef } from "react"
import type { NotePaneData } from "@/lib/types"

interface UseFocusSyncProps {
  panes: NotePaneData[]
  focusIndex: number
  currentIndex: MotionValue<number>
  animateToIndex: (index: number) => void
  isDragging: React.MutableRefObject<boolean>
  dragStartIndex: React.MutableRefObject<number>
}

export function useFocusSync({
  panes,
  focusIndex,
  currentIndex,
  animateToIndex,
  isDragging,
  dragStartIndex,
}: UseFocusSyncProps) {
  const prevPanesLengthRef = useRef(panes.length)
  const prevFocusIndexRef = useRef(focusIndex)
  const prevFocusedSlugRef = useRef(panes[focusIndex]?.slug)
  const isInitialMount = useRef(true)

  const focusedSlug = panes[focusIndex]?.slug

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      currentIndex.set(focusIndex)
      dragStartIndex.current = focusIndex
      prevFocusIndexRef.current = focusIndex
      prevFocusedSlugRef.current = focusedSlug
      return
    }

    const panesAdded = panes.length > prevPanesLengthRef.current
    const focusIndexChanged = focusIndex !== prevFocusIndexRef.current
    const focusedPaneChanged = focusedSlug !== prevFocusedSlugRef.current

    prevPanesLengthRef.current = panes.length
    prevFocusIndexRef.current = focusIndex
    prevFocusedSlugRef.current = focusedSlug

    if (focusIndexChanged || focusedPaneChanged) {
      if (!isDragging.current) {
        dragStartIndex.current = focusIndex
      }
      if (panesAdded) {
        requestAnimationFrame(() => {
          animateToIndex(focusIndex)
        })
      } else {
        animateToIndex(focusIndex)
      }
    }
  }, [
    focusIndex,
    focusedSlug,
    panes.length,
    animateToIndex,
    currentIndex,
    isDragging,
    dragStartIndex,
  ])
}
