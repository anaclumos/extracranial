"use client"

import { type MotionValue, motion } from "motion/react"
import { memo, useCallback } from "react"
import { reducedMotionTransition, springSubtle } from "@/lib/animations"
import type { NotePaneData } from "@/lib/types"
import { cn } from "@/lib/utils"
import { PaneContent } from "./pane-content"
import { usePaneTransforms } from "./pane-transforms"

interface CoverflowPaneProps {
  pane: NotePaneData
  index: number
  onLinkClick: (slug: string, index: number) => void
  onClose: (index: number) => void
  isClosable: boolean
  progress: MotionValue<number>
  prefersReducedMotion: boolean
  closeLabel: string
}

const paneVariants = {
  initial: { opacity: 0, scale: 0.92, x: 40 },
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.92, x: -40 },
}

export const CoverflowPane = memo(
  function CoverflowPane({
    pane,
    index,
    onLinkClick,
    onClose,
    isClosable,
    progress,
    prefersReducedMotion,
    closeLabel,
  }: CoverflowPaneProps) {
    const { coverflowX, rotateY, coverflowScale, coverflowOpacity, zIndex } =
      usePaneTransforms(index, progress, prefersReducedMotion)

    const transition = prefersReducedMotion
      ? reducedMotionTransition
      : springSubtle

    const handleLinkClick = useCallback(
      (slug: string) => {
        onLinkClick(slug, index)
      },
      [onLinkClick, index]
    )

    const handleClose = useCallback(() => {
      onClose(index)
    }, [onClose, index])

    return (
      <motion.li
        animate="animate"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        exit="exit"
        initial={prefersReducedMotion ? false : "initial"}
        style={{ zIndex }}
        transition={transition}
        variants={paneVariants}
      >
        <motion.article
          className={cn(
            "h-full w-[92dvw]",
            "overflow-hidden rounded-2xl border border-border bg-background",
            "pointer-events-auto shadow-lg"
          )}
          style={{
            x: coverflowX,
            rotateY,
            scale: coverflowScale,
            opacity: coverflowOpacity,
            transformStyle: "preserve-3d",
            transformPerspective: 1000,
            willChange: "transform, opacity",
          }}
        >
          <PaneContent
            closeLabel={closeLabel}
            isClosable={isClosable}
            onClose={handleClose}
            onLinkClick={handleLinkClick}
            pane={pane}
          />
        </motion.article>
      </motion.li>
    )
  },
  (prev, next) =>
    prev.pane.slug === next.pane.slug &&
    prev.index === next.index &&
    prev.isClosable === next.isClosable &&
    prev.prefersReducedMotion === next.prefersReducedMotion &&
    prev.closeLabel === next.closeLabel
)
