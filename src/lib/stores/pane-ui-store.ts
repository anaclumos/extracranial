"use client"

import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

interface PaneUIState {
  keyboardFocusIndex: number
  setKeyboardFocusIndex: (index: number) => void

  scrollToPane: (index: number) => void
  setScrollToPaneHandler: (handler: (index: number) => void) => void
}

let scrollToPaneHandler: ((index: number) => void) | null = null

export const usePaneUIStore = create<PaneUIState>()(
  subscribeWithSelector((set) => ({
    keyboardFocusIndex: 0,
    setKeyboardFocusIndex: (index) => set({ keyboardFocusIndex: index }),

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

export const useScrollToPane = () =>
  usePaneUIStore((state) => state.scrollToPane)
