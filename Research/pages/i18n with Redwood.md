---
lang: 'en'
slug: '/F980C8'
---

This is an opinionated guide of implementing [[Internationalization]] with [[Redwood.js]]

## Initial Setup

```
yarn rw setup i18n
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

const HomePage = ({ lang }) => {
  const { i18n } = useTranslation()
  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang, i18n])

  if (!lang) {
    // Redirects if lang is missing
    // This can also be navigator language
    return <Redirect to={routes.home({ lang: i18n.language })} />
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

This will gently redirect if the lang property does not exist.
