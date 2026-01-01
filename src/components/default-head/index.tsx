import Head from '@docusaurus/Head'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { SpeedInsights } from '@vercel/speed-insights/react'

const index = () => {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Head>
      <SpeedInsights />
      <title>{siteConfig.title}</title>
      <meta content="img/ogimage.png" property="og:image" />
      <meta content="img/ogimage.png" property="twitter:image" />
      <meta content="1200" property="og:image:width" />
      <meta content="630" property="og:image:height" />
      <meta content="img/ogimage.png" property="twitter:card" />
      <meta content="@anaclumos" property="twitter:site" />
      <meta content="@anaclumos" property="twitter:creator" />
      <meta content={siteConfig.title} property="twitter:title" />
      <meta content={siteConfig.tagline} property="twitter:description" />
      <meta content={siteConfig.tagline} name="description" />
      <meta content={siteConfig.title} property="og:title" />
      <meta content={siteConfig.tagline} property="og:description" />
      <link href="/img/favicon.svg" rel="icon" />
      <link href="/img/favicon.ico" rel="icon" />
      <link
        href="img/apple-icon-57x57.png"
        rel="apple-touch-icon"
        sizes="57x57"
      />
      <link
        href="img/apple-icon-60x60.png"
        rel="apple-touch-icon"
        sizes="60x60"
      />
      <link
        href="img/apple-icon-72x72.png"
        rel="apple-touch-icon"
        sizes="72x72"
      />
      <link
        href="img/apple-icon-76x76.png"
        rel="apple-touch-icon"
        sizes="76x76"
      />
      <link
        href="img/apple-icon-114x114.png"
        rel="apple-touch-icon"
        sizes="114x114"
      />
      <link
        href="img/apple-icon-120x120.png"
        rel="apple-touch-icon"
        sizes="120x120"
      />
      <link
        href="img/apple-icon-144x144.png"
        rel="apple-touch-icon"
        sizes="144x144"
      />
      <link
        href="img/apple-icon-152x152.png"
        rel="apple-touch-icon"
        sizes="152x152"
      />
      <link
        href="img/apple-icon-180x180.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="img/android-icon-192x192.png"
        rel="icon"
        sizes="192x192"
        type="image/png"
      />
      <link
        href="img/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="img/favicon-96x96.png"
        rel="icon"
        sizes="96x96"
        type="image/png"
      />
      <link
        href="img/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link href="/manifest.json" rel="manifest" />
      <meta content="img/ms-icon-144x144.png" name="msapplication-TileImage" />
      <meta
        content="15b31306fd3391cd0bf411b1d49160aa02dd3cad"
        name="naver-site-verification"
      />
    </Head>
  )
}

export default index
