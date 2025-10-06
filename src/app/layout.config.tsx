import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { i18n } from '@/lib/i18n'
import { t } from '@/lib/messages'

const alt = (locale: string) => {
  if (locale === 'en') return 'Logo'
  if (locale === 'ko') return '로고'
  return 'Logo'
}

export function baseOptions(locale: string): BaseLayoutProps {
  const withLocale = (path: string) => `/${locale}${path}`
  return {
    i18n,
    links: [
      {
        active: 'nested-url',
        on: 'nav',
        text: t(locale, 'nav.research'),
        type: 'main',
        url: withLocale('/r/000000'),
      },
      {
        active: 'nested-url',
        on: 'nav',
        text: t(locale, 'nav.newsroom'),
        type: 'main',
        url: withLocale('/w'),
      },
    ],
    nav: {
      title: (
        <>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" aria-label={alt(locale)}>
            <title>{alt(locale)}</title>
            <circle cx={12} cy={12} r={12} fill="currentColor" />
          </svg>
          <span>{t(locale, 'nav.title')}</span>
        </>
      ),
      url: withLocale(''),
    },
  }
}
