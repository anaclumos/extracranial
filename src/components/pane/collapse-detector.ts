import { useCallback, useRef, useState } from "react"

export function useCollapseDetection(
  containerRef: React.RefObject<HTMLDivElement | null>,
  isMobile: boolean
) {
  const [collapsedIndices, setCollapsedIndices] = useState<Set<number>>(
    new Set()
  )
  const collapseThresholdRef = useRef(0)

  const updateCollapseThreshold = useCallback(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const firstPane = container.querySelector(
      "[data-pane]"
    ) as HTMLElement | null
    if (!firstPane) {
      return
    }

    const paneWidth = firstPane.offsetWidth
    const rootStyles = getComputedStyle(document.documentElement)
    const rootFontSize = Number.parseFloat(rootStyles.fontSize) || 16
    const spineWidthRem =
      Number.parseFloat(rootStyles.getPropertyValue("--pane-spine-width")) ||
      2.5
    const spineWidth = spineWidthRem * rootFontSize

    collapseThresholdRef.current = Math.max(0, paneWidth - spineWidth)
  }, [containerRef])

  const updateCollapsedIndices = useCallback(() => {
    if (!containerRef.current) {
      return
    }

    if (isMobile) {
      setCollapsedIndices(new Set())
      return
    }

    const scrollLeft = containerRef.current.scrollLeft
    const collapseThreshold = collapseThresholdRef.current
    const newCollapsed = new Set<number>()

    if (collapseThreshold > 0) {
      let index = 0
      while ((index + 1) * collapseThreshold <= scrollLeft) {
        newCollapsed.add(index)
        index++
      }
    }

    setCollapsedIndices((prev) => {
      if (prev.size !== newCollapsed.size) {
        return newCollapsed
      }
      for (const i of newCollapsed) {
        if (!prev.has(i)) {
          return newCollapsed
        }
      }
      return prev
    })
  }, [containerRef, isMobile])

  return {
    collapsedIndices,
    updateCollapseThreshold,
    updateCollapsedIndices,
  }
}
