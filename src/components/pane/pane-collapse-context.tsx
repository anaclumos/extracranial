"use client";

import type { Transition } from "motion/react";
import { useEffect, useRef } from "react";
import { create } from "zustand";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  reducedMotionTransition,
  springQuick,
  springSubtle,
} from "@/lib/animations";

interface PaneViewportControllerStore {
  collapsedIndices: Set<number>;
  registerPaneRef: (index: number, element: HTMLElement | null) => void;
  scrollToPane: (index: number) => void;
}

const noopRegisterPaneRef = () => null;
const noopScrollToPane = () => null;

const usePaneCollapseStore = create<PaneViewportControllerStore>()(() => ({
  collapsedIndices: new Set(),
  registerPaneRef: noopRegisterPaneRef,
  scrollToPane: noopScrollToPane,
}));

export function useIsPaneCollapsed(index: number) {
  return usePaneCollapseStore((state) => state.collapsedIndices.has(index));
}

export function useRegisterPaneRef() {
  return usePaneCollapseStore((state) => state.registerPaneRef);
}

export function usePaneCollapseScrollTo() {
  return usePaneCollapseStore((state) => state.scrollToPane);
}

export function resetPaneCollapseStore() {
  usePaneCollapseStore.setState({
    collapsedIndices: new Set(),
    registerPaneRef: noopRegisterPaneRef,
    scrollToPane: noopScrollToPane,
  });
}

export function setCollapsedPaneIndices(collapsedIndices: Set<number>) {
  usePaneCollapseStore.setState({ collapsedIndices });
}

export function setPaneRefRegistration(
  registerPaneRef: PaneViewportControllerStore["registerPaneRef"]
) {
  usePaneCollapseStore.setState({ registerPaneRef });
}

export function setPaneScrollTo(
  scrollToPane: PaneViewportControllerStore["scrollToPane"]
) {
  usePaneCollapseStore.setState({ scrollToPane });
}

export function usePaneRef(index: number) {
  const registerPaneRef = useRegisterPaneRef();
  const paneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerPaneRef(index, paneRef.current);
    return () => registerPaneRef(index, null);
  }, [index, registerPaneRef]);

  return paneRef;
}

interface PaneTransitions {
  prefersReducedMotion: boolean;
  quickTransition: Transition;
  transition: Transition;
}

export function usePaneTransitions(): PaneTransitions {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {
      transition: reducedMotionTransition,
      quickTransition: reducedMotionTransition,
      prefersReducedMotion,
    };
  }

  return {
    transition: springSubtle,
    quickTransition: springQuick,
    prefersReducedMotion,
  };
}
