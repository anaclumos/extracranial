import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info'
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title'
import React from 'react'
import type { JSX } from 'react'

export default function BlogPostItemHeader() {
  return (
    <header>
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      {/* <BlogPostItemHeaderAuthors /> */}
    </header>
  )
}
