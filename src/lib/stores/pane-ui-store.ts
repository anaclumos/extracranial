"use client";

import { create } from "zustand";

interface PaneUIState {
  scrollToPane: (index: number) => void;
  setScrollToPaneHandler: (handler: (index: number) => void) => void;
}

let scrollToPaneHandler: ((index: number) => void) | null = null;

export const usePaneUIStore = create<PaneUIState>()(() => ({
  scrollToPane: (index) => {
    scrollToPaneHandler?.(index);
  },
  setScrollToPaneHandler: (handler) => {
    scrollToPaneHandler = handler;
  },
}));
