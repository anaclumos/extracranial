import BrowserOnly from '@docusaurus/BrowserOnly'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { lazy, Suspense, useEffect, useState } from 'react'
import styles from './styles.module.css'

interface GiscusCommentsProps {
  term?: string
}

const Giscus = lazy(() => import('@giscus/react'))

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

export default function GiscusComments({ term }: GiscusCommentsProps) {
  const { i18n } = useDocusaurusContext()
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme)

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme')
      if (!currentTheme) {
        return
      }
      const nextTheme = currentTheme === 'dark' ? 'dark' : 'light'
      setTheme((prev) => (prev === nextTheme ? prev : nextTheme))
    }

    const themeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          updateTheme()
        }
      }
    })

    updateTheme()
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => themeObserver.disconnect()
  }, [])

  const fallback = (
    <div aria-live="polite" className={styles.loading} role="status">
      {'Loading comments\u2026'}
    </div>
  )

  return (
    <div className={styles.giscus}>
      <BrowserOnly fallback={fallback}>
        {() => (
          <Suspense fallback={fallback}>
            <Giscus
              category="General"
              categoryId="DIC_kwDOHh2XA84CPxJo"
              emitMetadata="0"
              id="comments"
              inputPosition="top"
              lang={i18n.currentLocale}
              loading="lazy"
              mapping={term ? 'specific' : 'pathname'}
              reactionsEnabled="1"
              repo="anaclumos/extracranial-comments"
              repoId="R_kgDOHh2XAw"
              strict="0"
              term={term}
              theme={theme}
            />
          </Suspense>
        )}
      </BrowserOnly>
    </div>
  )
}
