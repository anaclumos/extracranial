import React from 'react'
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title'
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info'

export default function BlogPostItemHeader(): JSX.Element {
  return (
    <header>
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      {/* <BlogPostItemHeaderAuthors /> */}
    </header>
  )
}
