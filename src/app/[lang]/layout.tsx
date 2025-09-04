import '@/app/global.css'
import { RootProvider } from 'fumadocs-ui/provider'
import type { ReactNode } from 'react'

const locales = [
  {
    locale: 'en',
    name: 'English',
  },
  {
    locale: 'ko',
    name: '한국어',
  },
]

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://static.toss.im" crossOrigin="" />
        <link rel="dns-prefetch" href="https://static.toss.im" />
        <link rel="stylesheet" href="https://static.toss.im/tps/main.css" />
        <link rel="stylesheet" href="https://static.toss.im/tps/others.css" />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          i18n={{
            locale: lang,
            locales,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  )
}

// Force this entire segment subtree to be statically generated
export const dynamic = 'force-static'

// Pre-generate all supported locales for static output
export function generateStaticParams() {
  return locales.map((l) => ({ lang: l.locale }))
}

// Limit to the known set of params at build time
export const dynamicParams = false
