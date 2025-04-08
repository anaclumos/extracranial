import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info'
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title'
import type { JSX } from 'react'

export default function BlogPostItemHeader(): JSX.Element {
  return (
    <header>
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      {/* <BlogPostItemHeaderAuthors /> */}
    </header>
  )
}
