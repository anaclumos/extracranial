import { useState, useEffect } from 'react'
import Giscus from '@giscus/react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './giscus.module.css'

function getInitialTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') {
    return 'dark'
  }
  // Check document theme first, then system preference
  const docTheme = document.documentElement.getAttribute('data-theme')
  if (docTheme) {
    return docTheme === 'dark' ? 'dark' : 'light'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function GiscusComments() {
  const { i18n } = useDocusaurusContext()
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme)

  useEffect(() => {
    // Sync with current document theme on mount
    const currentTheme = document.documentElement.getAttribute('data-theme')
    if (currentTheme) {
      setTheme(currentTheme === 'dark' ? 'dark' : 'light')
    }

    const themeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme')
          setTheme(newTheme === 'dark' ? 'dark' : 'light')
        }
      }
    })

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => themeObserver.disconnect()
  }, [])

  return (
    <div className={styles.giscus}>
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
        lang={i18n.currentLocale}
        theme={theme}
      />
    </div>
  )
}
