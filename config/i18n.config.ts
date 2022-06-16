import type { I18nConfig } from '@docusaurus/types'

const i18n: I18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'ko'],
  localeConfigs: {
    en: {
      htmlLang: 'en-US',
    },
    ko: {
      htmlLang: 'ko-KR',
    },
  },
}

export = i18n
