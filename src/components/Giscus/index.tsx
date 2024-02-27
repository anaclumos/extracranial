import React, { useState, useEffect } from 'react'
import Giscus from '@giscus/react'
import g from './giscus.module.css'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const Index = () => {
  const { i18n } = useDocusaurusContext()

  // State to manage theme
  const [theme, setTheme] = useState(() => {
    // Initial theme based on CSS data-theme or prefers-color-scheme
    const cssTheme = document.body.getAttribute('data-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return cssTheme === 'dark' || prefersDark ? 'black' : 'light'
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // Function to update theme based on media query
    const handleMediaQueryChange = (event) => {
      setTheme(event.matches ? 'black' : 'light')
    }

    // Add listener for changes using addEventListener
    mediaQuery.addEventListener('change', handleMediaQueryChange)

    // Remove listener on cleanup using removeEventListener
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange)
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
