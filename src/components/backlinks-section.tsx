"use client"

import { ArrowUpLeft01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useTranslations } from "next-intl"
import { memo, useCallback, useMemo } from "react"
import type { BacklinkInfo } from "@/lib/types"
import { cn } from "@/lib/utils"

interface BacklinksSectionProps {
  backlinks: BacklinkInfo[]
  onBacklinkClick: (slug: string) => void
}

const ExcerptWithBold = memo(function ExcerptWithBold({
  text,
}: {
  text: string
}) {
  const parts = useMemo(() => text.split(/(\*\*[^*]+\*\*)/g), [text])
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong
            className="font-medium text-foreground"
            key={`bold-${i}-${part.slice(2, 12)}`}
          >
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={`text-${i}-${part.slice(0, 10)}`}>{part}</span>
        )
      )}
    </>
  )
})

const BacklinkItem = memo(function BacklinkItem({
  backlink,
  onClick,
  isFirst,
}: {
  backlink: BacklinkInfo
  onClick: (slug: string) => void
  isFirst: boolean
}) {
  const handleClick = useCallback(() => {
    onClick(backlink.slug)
  }, [onClick, backlink.slug])

  return (
    <li className={cn(!isFirst && "border-border/50 border-t")}>
      <button
        className={cn(
          "-mx-1 w-full rounded-md px-1 py-2.5 text-left",
          "transition-colors hover:bg-muted/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
        onClick={handleClick}
        type="button"
      >
        <span className="block font-medium text-foreground text-sm">
          {backlink.title}
        </span>
        {backlink.excerpt && (
          <span className="mt-0.5 line-clamp-2 block text-muted-foreground text-xs">
            <ExcerptWithBold text={backlink.excerpt} />
          </span>
        )}
      </button>
    </li>
  )
})

export const BacklinksSection = memo(function BacklinksSection({
  backlinks,
  onBacklinkClick,
}: BacklinksSectionProps) {
  const t = useTranslations("backlinks")

  if (backlinks.length === 0) {
    return null
  }

  const translationKey = backlinks.length === 1 ? "singular" : "plural"

  return (
    <section>
      <h3 className="mb-3 flex items-center gap-1.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">
        <HugeiconsIcon icon={ArrowUpLeft01Icon} size={12} strokeWidth={1.5} />
        {t(translationKey, { count: backlinks.length })}
      </h3>
      <ul className="flex flex-col">
        {backlinks.map((backlink, index) => (
          <BacklinkItem
            backlink={backlink}
            isFirst={index === 0}
            key={backlink.slug}
            onClick={onBacklinkClick}
          />
        ))}
      </ul>
    </section>
  )
})
