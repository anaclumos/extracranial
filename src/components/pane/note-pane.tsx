"use client"

import { memo, useCallback } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import {
  reducedMotionTransition,
  springQuick,
  springSubtle,
} from "@/lib/animations"
import type { BacklinkInfo, NotePaneData } from "@/lib/types"
import { PaneBackground } from "./pane-background"
import { PaneBody } from "./pane-body"
import { usePaneCollapse } from "./pane-collapse-context"
import { PaneCollapsedSpine } from "./pane-collapsed-spine"
import { PaneContentWrapper } from "./pane-content-wrapper"
import { PaneWrapper } from "./pane-wrapper"
import { usePaneRegistration } from "./use-pane-registration"

interface NotePaneProps {
  slug: string
  title: string
  description?: string
  serializedContent: NotePaneData["serializedContent"]
  index: number
  isClosable?: boolean
  backlinks: BacklinkInfo[]
  editUrl?: string
  onLinkClick: (slug: string, fromIndex: number) => void
  onExpand: (index: number) => void
  onClose: (index: number) => void
}

export const NotePane = memo(function NotePane({
  slug,
  title,
  description,
  serializedContent,
  index,
  isClosable = false,
  backlinks,
  editUrl,
  onLinkClick,
  onExpand,
  onClose,
}: NotePaneProps) {
  const { collapsedIndices } = usePaneCollapse()
  const isCollapsed = collapsedIndices.has(index)
  const prefersReducedMotion = useReducedMotion()
  const paneRef = usePaneRegistration(index)

  const handleLinkClick = useCallback(
    (linkSlug: string) => {
      onLinkClick(linkSlug, index)
    },
    [onLinkClick, index]
  )

  const handleExpand = useCallback(() => {
    onExpand(index)
  }, [onExpand, index])

  const handleClose = useCallback(() => {
    onClose(index)
  }, [onClose, index])

  const transition = prefersReducedMotion
    ? reducedMotionTransition
    : springSubtle
  const quickTransition = prefersReducedMotion
    ? reducedMotionTransition
    : springQuick

  return (
    <PaneWrapper
      index={index}
      paneRef={paneRef}
      prefersReducedMotion={prefersReducedMotion}
      title={title}
      transition={transition}
    >
      <PaneBackground />

      <PaneCollapsedSpine
        description={description}
        index={index}
        isCollapsed={isCollapsed}
        quickTransition={quickTransition}
        title={title}
      />

      <PaneContentWrapper
        isClosable={isClosable}
        isCollapsed={isCollapsed}
        onClose={handleClose}
        onExpand={handleExpand}
        quickTransition={quickTransition}
        title={title}
        transition={transition}
      >
        <PaneBody
          backlinks={backlinks}
          description={description}
          editUrl={editUrl}
          onLinkClick={handleLinkClick}
          serializedContent={serializedContent}
          slug={slug}
          title={title}
        />
      </PaneContentWrapper>
    </PaneWrapper>
  )
})
