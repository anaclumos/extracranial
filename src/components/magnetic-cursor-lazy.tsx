import { lazy, Suspense, useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const MagneticCursor = lazy(() =>
  import("./magnetic-cursor").then((mod) => ({ default: mod.MagneticCursor }))
);

export function MagneticCursorLazy() {
  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(!prefersReducedMotion && isFinePointer);
  }, [prefersReducedMotion, isFinePointer]);

  if (!isEnabled) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <MagneticCursor />
    </Suspense>
  );
}
