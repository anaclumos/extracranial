"use client"

import dynamic from "next/dynamic"
import type { NotePaneData } from "@/lib/types"

const MobilePaneCarousel = dynamic(
  () => import("../mobile-pane-carousel").then((mod) => mod.MobilePaneCarousel),
  { ssr: false }
)

interface MobileContainerProps {
  focusIndex: number
  mobileData: {
    panes: NotePaneData[]
    onLinkClick: (slug: string, fromIndex: number) => void
    onClose: (index: number) => void
  }
}

export function MobileContainer({
  focusIndex,
  mobileData,
}: MobileContainerProps) {
  return (
    <MobilePaneCarousel
      focusIndex={focusIndex}
      onClose={mobileData.onClose}
      onLinkClick={mobileData.onLinkClick}
      panes={mobileData.panes}
    />
  )
}
