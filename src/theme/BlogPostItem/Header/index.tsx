import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info'
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title'
import type { JSX } from 'react'

export default function BlogPostItemHeader(): JSX.Element {
  return (
    <header className="text-balance text-center">
      <BlogPostItemHeaderTitle className="text-5xl" />
      <BlogPostItemHeaderInfo />
    </header>
  )
}
