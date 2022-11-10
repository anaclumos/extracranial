import React from 'react'
import { PageMetadata } from '@docusaurus/theme-common'
// @ts-ignore
import { useDoc } from '@docusaurus/theme-common/internal'
import Head from '@docusaurus/Head'

export default function DocItemMetadata(): JSX.Element {
  const { metadata, frontMatter, assets } = useDoc()
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta
          name="description"
          content={metadata.description}
        />
        <meta
          property="og:title"
          content={metadata.title}
        />
        <meta
          property="og:description"
          content={metadata.description}
        />
        <meta
          property="og:image"
          content={`https://og-image.cho.sh/**${encodeURIComponent(
            metadata.title
          )}**.png?theme=%235597ec&md=1&fontSize=100px&images=https%3A%2F%2Fcho.sh%2Fimg%2Ffavicon.png`}
        />
      </Head>
      <img
        src="https://sa.cho.sh/noscript.gif"
        alt=""
        referrerPolicy="no-referrer-when-downgrade"
      />
      <PageMetadata
        title={metadata.title}
        description={metadata.description}
        keywords={frontMatter.keywords}
        image={assets.image ?? frontMatter.image}
      />
    </>
  )
}
