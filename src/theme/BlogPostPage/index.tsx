import Head from '@docusaurus/Head'
import type { WrapperProps } from '@docusaurus/types'
import type BlogPostPageType from '@theme/BlogPostPage'
import BlogPostPage from '@theme-original/BlogPostPage'

type Props = WrapperProps<typeof BlogPostPageType>

export default function BlogPostPageWrapper(props: Props) {
  const { title, description } = props.content.metadata

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta content={title} property="og:title" />
        <meta content={description} property="og:description" />
        <meta
          content={`https://og.cho.sh/api/og?title=${encodeURIComponent(title)}&subheading=${encodeURIComponent(
            'Sunghyun Cho'
          )}`}
          property="og:image"
        />
      </Head>
      <BlogPostPage {...props} />
    </>
  )
}
