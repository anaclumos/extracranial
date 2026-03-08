import type { Transition, Variants } from "motion/react"
import { useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"

import { reducedMotionTransition, springSubtle } from "./animations"

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const horizontalItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export function getItemVariants(
  prefersReducedMotion: boolean | null
): Variants {
  const transition: Transition = prefersReducedMotion
    ? reducedMotionTransition
    : springSubtle
  return {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition },
  }
}

export function getHorizontalItemVariants(
  prefersReducedMotion: boolean | null
): Variants {
  const transition: Transition = prefersReducedMotion
    ? reducedMotionTransition
    : springSubtle
  return {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition },
  }
}

/**
 * Returns stagger container variants that respect reduced motion preference.
 * When reduced motion is enabled, staggerChildren is set to 0 for instant rendering.
 */
export function getStaggerContainer(
  prefersReducedMotion: boolean | null
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  }
}

/**
 * @deprecated Use getStaggerContainer(prefersReducedMotion) instead for reduced motion support
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function useSectionAnimation(options?: { amount?: number }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: options?.amount ?? 0.2 })
  const prefersReducedMotion = useReducedMotion()

  const transition: Transition = prefersReducedMotion
    ? reducedMotionTransition
    : springSubtle

  const staggerContainerVariants = getStaggerContainer(prefersReducedMotion)
  const itemVariantsWithTransition = getItemVariants(prefersReducedMotion)
  const horizontalItemVariantsWithTransition =
    getHorizontalItemVariants(prefersReducedMotion)

  return {
    ref,
    isInView,
    transition,
    prefersReducedMotion,
    staggerContainerVariants,
    itemVariantsWithTransition,
    horizontalItemVariantsWithTransition,
  }
}
