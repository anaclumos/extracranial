"use client"

import type { MotionValue } from "motion/react"
import { useTransform } from "motion/react"
import { calculatePaneTransform } from "./transform-calculator"

export function usePaneTransforms(
  index: number,
  progress: MotionValue<number>,
  prefersReducedMotion: boolean
) {
  const coverflowX = useTransform(progress, (p) => {
    const transform = calculatePaneTransform(index, p, prefersReducedMotion)
    return transform.x
  })

  const rotateY = useTransform(progress, (p) => {
    const transform = calculatePaneTransform(index, p, prefersReducedMotion)
    return transform.rotateY
  })

  const coverflowScale = useTransform(progress, (p) => {
    const transform = calculatePaneTransform(index, p, prefersReducedMotion)
    return transform.scale
  })

  const coverflowOpacity = useTransform(progress, (p) => {
    const transform = calculatePaneTransform(index, p, prefersReducedMotion)
    return transform.opacity
  })

  const zIndex = useTransform(progress, (p) => {
    const transform = calculatePaneTransform(index, p, prefersReducedMotion)
    return transform.zIndex
  })

  return {
    coverflowX,
    rotateY,
    coverflowScale,
    coverflowOpacity,
    zIndex,
  }
}
