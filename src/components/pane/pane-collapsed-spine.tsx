"use client"

import { AnimatePresence, motion, type Transition } from "motion/react"
import { spineVariants } from "@/lib/animations"
import { PaneSpine } from "./pane-spine"

interface PaneCollapsedSpineProps {
  isCollapsed: boolean
  title: string
  description?: string
  index: number
  quickTransition: Transition
}

export function PaneCollapsedSpine({
  isCollapsed,
  title,
  description,
  index,
  quickTransition,
}: PaneCollapsedSpineProps) {
  return (
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
          <PaneSpine
            description={description}
            index={index}
            showIndex
            title={title}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
