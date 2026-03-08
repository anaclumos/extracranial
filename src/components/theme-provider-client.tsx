"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ReactNode } from "react"

interface ThemeProviderClientProps {
  children: ReactNode
  storageKey?: string
}

export function ThemeProviderClient({
  children,
  storageKey = "coscientist-theme",
}: ThemeProviderClientProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
      storageKey={storageKey}
    >
      {children}
    </NextThemesProvider>
  )
}
