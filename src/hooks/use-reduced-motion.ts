import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mql.addEventListener("change", onChange);
    setPrefersReducedMotion(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return prefersReducedMotion;
}
