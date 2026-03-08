"use client"

import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { motion } from "motion/react"

export interface PipelineStepProps {
  step: string
  isLast: boolean
  variants: import("motion/react").Variants
}

export function PipelineStep({ step, isLast, variants }: PipelineStepProps) {
  return (
    <motion.div className="flex items-center" variants={variants}>
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-12 w-24 items-center justify-center rounded-lg border border-border bg-muted/50">
          <span className="font-medium font-mono text-foreground text-sm">
            {step}
          </span>
        </div>
      </div>
      {!isLast && (
        <div className="hidden items-center px-2 text-muted-foreground sm:flex">
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} />
        </div>
      )}
    </motion.div>
  )
}
