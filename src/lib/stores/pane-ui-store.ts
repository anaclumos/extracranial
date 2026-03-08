"use client"

import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

interface PaneUIState {
  keyboardFocusIndex: number
  setKeyboardFocusIndex: (index: number) => void

  collapsedIndices: Set<number>
  setCollapsedIndices: (indices: Set<number>) => void
  updateCollapsedIndices: (updater: (prev: Set<number>) => Set<number>) => void

  paneRefs: Map<number, HTMLElement>
  registerPaneRef: (index: number, element: HTMLElement | null) => void

  scrollToPane: (index: number) => void
  setScrollToPaneHandler: (handler: (index: number) => void) => void
}

let scrollToPaneHandler: ((index: number) => void) | null = null

export const usePaneUIStore = create<PaneUIState>()(
  subscribeWithSelector((set, get) => ({
    keyboardFocusIndex: 0,
    setKeyboardFocusIndex: (index) => set({ keyboardFocusIndex: index }),

    collapsedIndices: new Set<number>(),
    setCollapsedIndices: (indices) => set({ collapsedIndices: indices }),
    updateCollapsedIndices: (updater) =>
      set((state) => ({ collapsedIndices: updater(state.collapsedIndices) })),

    paneRefs: new Map<number, HTMLElement>(),
    registerPaneRef: (index, element) => {
      const paneRefs = new Map(get().paneRefs)
      if (element) {
        paneRefs.set(index, element)
      } else {
        paneRefs.delete(index)
      }
      set({ paneRefs })
    },

    scrollToPane: (index) => {
      scrollToPaneHandler?.(index)
    },
    setScrollToPaneHandler: (handler) => {
      scrollToPaneHandler = handler
    },
  }))
)

export const useKeyboardFocusIndex = () =>
  usePaneUIStore((state) => state.keyboardFocusIndex)

export const useSetKeyboardFocusIndex = () =>
  usePaneUIStore((state) => state.setKeyboardFocusIndex)

export const useCollapsedIndices = () =>
  usePaneUIStore((state) => state.collapsedIndices)

export const useIsCollapsed = (index: number) =>
  usePaneUIStore((state) => state.collapsedIndices.has(index))

export const useRegisterPaneRef = () =>
  usePaneUIStore((state) => state.registerPaneRef)

export const useScrollToPane = () =>
  usePaneUIStore((state) => state.scrollToPane)
