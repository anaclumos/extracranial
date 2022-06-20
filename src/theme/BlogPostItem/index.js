import React from 'react'
import BlogPostItem from '@theme-original/BlogPostItem'
import Giscus from '../../components/Giscus'
export default function BlogPostItemWrapper(props) {
  return (
    <>
      <BlogPostItem {...props} />
      <Giscus />
    </>
  )
}
