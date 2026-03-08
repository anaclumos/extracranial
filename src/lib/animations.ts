/**
 * Animation configurations following Dieter Rams' design principles:
 * - "Good design is as little design as possible"
 * - "Good design is unobtrusive"
 *
 * These animations are functional, not decorative.
 * They communicate state changes and spatial relationships.
 */

import type { Transition, Variants } from "motion/react"

/**
 * Dieter Rams-inspired spring: minimal bounce, quick settle.
 * Duration ~200ms perceptual, nearly critically damped.
 */
export const springSubtle: Transition = {
  type: "spring",
  duration: 0.2,
  bounce: 0.05,
}

/**
 * Even faster spring for micro-interactions.
 * Duration ~150ms, no bounce.
 */
export const springQuick: Transition = {
  type: "spring",
  duration: 0.15,
  bounce: 0,
}

export const reducedMotionTransition: Transition = {
  duration: 0,
}

/**
 * Pane enter/exit animation variants.
 * Animates opacity and translateX (compositor-only properties).
 */
export const paneVariants: Variants = {
  initial: {
    opacity: 0,
    x: 40,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -20,
  },
}

/**
 * Pane content collapse/expand animation variants.
 * Only animates opacity and translateX for performance.
 */
export const paneContentVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
  },
  collapsed: {
    opacity: 0.4,
    x: "var(--pane-spine-width)",
  },
}

/**
 * Spine fade-in animation when pane collapses.
 */
export const spineVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

export const closeButtonVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
}
