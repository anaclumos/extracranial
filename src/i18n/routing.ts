import { defineRouting } from "next-intl/routing"

export const locales = [
  "en",
  "ko",
] as const

export type Locale = (typeof locales)[number]

export const rtlLocales: Locale[] = []

// Get text direction for a locale
export function getDirection(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr"
}

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
})
