import React from 'react'
import BlogPostItem from '@theme-original/BlogPostItem'
import type BlogPostItemType from '@theme/BlogPostItem'
import type { WrapperProps } from '@docusaurus/types'
import Giscus from '@site/src/components/Giscus'

type Props = WrapperProps<typeof BlogPostItemType>

// PostNotice Postponed. See: https://github.com/facebook/docusaurus/issues/7759
// import PostNotice from '@site/src/components/PostNotice'
// import { useBlogPost } from '@docusaurus/theme-common/src/contexts/blogPost'

export default function BlogPostItemWrapper(
  props: Props
): JSX.Element {
  // const { metadata } = useBlogPost()
  return (
    <>
      {/* <PostNotice {...{ metadata }} /> */}
      <BlogPostItem {...props} />
      <Giscus />
    </>
  )
}
