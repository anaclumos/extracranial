"use client"

import { createContext, useContext } from "react"

interface PaneCollapseContextValue {
  collapsedIndices: Set<number>
  registerPaneRef: (index: number, element: HTMLElement | null) => void
  scrollToPane: (index: number) => void
}

const PaneCollapseContext = createContext<PaneCollapseContextValue>({
  collapsedIndices: new Set(),
  registerPaneRef: () => null,
  scrollToPane: () => null,
})

export function usePaneCollapse() {
  return useContext(PaneCollapseContext)
}

export { PaneCollapseContext }
