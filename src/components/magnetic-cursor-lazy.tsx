"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const MagneticCursor = dynamic(
  () => import("./magnetic-cursor").then((mod) => mod.MagneticCursor),
  { ssr: false }
)

function useFinePointer() {
  const [isFinePointer, setIsFinePointer] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)")
    const onChange = (event: MediaQueryListEvent) => {
      setIsFinePointer(event.matches)
    }

    setIsFinePointer(mql.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isFinePointer
}

export function MagneticCursorLazy() {
  const prefersReducedMotion = useReducedMotion()
  const isFinePointer = useFinePointer()
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    setIsEnabled(!prefersReducedMotion && isFinePointer)
  }, [prefersReducedMotion, isFinePointer])

  if (!isEnabled) {
    return null
  }

  return <MagneticCursor />
}
