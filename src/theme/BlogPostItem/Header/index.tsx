import React, { JSX } from 'react'
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title'
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info'

import styles from './styles.module.css'

export default function BlogPostItemHeader(): JSX.Element {
  return (
    <header className={styles['blog-post-item-header']}>
      <BlogPostItemHeaderTitle className={styles['blog-post-item-header-title']} />
      <BlogPostItemHeaderInfo />
    </header>
  )
}
