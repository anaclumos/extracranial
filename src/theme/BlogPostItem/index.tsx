import type { WrapperProps } from '@docusaurus/types'
import Giscus from '@site/src/components/Giscus'
import PostNotice from '@site/src/components/PostNotice'
import BlogPostItem from '@theme-original/BlogPostItem'
import type BlogPostItemType from '@theme/BlogPostItem'
import React from 'react'
import type { JSX } from 'react'

import BrowserOnly from '@docusaurus/BrowserOnly'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'

type Props = WrapperProps<typeof BlogPostItemType>

export default function BlogPostItemWrapper(props: Props) {
  const { metadata } = useBlogPost()
  return (
    <>
      <PostNotice {...{ metadata }} />
      <BlogPostItem {...props} />
      <BrowserOnly>{() => <Giscus />}</BrowserOnly>
    </>
  )
}
