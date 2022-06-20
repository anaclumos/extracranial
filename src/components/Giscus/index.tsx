import React from 'react'
import Giscus from '@giscus/react'
import styles from './index.module.css'

const index = () => {
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
        theme='https://raw.githubusercontent.com/anaclumos/www/main/src/components/Giscus/theme.css'
        lang='en'
      />
    </div>
  )
}

export default index
