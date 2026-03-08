"use client"

import { animate, type MotionValue, motion, useSpring } from "motion/react"
import { memo, useCallback, useEffect } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface SliderNotchProps {
  index: number
  activeIndex: MotionValue<number>
  onTap: (index: number) => void
  ariaLabel: string
}

const springConfig = { duration: 0.2, bounce: 0 }
const reducedMotionConfig = { duration: 0 }

export const SliderNotch = memo(function SliderNotch({
  index,
  activeIndex,
  onTap,
  ariaLabel,
}: SliderNotchProps) {
  const prefersReducedMotion = useReducedMotion()
  const isActive = Math.round(activeIndex.get()) === index
  const transitionConfig = prefersReducedMotion
    ? reducedMotionConfig
    : springConfig
  const scaleY = useSpring(isActive ? 1 : 0.5, transitionConfig)
  const opacity = useSpring(isActive ? 1 : 0.3, transitionConfig)

  useEffect(() => {
    return activeIndex.on("change", (v) => {
      const active = Math.round(v) === index
      animate(scaleY, active ? 1 : 0.5, transitionConfig)
      animate(opacity, active ? 1 : 0.3, transitionConfig)
    })
  }, [activeIndex, index, scaleY, opacity, transitionConfig])

  const handleClick = useCallback(() => {
    onTap(index)
  }, [onTap, index])

  return (
    <button
      aria-label={ariaLabel}
      className="flex h-10 touch-none items-center justify-center px-1"
      onClick={handleClick}
      type="button"
    >
      <motion.div
        className="h-6 w-1.5 bg-foreground"
        style={{ scaleY, opacity, transformOrigin: "center" }}
      />
    </button>
  )
})
