import React from 'react'
import BlogPostItem from '@theme-original/BlogPostItem'
import type BlogPostItemType from '@theme/BlogPostItem'
import type { WrapperProps } from '@docusaurus/types'
import Giscus from '@site/src/components/Giscus'
import PostNotice from '@site/src/components/PostNotice'

import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import BrowserOnly from '@docusaurus/BrowserOnly'

type Props = WrapperProps<typeof BlogPostItemType>

export default function BlogPostItemWrapper(props: Props): JSX.Element {
  const { metadata } = useBlogPost()
  return (
    <>
      <PostNotice {...{ metadata }} />
      <BlogPostItem {...props} />
      <BrowserOnly>{() => <Giscus />}</BrowserOnly>
    </>
  )
}
