import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Giscus from '@giscus/react'
import { useEffect, useState } from 'react'
import g from './giscus.module.css'

const Index = () => {
  const { i18n } = useDocusaurusContext()

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light')

  useEffect(() => {
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
    })

    return () => themeObserver.disconnect()
  }, [])

  return (
    <div className={g.giscus}>
      <Giscus
        id='comments'
        repo='anaclumos/extracranial-comments'
        repoId='R_kgDOHh2XAw'
        category='General'
        categoryId='DIC_kwDOHh2XA84CPxJo'
        mapping='pathname'
        reactionsEnabled='1'
        emitMetadata='0'
        inputPosition='top'
        strict='0'
        loading='lazy'
        lang={i18n.currentLocale}
        theme={theme}
      />
    </div>
  )
}

export default Index
