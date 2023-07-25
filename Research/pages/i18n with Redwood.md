---
lang: 'en'
slug: '/F980C8'
---

This is an opinionated guide of implementing [[Internationalization]] with [[Redwood.js]]

## Initial Setup

```
yarn rw setup i18n
```

## `i18n.js`

Extract the allowed list for i18n.

```ts
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import fr from './locales/fr.json'
import ko from './locales/ko.json'

const languages = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  ko: {
    translation: ko,
  },
}

i18n
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false }, // React already does escaping
    fallbackLng: 'en',
    resources: languages,
  })

export const allowedLanguagesList = Object.keys(languages) // 🤟 Here!

export default i18n
```

## Routing and Navigating

Each path **must** start with the `lang` parameter as follows.

```tsx
<Route path="/{lang:String}" page={HomePage} name="home" />
```

Navigating **must** have `lang`.

```tsx
<Link to={routes.home({ lang: 'en' })}>English</Link>
```

Every page **must** have the following `lang` property

```tsx
import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { Redirect, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ArticlesCell from 'src/components/ArticlesCell'
import { allowedLanguagesList } from 'src/i18n'

const HomePage = ({ lang }) => {
  const { i18n } = useTranslation()
  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang, i18n])

  // 1. website.com/en/about is allowed

  // 2. !lang -> The `lang` property is missing.
  // i.e., website.com/about

  // 3. !allowedLanguagesList.includes(lang) -> the `lang` property is not in our defined list.
  // i.e., website.com/zz/about
  if (!lang || !allowedLanguagesList.includes(lang)) {
    if (allowedLanguagesList.includes(navigator.language)) {
      // 💬 Try to use the navigator.language
      return <Redirect to={routes.home({ lang: navigator.language })} />
    } else {
      // 🇺🇸 English as the default fallback
      return <Redirect to={routes.home({ lang: 'en' })} />
    }
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <ArticlesCell />
    </>
  )
}

export default HomePage
```

## Headers

This will gently redirect if the lang property does not exist.

Below is [[hreflang]] to others, using allowedLanguageList

```tsx
<Head lang={/* Current Language*/}></Head>
```

## Sitemap.xml

... Should be generated accordingly

## Consideration

Can we redirect by inserting the current navigator language?

For example, if we land on `website.com/about`,

- redirect to `website.com/en/about` for English users
- redirect to `website.com/ko/about` for Korean users
- That is, maintaining user location and path context.
- One way is to use `window.location.pathname`

## Reference

- [Implementing Internationalization with Redwood.js - Get Help and Help Others - RedwoodJS Community](https://community.redwoodjs.com/t/implementing-internationalization-with-redwood-js/5004?u=anaclumos)
