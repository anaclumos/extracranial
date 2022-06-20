import React from 'react'
import BlogPostItem from '@theme-original/BlogPostItem'

export default function BlogPostItemWrapper(props) {
  return (
    <>
      <BlogPostItem {...props} />
      <script
        src='https://giscus.app/client.js'
        data-repo='anaclumos/www-comments'
        data-repo-id='R_kgDOHh2XAw'
        data-category='General'
        data-category-id='DIC_kwDOHh2XA84CPxJo'
        data-mapping='pathname'
        data-reactions-enabled='1'
        data-emit-metadata='0'
        data-input-position='bottom'
        data-theme='preferred_color_scheme'
        data-lang='en'
        crossorigin='anonymous'
        async
      ></script>
    </>
  )
}
