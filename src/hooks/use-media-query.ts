"use client";

import { useSyncExternalStore } from "react";

interface MediaQueryStore {
  getSnapshot: () => boolean;
  subscribe: (listener: () => void) => () => void;
}

const mediaQueryStores = new Map<string, MediaQueryStore>();

function createMediaQueryStore(query: string): MediaQueryStore {
  let mediaQueryList: MediaQueryList | null = null;
  let disposeListener: (() => void) | null = null;
  const listeners = new Set<() => void>();

  const getMediaQueryList = () => {
    if (typeof window === "undefined") {
      return null;
    }

    mediaQueryList ??= window.matchMedia(query);
    return mediaQueryList;
  };

  const getSnapshot = () => getMediaQueryList()?.matches ?? false;

  const notifyListeners = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  return {
    getSnapshot,
    subscribe: (listener) => {
      listeners.add(listener);

      const currentMediaQueryList = getMediaQueryList();
      if (currentMediaQueryList && !disposeListener) {
        const handleChange = () => {
          notifyListeners();
        };

        currentMediaQueryList.addEventListener("change", handleChange);
        disposeListener = () => {
          currentMediaQueryList.removeEventListener("change", handleChange);
          disposeListener = null;
        };
      }

      return () => {
        listeners.delete(listener);

        if (listeners.size > 0) {
          return;
        }

        disposeListener?.();
        mediaQueryList = null;
        mediaQueryStores.delete(query);
      };
    },
  };
}

function getMediaQueryStore(query: string): MediaQueryStore {
  const cachedStore = mediaQueryStores.get(query);
  if (cachedStore) {
    return cachedStore;
  }

  const store = createMediaQueryStore(query);
  mediaQueryStores.set(query, store);
  return store;
}

export function useMediaQuery(query: string, serverFallback = false): boolean {
  const store = getMediaQueryStore(query);

  return useSyncExternalStore(store.subscribe, store.getSnapshot, () => serverFallback);
}
