"use client"

import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { motion } from "motion/react"
import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { itemVariants, useSectionAnimation } from "@/lib/landing-animations"
import { AmbientGradient } from "./ambient-gradient"
import { Container } from "./primitives/layout"
import { Subheading } from "./primitives/typography"

export function CTA() {
  const t = useTranslations("landing.cta")
  const { ref, isInView, transition } = useSectionAnimation({ amount: 0.2 })

  return (
    <section
      className="relative overflow-hidden py-16"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <AmbientGradient color="blue" position="center" />

      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <motion.div
            animate={isInView ? "visible" : "hidden"}
            className="flex max-w-4xl flex-col gap-2"
            initial="hidden"
            transition={transition}
            variants={itemVariants}
          >
            <Subheading>
              {t("heading")
                .split("\n")
                .map((line, index, arr) => (
                  <span key={`heading-${line.slice(0, 20)}`}>
                    {line}
                    {index < arr.length - 1 && <br />}
                  </span>
                ))}
            </Subheading>
          </motion.div>
        </div>
        <motion.div
          animate={isInView ? "visible" : "hidden"}
          initial="hidden"
          transition={{ ...transition, delay: 0.1 }}
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            <Button render={<Link href="/library" />} size="lg">
              {t("readManifesto")}{" "}
              <HugeiconsIcon
                className="ml-1"
                icon={ArrowRight01Icon}
                size={16}
                strokeWidth={1.5}
              />
            </Button>
            <Button
              render={
                // biome-ignore lint/a11y/useAnchorContent: Content provided by Button children
                <a
                  aria-label={t("github")}
                  href="https://github.com/anaclumos/extracranial"
                  rel="noopener noreferrer"
                  target="_blank"
                />
              }
              size="lg"
              variant="outline"
            >
              {t("github")}{" "}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
