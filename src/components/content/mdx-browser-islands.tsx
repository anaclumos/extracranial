"use client";

import { lazy, Suspense, type ReactNode } from "react";

const BrowserOnlyBoundary = lazy(() =>
  import("./mdx-browser-only").then((module) => ({
    default: module.BrowserOnly,
  }))
);

const KoreaNetherlandsGlobeBoundary = lazy(() =>
  import("./mdx-korea-netherlands-globe").then((module) => ({
    default: module.KoreaNetherlandsGlobe,
  }))
);

export function BrowserOnlyIsland({
  children,
}: {
  children: ReactNode | (() => ReactNode);
}) {
  return (
    <Suspense fallback={null}>
      <BrowserOnlyBoundary>{children}</BrowserOnlyBoundary>
    </Suspense>
  );
}

export function KoreaNetherlandsGlobeIsland({
  lang = "en",
}: {
  lang?: "en" | "ko" | string;
}) {
  return (
    <Suspense fallback={null}>
      <KoreaNetherlandsGlobeBoundary lang={lang} />
    </Suspense>
  );
}
