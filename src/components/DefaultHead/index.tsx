import Head from '@docusaurus/Head'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import React from 'react'

const index = () => {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Head>
      <title>{siteConfig.title}</title>
      <meta property="og:image" content="img/ogimage.png" />
      <meta property="twitter:image" content="img/ogimage.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="twitter:card" content="img/ogimage.png" />
      <meta property="twitter:site" content="@anaclumos" />
      <meta property="twitter:creator" content="@anaclumos" />
      <meta property="twitter:title" content={siteConfig.title} />
      <meta property="twitter:description" content={siteConfig.tagline} />
      <meta name="description" content={siteConfig.tagline} />
      <meta property="og:title" content={siteConfig.title} />
      <meta property="og:description" content={siteConfig.tagline} />
      <link rel="icon" href="img/favicon.svg" />
      <link rel="icon" href="img/favicon.ico" />
      <link rel="apple-touch-icon" sizes="57x57" href="img/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="img/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="img/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="img/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="img/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="img/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="img/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="img/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="img/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="img/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="img/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileImage" content="img/ms-icon-144x144.png" />
      <meta name="naver-site-verification" content="15b31306fd3391cd0bf411b1d49160aa02dd3cad" />
    </Head>
  )
}

export default index
