"use client"

import { useEffect, useRef } from "react"
import { usePaneCollapse } from "./pane-collapse-context"

export function usePaneRegistration(index: number) {
  const { registerPaneRef } = usePaneCollapse()
  const paneRef = useRef<HTMLElement>(null)

  useEffect(() => {
    registerPaneRef(index, paneRef.current)
    return () => registerPaneRef(index, null)
  }, [index, registerPaneRef])

  return paneRef
}
