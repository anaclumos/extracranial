import React, { useState, useEffect } from 'react'
import Giscus from '@giscus/react'
import g from './giscus.module.css'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const Index = () => {
  const { i18n } = useDocusaurusContext()
  const [theme, setTheme] = useState('light') // Default theme

  useEffect(() => {
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme')
          setTheme(newTheme === 'dark' ? 'dark' : 'light')
        }
      })
    })

    // Start observing for theme changes
    themeObserver.observe(document.documentElement, {
      attributes: true, // Listen to attribute changes
    })

    // Clean up observer on component unmount
    return () => themeObserver.disconnect()
  }, [])

  return (
    <div className={g.giscus}>
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

export default Index
