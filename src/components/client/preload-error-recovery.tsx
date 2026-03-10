"use client";

import { useEffect } from "react";

const PRELOAD_ERROR_RELOAD_KEY = "vite-preload-error-reload-once";

function isChunkLoadError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return error.message.includes("Failed to fetch dynamically imported module");
}

export function PreloadErrorRecovery() {
  useEffect(() => {
    const handlePreloadError = (event: Event) => {
      const customEvent = event as Event & {
        payload?: unknown;
        preventDefault: () => void;
      };

      if (!isChunkLoadError(customEvent.payload)) {
        return;
      }

      if (sessionStorage.getItem(PRELOAD_ERROR_RELOAD_KEY) === "1") {
        sessionStorage.removeItem(PRELOAD_ERROR_RELOAD_KEY);
        return;
      }

      customEvent.preventDefault();
      sessionStorage.setItem(PRELOAD_ERROR_RELOAD_KEY, "1");
      window.location.reload();
    };

    window.addEventListener("vite:preloadError", handlePreloadError);

    return () => {
      window.removeEventListener("vite:preloadError", handlePreloadError);
    };
  }, []);

  useEffect(() => {
    sessionStorage.removeItem(PRELOAD_ERROR_RELOAD_KEY);
  }, []);

  return null;
}
