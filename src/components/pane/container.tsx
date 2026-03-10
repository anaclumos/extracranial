"use client"

import dynamic from "next/dynamic"
import type { ReactNode } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import type { NotePaneData } from "@/lib/types"
import { useMobileData } from "../client/mobile-orchestrator"
import { useNoteStackContext } from "../client/note-stack-provider"
import { DesktopContainer } from "./desktop-container"

const MobilePaneCarousel = dynamic(
  () => import("../mobile/pane-carousel").then((mod) => mod.MobilePaneCarousel),
  { ssr: false }
)

interface PaneContainerProps {
  children: ReactNode
  scrollToPaneRef?: React.MutableRefObject<((index: number) => void) | null>
  paneNotes: NotePaneData[]
}

export function PaneContainer({
  children,
  scrollToPaneRef,
  paneNotes,
}: PaneContainerProps) {
  const isMobile = useIsMobile()
  const { focusIndex } = useNoteStackContext()
  const mobileData = useMobileData({ paneNotes })

  if (isMobile) {
    return (
      <MobilePaneCarousel
        focusIndex={focusIndex}
        onClose={mobileData.onClose}
        onLinkClick={mobileData.onLinkClick}
        panes={mobileData.panes}
      />
    )
  }

  return (
    <DesktopContainer focusIndex={focusIndex} scrollToPaneRef={scrollToPaneRef}>
      {children}
    </DesktopContainer>
  )
}
