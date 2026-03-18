"use client";

import { type ReactNode, useEffect, useState } from "react";

export function BrowserOnly({ children }: { children: ReactNode | (() => ReactNode) }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{typeof children === "function" ? children() : children}</>;
}
