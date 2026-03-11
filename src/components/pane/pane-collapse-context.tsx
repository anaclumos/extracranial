"use client";

import { create } from "zustand";

interface PaneCollapseStore {
  collapsedIndices: Set<number>;
  registerPaneRef: (index: number, element: HTMLElement | null) => void;
  scrollToPane: (index: number) => void;
}

const noopRegisterPaneRef = () => null;
const noopScrollToPane = () => null;

const usePaneCollapseStore = create<PaneCollapseStore>()(() => ({
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
  registerPaneRef: PaneCollapseStore["registerPaneRef"]
) {
  usePaneCollapseStore.setState({ registerPaneRef });
}

export function setPaneScrollTo(
  scrollToPane: PaneCollapseStore["scrollToPane"]
) {
  usePaneCollapseStore.setState({ scrollToPane });
}
