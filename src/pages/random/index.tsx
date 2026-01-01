import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './styles.module.css'

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
        <BrowserOnly>
          {() => {
            let urls: Element[]
            let randomUrl: string
            fetch('/sitemap.xml')
              .then((res) => res.text())
              .then((text) => {
                const parser = new DOMParser()
                const xml = parser.parseFromString(text, 'text/xml')
                urls = Array.from(xml.querySelectorAll('urlset > url > loc'))
                const randomElement =
                  urls[Math.floor(Math.random() * urls.length)]
                randomUrl = randomElement?.textContent ?? '/'

                window.location.href = randomUrl
              })
            return (
              <div className={styles.container}>
                <button
                  aria-label="Navigate to a random page"
                  className={styles.diceButton}
                  onClick={() => {
                    window.location.href = randomUrl
                  }}
                  type="button"
                >
                  <div aria-hidden="true" className={styles.dice}>
                    🎲
                  </div>
                </button>
              </div>
            )
          }}
        </BrowserOnly>
      </main>
    </Layout>
  )
}

export default RandomUrl
