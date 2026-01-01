import Head from '@docusaurus/Head'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import { PageMetadata } from '@docusaurus/theme-common'
import type { JSX } from 'react'

export default function DocItemMetadata(): JSX.Element {
  const { metadata, frontMatter, assets } = useDoc()
  const name = 'cho.sh'
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta content={metadata.description} name="description" />
        <meta content={metadata.title} property="og:title" />
        <meta content={metadata.description} property="og:description" />
        <meta
          content={`https://og.cho.sh/api/og?title=${encodeURIComponent(
            metadata.title
          )}&subheading=${encodeURIComponent(name)}`}
          property="og:image"
        />
      </Head>
      <PageMetadata
        description={metadata.description}
        image={assets.image ?? frontMatter.image}
        keywords={frontMatter.keywords}
        title={metadata.title}
      />
    </>
  )
}
