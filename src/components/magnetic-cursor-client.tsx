"use client"

import dynamic from "next/dynamic"

const MagneticCursorLazy = dynamic(
  () => import("./magnetic-cursor-lazy").then((mod) => mod.MagneticCursorLazy),
  { ssr: false }
)

export function MagneticCursorClient() {
  return <MagneticCursorLazy />
}
