"use client"

import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { AnimatePresence, motion, type Transition } from "motion/react"
import { useTranslations } from "next-intl"
import type { ReactNode } from "react"
import { closeButtonVariants, paneContentVariants } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface PaneContentWrapperProps {
  children: ReactNode
  isCollapsed: boolean
  isClosable: boolean
  title: string
  transition: Transition
  quickTransition: Transition
  onExpand?: () => void
  onClose?: () => void
}

export function PaneContentWrapper({
  children,
  isCollapsed,
  isClosable,
  title,
  transition,
  quickTransition,
  onExpand,
  onClose,
}: PaneContentWrapperProps) {
  const t = useTranslations("notePane")

  return (
    <motion.div
      animate={isCollapsed ? "collapsed" : "expanded"}
      className="absolute top-0 bottom-0 left-0 h-full w-full"
      transition={transition}
      variants={paneContentVariants}
    >
      {isCollapsed && (
        <button
          aria-label={t("expandNote", { title })}
          className="absolute inset-0 z-overlay cursor-pointer"
          onClick={onExpand}
          type="button"
        >
          <span className="sr-only">{t("expand")}</span>
        </button>
      )}
      {isCollapsed && (
        <div className="absolute top-0 bottom-0 left-0 z-sticky w-px bg-border" />
      )}

      {children}

      <AnimatePresence>
        {!isCollapsed && isClosable && (
          <motion.button
            animate="animate"
            aria-label={t("closeNote", { title })}
            className={cn(
              "absolute top-4 right-4 z-overlay",
              "flex size-8 items-center justify-center rounded-full",
              "bg-transparent text-muted-foreground transition-colors hover:bg-muted",
              "cursor-pointer"
            )}
            exit="exit"
            initial="initial"
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            transition={quickTransition}
            type="button"
            variants={closeButtonVariants}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
