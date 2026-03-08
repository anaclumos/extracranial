"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { AmbientGradient } from "./ambient-gradient"
import { Container } from "./primitives/layout"

export function Footer() {
  const t = useTranslations("landing.footer")
  const locale = useLocale()
  const hqLocale = locale === "ko" ? "ko" : "en"
  const currentYear = new Date().getFullYear()

  const links = [
    { label: t("manifesto"), href: "/library" },
    {
      label: t("hq"),
      href: `https://cho.sh/${hqLocale}`,
      external: true,
    },
    {
      label: t("github"),
      href: "https://github.com/anaclumos/extracranial",
      external: true,
    },
  ]

  return (
    <footer className="relative overflow-hidden pt-16">
      <AmbientGradient color="white" position="bottom-left" />

      <div className="bg-neutral-950/[0.025] py-16 text-neutral-950 dark:bg-white/5 dark:text-white">
        <Container className="flex flex-col gap-16">
          <nav>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <Button
                      className="h-auto p-0 text-muted-foreground"
                      render={
                        // biome-ignore lint/a11y/useAnchorContent: Content provided by Button children
                        <a
                          aria-label={link.label}
                          href={link.href}
                          rel="noopener noreferrer"
                          target="_blank"
                        />
                      }
                      variant="link"
                    >
                      {link.label}
                    </Button>
                  ) : (
                    <Button
                      className="h-auto p-0 text-muted-foreground"
                      render={<Link href={link.href} />}
                      variant="link"
                    >
                      {link.label}
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center justify-between gap-10 text-sm/7">
            <div className="text-muted-foreground">
              {t("copyright", { year: currentYear })}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
