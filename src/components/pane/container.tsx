"use client"

import type { ReactNode } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import type { NotePaneData } from "@/lib/types"
import { useMobileData } from "../client/mobile-orchestrator"
import { useNoteStackContext } from "../client/note-stack-provider"
import { DesktopContainer } from "./desktop-container"
import { MobileContainer } from "./mobile-container"

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
    return <MobileContainer focusIndex={focusIndex} mobileData={mobileData} />
  }

  return (
    <DesktopContainer focusIndex={focusIndex} scrollToPaneRef={scrollToPaneRef}>
      {children}
    </DesktopContainer>
  )
}
