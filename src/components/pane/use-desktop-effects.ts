import { type RefObject, useEffect } from "react"

export function useResizeObserver(
  containerRef: RefObject<HTMLDivElement | null>,
  updateCollapseThreshold: () => void,
  updateCollapsedIndices: () => void
) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    updateCollapseThreshold()
    const frameId = requestAnimationFrame(updateCollapsedIndices)

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => {
        updateCollapseThreshold()
        updateCollapsedIndices()
      })
      observer.observe(container)
      const firstPane = container.querySelector("[data-pane]")
      if (firstPane) {
        observer.observe(firstPane)
      }
      return () => {
        cancelAnimationFrame(frameId)
        observer.disconnect()
      }
    }

    const handleResize = () => {
      updateCollapseThreshold()
      updateCollapsedIndices()
    }
    window.addEventListener("resize", handleResize)
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [containerRef, updateCollapseThreshold, updateCollapsedIndices])
}

export function useScrollListener(
  containerRef: RefObject<HTMLDivElement | null>,
  updateCollapsedIndices: () => void
) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    container.addEventListener("scroll", updateCollapsedIndices, {
      passive: true,
    })
    return () => container.removeEventListener("scroll", updateCollapsedIndices)
  }, [containerRef, updateCollapsedIndices])
}
