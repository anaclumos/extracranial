"use client"

import { AnimatePresence, motion } from "motion/react"
import { useTranslations } from "next-intl"
import { memo, useCallback, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import type { NotePaneData } from "@/lib/types"
import { useCarouselState } from "./carousel-state"
import { CoverflowPane } from "./coverflow-pane"
import { SliderNotch } from "./slider-notch"

interface MobilePaneCarouselProps {
  panes: NotePaneData[]
  onLinkClick: (slug: string, fromIndex: number) => void
  onClose: (index: number) => void
  focusIndex: number
}

export const MobilePaneCarousel = memo(function MobilePaneCarousel({
  panes,
  onLinkClick,
  onClose,
  focusIndex,
}: MobilePaneCarouselProps) {
  const t = useTranslations("mobileCarousel")
  const tPane = useTranslations("notePane")
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    currentIndex,
    animateToIndex,
    handleDragStart,
    handleDrag,
    handleDragEnd,
  } = useCarouselState({
    panes,
    focusIndex,
    prefersReducedMotion,
    containerRef,
  })

  const handleNotchTap = useCallback(
    (index: number) => {
      animateToIndex(index)
    },
    [animateToIndex]
  )

  const handlePaneClose = useCallback(
    (index: number) => {
      onClose(index)
    },
    [onClose]
  )

  const handlePaneLinkClick = useCallback(
    (slug: string, index: number) => {
      onLinkClick(slug, index)
    },
    [onLinkClick]
  )

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center overflow-hidden bg-background">
      <div className="flex h-10 w-full items-center justify-center px-4">
        <div className="flex h-10 items-end justify-center">
          {panes.map((pane, index) => (
            <SliderNotch
              activeIndex={currentIndex}
              ariaLabel={t("goToNote", {
                position: index + 1,
                title: pane.title,
              })}
              index={index}
              key={`${pane.slug}-${index}`}
              onTap={handleNotchTap}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="relative flex w-full flex-1 cursor-grab items-center justify-center overflow-hidden active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        ref={containerRef}
        style={{ perspective: 1000 }}
      >
        <ul className="relative h-full w-full">
          <AnimatePresence initial={false} mode="sync">
            {panes.map((pane, index) => (
              <CoverflowPane
                closeLabel={tPane("closeNote", { title: pane.title })}
                index={index}
                isClosable={index > 0}
                key={`${pane.slug}-${index}`}
                onClose={handlePaneClose}
                onLinkClick={handlePaneLinkClick}
                pane={pane}
                prefersReducedMotion={prefersReducedMotion}
                progress={currentIndex}
              />
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>
    </div>
  )
})
