import React from 'react'
import Giscus from '@giscus/react'
import styles from './index.module.css'

const index = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path === '/blog') return null
  }
  return (
    <div className={styles.giscus}>
      <Giscus
        id='comments'
        repo='anaclumos/www-comments'
        repoId='R_kgDOHh2XAw'
        category='General'
        categoryId='DIC_kwDOHh2XA84CPxJo'
        mapping='pathname'
        reactionsEnabled='1'
        emitMetadata='0'
        inputPosition='top'
        theme='preferred_color_scheme'
        lang='en'
      />
    </div>
  )
}

export default index
