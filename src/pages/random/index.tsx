import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.css'

function RandomContent() {
  const [randomUrl, setRandomUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  const fetchRandomUrl = useCallback(async (signal?: AbortSignal) => {
    try {
      setStatus('loading')
      const response = await fetch('/sitemap.xml', { signal })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      const text = await response.text()
      const parser = new DOMParser()
      const xml = parser.parseFromString(text, 'text/xml')
      const urls = Array.from(xml.querySelectorAll('urlset > url > loc'))
      const randomElement = urls[Math.floor(Math.random() * urls.length)]
      const nextUrl = randomElement?.textContent ?? '/'
      setRandomUrl(nextUrl)
      setStatus('ready')
      return nextUrl
    } catch (error) {
      if (signal?.aborted) {
        return null
      }
      console.error('Failed to fetch sitemap:', error)
      setStatus('error')
      return null
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchRandomUrl(controller.signal).then((nextUrl) => {
      if (nextUrl) {
        window.location.assign(nextUrl)
      }
    })
    return () => controller.abort()
  }, [fetchRandomUrl])

  return (
    <div className={styles.container}>
      <a className={styles.diceButton} href={randomUrl ?? '/'}>
        <div aria-hidden="true" className={styles.dice}>
          🎲
        </div>
        <span className={styles.srOnly}>Navigate to a random page</span>
      </a>
      {status === 'error' && (
        <p className={styles.error}>Failed to load sitemap. Try again.</p>
      )}
    </div>
  )
}

const RandomUrl = () => {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout description={siteConfig.tagline} title="To Infinity and Beyond">
      <Head>
        <title>{'To Infinity and Beyond'}</title>
        <meta content={siteConfig.tagline} name="description" />
        <meta content={'To Infinity and Beyond'} property="og:title" />
        <meta content={siteConfig.tagline} property="og:description" />
        <meta
          content={`https://og.cho.sh/api/og?title=${encodeURIComponent(
            'To Infinity and Beyond'
          )}&subheading=${encodeURIComponent(siteConfig.tagline)}`}
          property="og:image"
        />
      </Head>
      <main>
        <BrowserOnly fallback={<div className={styles.container} />}>
          {() => <RandomContent />}
        </BrowserOnly>
      </main>
    </Layout>
  )
}

export default RandomUrl
