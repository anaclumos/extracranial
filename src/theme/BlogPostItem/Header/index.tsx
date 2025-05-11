import React, { JSX } from 'react'
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title'
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info'

export default function BlogPostItemHeader(): JSX.Element {
  return (
    <header className="text-center">
      <BlogPostItemHeaderTitle className="text-4xl font-bold"/>
      <BlogPostItemHeaderInfo />
    </header>
  )
}
