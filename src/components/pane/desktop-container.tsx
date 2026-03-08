"use client"

import { type ReactNode, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"
import { useCollapseDetection } from "./collapse-detector"
import { PaneCollapseContext } from "./pane-collapse-context"
import { useScrollManager } from "./scroll-manager"
import { useResizeObserver, useScrollListener } from "./use-desktop-effects"

interface DesktopContainerProps {
  children: ReactNode
  focusIndex: number
  scrollToPaneRef?: React.MutableRefObject<((index: number) => void) | null>
}

export function DesktopContainer({
  children,
  focusIndex,
  scrollToPaneRef,
}: DesktopContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { registerPaneRef, scrollToPane } = useScrollManager(
    focusIndex,
    scrollToPaneRef
  )
  const { collapsedIndices, updateCollapseThreshold, updateCollapsedIndices } =
    useCollapseDetection(containerRef, false)

  useResizeObserver(
    containerRef,
    updateCollapseThreshold,
    updateCollapsedIndices
  )
  useScrollListener(containerRef, updateCollapsedIndices)

  const contextValue = useMemo(
    () => ({ collapsedIndices, registerPaneRef, scrollToPane }),
    [collapsedIndices, registerPaneRef, scrollToPane]
  )

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
  )
}
