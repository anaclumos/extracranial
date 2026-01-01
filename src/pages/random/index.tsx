import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'

const RandomUrl = () => {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout description={siteConfig.tagline} title="To Infinity and Beyond">
      <>
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
                  randomUrl =
                    urls[Math.floor(Math.random() * urls.length)].textContent

                  window.location.href = randomUrl
                })
              return (
                <div className={styles.container}>
                  <button
                    className={styles.diceButton}
                    onClick={() => {
                      window.location.href = randomUrl
                    }}
                  >
                    <div className={styles.dice}>🎲</div>
                  </button>
                </div>
              )
            }}
          </BrowserOnly>
        </main>
      </>
    </Layout>
  )
}

export default RandomUrl
