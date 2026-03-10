import { EscapeInAppBrowser } from "eiab/react"
import "katex/dist/katex.min.css"
import "streamdown/styles.css"
import type { Viewport } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import { Suspense } from "react"
import "@/app/globals.css"
import { AppHeader } from "@/components/layout/app-header"
import { MagneticCursorLazy } from "@/components/magnetic-cursor-lazy"
import { Providers } from "@/components/providers"
import { cn } from "@/lib/utils"
import { getDirection, type Locale, routing } from "@/i18n/routing"

export { generateMetadata } from "./layout-metadata"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const direction = getDirection(locale as Locale)
  const [messages, tHeader, tLanguage, tTheme, tNavigation] = await Promise.all([
    getMessages(),
    getTranslations("header"),
    getTranslations("languageSwitcher"),
    getTranslations("theme"),
    getTranslations("navigation"),
  ])

  return (
    <html
      className="h-full"
      dir={direction}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <link
          crossOrigin=""
          href="https://cdn.jsdelivr.net"
          rel="preconnect"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/anaclumos/sunghyun-sans@v1.0.0/dist/web/css/sunghyun-sans-kr-dynamic-subset.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={cn("flex h-full flex-col font-sans antialiased")}>
        <Suspense>
          <Providers locale={locale} messages={messages}>
            <EscapeInAppBrowser />
            <MagneticCursorLazy />
            <AppHeader
              brand={tHeader("brand")}
              brandWithManifesto={tHeader("brandWithLibrary")}
              githubLabel={tHeader("github")}
              languageLabel={tLanguage("label")}
              moreLabel={tNavigation("more")}
              selectLanguageLabel={tLanguage("selectLanguage")}
              selectThemeLabel={tTheme("toggle")}
              themeLabels={{
                dark: tTheme("dark"),
                light: tTheme("light"),
                system: tTheme("system"),
              }}
              themeToggleLabel={tTheme("toggle")}
            />
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
