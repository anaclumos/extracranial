import React from 'react'
import { PageMetadata } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import Head from '@docusaurus/Head'

export default function DocItemMetadata(): JSX.Element {
  const { metadata, frontMatter, assets } = useDoc()
  const name = 'cho.sh'
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta
          property="og:image"
          content={`https://og.cho.sh/api/og?title=${encodeURIComponent(
            metadata.title
          )}&subheading=${encodeURIComponent(name)}`}
        />
      </Head>
      <img src="https://sa.cho.sh/noscript.gif" alt="" referrerPolicy="no-referrer-when-downgrade" />
      <PageMetadata
        title={metadata.title}
        description={metadata.description}
        keywords={frontMatter.keywords}
        image={assets.image ?? frontMatter.image}
      />
    </>
  )
}
