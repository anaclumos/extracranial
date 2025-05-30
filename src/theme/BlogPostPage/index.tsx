import React, { JSX } from 'react'
import BlogPostPage from '@theme-original/BlogPostPage'
import type BlogPostPageType from '@theme/BlogPostPage'
import type { WrapperProps } from '@docusaurus/types'
import Head from '@docusaurus/Head'
type Props = WrapperProps<typeof BlogPostPageType>

export default function BlogPostPageWrapper(props: Props): JSX.Element {
  const title = props.content.metadata.title
  const description = props.content.metadata.description
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`https://og.cho.sh/api/og?title=${encodeURIComponent(title)}&subheading=${encodeURIComponent(
            'Sunghyun Cho'
          )}`}
        />
      </Head>
      <BlogPostPage {...props} />
    </>
  )
}
