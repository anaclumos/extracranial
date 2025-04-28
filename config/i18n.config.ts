import type { I18nConfig } from '@docusaurus/types'

const i18n: I18nConfig = {
  path: './i18n',
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

export default i18n
