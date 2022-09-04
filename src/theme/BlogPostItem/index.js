import React from 'react'
import BlogPostItem from '@theme-original/BlogPostItem'
import Giscus from '@site/src/components/Giscus'

import PostNotice from '@site/src/components/PostNotice'
import { useBlogPost } from '@docusaurus/theme-common/internal'

export default function BlogPostItemWrapper(props) {
  const { metadata } = useBlogPost()
  return (
    <>
      <PostNotice {...{ metadata }} />
      <BlogPostItem {...props} />
      <Giscus />
    </>
  )
}
