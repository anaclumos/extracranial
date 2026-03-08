"use client"

import { AnimatePresence, motion, type Transition } from "motion/react"
import type { ReactNode, RefObject } from "react"
import {
  paneContentVariants,
  paneVariants,
  spineVariants,
} from "@/lib/animations"
import { cn } from "@/lib/utils"
import { PaneSpine } from "../pane/pane-spine"
import { PaneBackground } from "./pane-background"

interface PaneWrapperProps {
  index: number
  isCollapsed: boolean
  title: string
  paneRef: RefObject<HTMLElement | null>
  transition: Transition
  quickTransition: Transition
  prefersReducedMotion: boolean
  onExpand?: () => void
  expandLabel: string
  children: ReactNode
}

export function PaneWrapper({
  index,
  isCollapsed,
  title,
  paneRef,
  transition,
  quickTransition,
  prefersReducedMotion,
  onExpand,
  expandLabel,
  children,
}: PaneWrapperProps) {
  return (
    <motion.aside
      animate="animate"
      className={cn(
        "h-full w-full flex-shrink-0 overflow-hidden md:w-1/3 md:min-w-pane-min",
        "relative border-border border-x bg-background",
        "sticky left-0"
      )}
      data-index={index}
      data-pane
      exit="exit"
      initial={prefersReducedMotion ? false : "initial"}
      layout
      ref={paneRef}
      style={{
        left: `calc(${index} * var(--pane-spine-width))`,
        zIndex: `calc(var(--z-pane) + ${index})`,
      }}
      transition={transition}
      variants={paneVariants}
    >
      <PaneBackground />

      <AnimatePresence>
        {isCollapsed && (
          <motion.div
            animate="visible"
            className="absolute inset-0 z-10"
            exit="hidden"
            initial="hidden"
            key="spine"
            transition={quickTransition}
            variants={spineVariants}
          >
            <PaneSpine index={index} showIndex={false} title={title} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={isCollapsed ? "collapsed" : "expanded"}
        className="absolute top-0 bottom-0 left-0 h-full w-full"
        transition={transition}
        variants={paneContentVariants}
      >
        {isCollapsed && (
          <>
            <button
              aria-label={expandLabel}
              className="absolute inset-0 z-overlay cursor-pointer"
              onClick={onExpand}
              type="button"
            >
              <span className="sr-only">{expandLabel}</span>
            </button>
            <div className="absolute top-0 bottom-0 left-0 z-sticky w-px bg-border" />
          </>
        )}

        {children}
      </motion.div>
    </motion.aside>
  )
}
