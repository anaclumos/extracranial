"use client"

import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { reducedMotionTransition, springSubtle } from "@/lib/animations"

export function HeroCTA() {
  const t = useTranslations("landing.hero")
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4"
      id="waitlist"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      transition={
        prefersReducedMotion
          ? reducedMotionTransition
          : { ...springSubtle, delay: 0.1 }
      }
    >
      <Button render={<Link href="/library" />} size="lg">
        {t("readManifesto")}{" "}
        <HugeiconsIcon
          className="ml-1"
          icon={ArrowRight01Icon}
          size={16}
          strokeWidth={1.5}
        />
      </Button>
    </motion.div>
  )
}
