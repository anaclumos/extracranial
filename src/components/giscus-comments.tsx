"use client"

import React, { useEffect, useState } from 'react'
import Giscus from '@giscus/react'
import { useParams } from 'next/navigation'

const GiscusComments = () => {
  const { lang } = useParams<{ lang: string }>() || { lang: 'en' }

  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    if (typeof document === 'undefined') return

    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme')
          setTheme(newTheme === 'dark' ? 'dark' : 'light')
        }
      })
    })

    themeObserver.observe(document.documentElement, {
      attributes: true,
    })

    return () => themeObserver.disconnect()
  }, [])

  return (
    <div>
      <Giscus
        id="comments"
        repo="anaclumos/extracranial-comments"
        repoId="R_kgDOHh2XAw"
        category="General"
        categoryId="DIC_kwDOHh2XA84CPxJo"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        strict="0"
        loading="lazy"
        lang={lang}
        theme={theme}
      />
    </div>
  )
}

export default GiscusComments

