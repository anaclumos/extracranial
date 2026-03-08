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
        {children}
      </body>
    </html>
  )
}
