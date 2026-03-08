"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"

import { itemVariants, useSectionAnimation } from "@/lib/landing-animations"
import { AmbientGradient } from "./ambient-gradient"
import { getPipelineSteps } from "./pipeline-data"
import { PipelineStep } from "./pipeline-step"
import { Container } from "./primitives/layout"
import { Eyebrow, Subheading, Text } from "./primitives/typography"

export function Pipeline() {
  const t = useTranslations("landing.pipeline")
  const {
    ref,
    isInView,
    transition,
    staggerContainerVariants,
    horizontalItemVariantsWithTransition,
  } = useSectionAnimation({ amount: 0.2 })

  const steps = getPipelineSteps(t)

  return (
    <section
      className="relative overflow-hidden py-16"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <AmbientGradient color="blue" position="bottom-left" />

      <Container className="flex flex-col gap-10 sm:gap-16">
        <div className="flex max-w-2xl flex-col gap-6">
          <div className="flex flex-col gap-2">
            <motion.div
              animate={isInView ? "visible" : "hidden"}
              initial="hidden"
              transition={transition}
              variants={itemVariants}
            >
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </motion.div>
            <motion.div
              animate={isInView ? "visible" : "hidden"}
              initial="hidden"
              transition={{ ...transition, delay: 0.1 }}
              variants={itemVariants}
            >
              <Subheading>{t("heading")}</Subheading>
            </motion.div>
          </div>
          <motion.div
            animate={isInView ? "visible" : "hidden"}
            initial="hidden"
            transition={{ ...transition, delay: 0.2 }}
            variants={itemVariants}
          >
            <Text className="text-pretty">{t("description")}</Text>
          </motion.div>
        </div>

        <motion.div
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-0"
          initial="hidden"
          transition={transition}
          variants={staggerContainerVariants}
        >
          {steps.map((step, index) => (
            <PipelineStep
              isLast={index === steps.length - 1}
              key={step}
              step={step}
              variants={horizontalItemVariantsWithTransition}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
