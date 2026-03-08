"use client"

import { Globe02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useLocale, useTranslations } from "next-intl"
import { useQueryStates } from "nuqs"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from "@/i18n/navigation"
import { type Locale, routing } from "@/i18n/routing"
import {
  focusParser,
  noteStackParsers,
  stackParser,
} from "@/lib/stores/note-stack-parsers"
import { cn } from "@/lib/utils"

export const localeNames: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
}

export function LanguageSwitcher({
  className,
  variant = "icon",
}: {
  className?: string
  variant?: "icon" | "select"
}) {
  const t = useTranslations("languageSwitcher")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [urlState] = useQueryStates(noteStackParsers)

  const handleChange = (value: string | null) => {
    if (value && value !== locale) {
      const params: string[] = []
      const stackStr = stackParser.serialize(urlState.stack)
      if (stackStr) {
        params.push(`stack=${stackStr}`)
      }
      if (urlState.focus !== null) {
        const focusStr = focusParser.serialize(urlState.focus)
        if (focusStr) {
          params.push(`focus=${focusStr}`)
        }
      }
      const fullPath =
        params.length > 0 ? `${pathname}?${params.join("&")}` : pathname
      router.replace(fullPath, { locale: value as Locale })
    }
  }

  return (
    <Select onValueChange={handleChange} value={locale}>
      {variant === "icon" ? (
        <Button
          aria-label={t("selectLanguage")}
          className={cn(
            "w-auto min-w-0 [&_[data-slot=select-icon]]:hidden",
            className
          )}
          render={<SelectTrigger />}
          size="icon"
          variant="outline"
        >
          <HugeiconsIcon icon={Globe02Icon} size={18} strokeWidth={1.5} />
        </Button>
      ) : (
        <SelectTrigger
          aria-label={t("selectLanguage")}
          className={cn("w-full justify-between", className)}
        >
          <SelectValue />
        </SelectTrigger>
      )}
      <SelectPopup className="max-h-[300px]">
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {localeNames[loc]}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  )
}
