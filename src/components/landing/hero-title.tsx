"use client"

import { motion, useReducedMotion } from "motion/react"
import Image from "next/image"
import { useTranslations } from "next-intl"

import { reducedMotionTransition, springSubtle } from "@/lib/animations"

export function HeroTitle() {
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations("landing.hero")

  return (
    <>
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -12, 0] }}
        className="pointer-events-none select-none"
        transition={
          prefersReducedMotion
            ? reducedMotionTransition
            : {
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }
        }
      >
        <Image
          alt=""
          className="h-[198px] w-[272px] object-contain"
          draggable={false}
          height={248 * 3}
          quality={100}
          src="/images/hero/hero-book.png"
          width={340 * 3}
        />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        transition={springSubtle}
      >
        <h1 className="font-normal text-4xl text-foreground leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-6xl dark:bg-gradient-to-br dark:from-white dark:via-white dark:to-neutral-400 dark:bg-clip-text dark:text-transparent">
          {t("title")
            .split("\n")
            .map((line, index) => (
              <span key={`title-${line.slice(0, 20)}`}>
                {line}
                {index === 0 && <br />}
              </span>
            ))}
        </h1>
        <p className="text-base text-foreground/80 leading-[1.3] sm:text-lg">
          <span className="inline-block">{t("subtitle")}</span>
          <br />
          <span className="inline-block">{t("description")}</span>
        </p>
      </motion.div>
    </>
  )
}
