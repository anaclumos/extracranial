import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface RootLayoutWrapperProps {
  locale: string
  direction: "ltr" | "rtl"
  children: ReactNode
}

export function RootLayoutWrapper({
  locale,
  direction,
  children,
}: RootLayoutWrapperProps) {
  return (
    <html
      className="h-full"
      dir={direction}
      lang={locale}
      suppressHydrationWarning
    >
      <body className={cn("flex h-full flex-col font-sans antialiased")}>
        {children}
      </body>
    </html>
  )
}
