import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info'
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title'
import type { JSX } from 'react'
import styles from './styles.module.css'

export default function BlogPostItemHeader(): JSX.Element {
  return (
    <header className={styles.blogPostItemHeader}>
      <BlogPostItemHeaderTitle className={styles.blogPostItemHeaderTitle} />
      <BlogPostItemHeaderInfo />
    </header>
  )
}
