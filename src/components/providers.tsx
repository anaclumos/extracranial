"use client"

"use client"

import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import type { ReactNode } from "react"

interface ProvidersProps {
  children: ReactNode
  locale: string
  messages: IntlMessages
  storageKey?: string
}

type IntlMessages = Parameters<typeof NextIntlClientProvider>[0]["messages"]

export function Providers({
  children,
  locale,
  messages,
  storageKey = "coscientist-theme",
}: ProvidersProps) {
  return (
    <NuqsAdapter>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
          storageKey={storageKey}
        >
          {children}
        </NextThemesProvider>
      </NextIntlClientProvider>
    </NuqsAdapter>
  )
}
