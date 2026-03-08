"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"

import { itemVariants, useSectionAnimation } from "@/lib/landing-animations"
import { AmbientGradient } from "./ambient-gradient"
import { FeatureCard } from "./feature-card"
import { getFeatures } from "./features-data"
import { Container } from "./primitives/layout"
import { Eyebrow, Subheading } from "./primitives/typography"

export function Features() {
  const t = useTranslations("landing.features")
  const {
    ref,
    isInView,
    transition,
    staggerContainerVariants,
    itemVariantsWithTransition,
  } = useSectionAnimation({ amount: 0.2 })

  const features = getFeatures(t)

  return (
    <section
      className="relative overflow-hidden py-16"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <AmbientGradient color="white" position="top-right" />

      <Container className="flex flex-col gap-10 sm:gap-16">
        <div className="flex max-w-2xl flex-col gap-2">
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
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          transition={transition}
          variants={staggerContainerVariants}
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              {...feature}
              variants={itemVariantsWithTransition}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
