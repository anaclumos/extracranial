import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Giscus from '@giscus/react'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

function getInitialTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') {
    return 'dark'
  }
  const docTheme = document.documentElement.getAttribute('data-theme')
  if (docTheme) {
    return docTheme === 'dark' ? 'dark' : 'light'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export default function GiscusComments() {
  const { i18n } = useDocusaurusContext()
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme)

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    if (currentTheme) {
      setTheme(currentTheme === 'dark' ? 'dark' : 'light')
    }

    const themeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
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
        category="General"
        categoryId="DIC_kwDOHh2XA84CPxJo"
        emitMetadata="0"
        id="comments"
        inputPosition="top"
        lang={i18n.currentLocale}
        loading="lazy"
        mapping="pathname"
        reactionsEnabled="1"
        repo="anaclumos/extracranial-comments"
        repoId="R_kgDOHh2XAw"
        strict="0"
        theme={theme}
      />
    </div>
  )
}
