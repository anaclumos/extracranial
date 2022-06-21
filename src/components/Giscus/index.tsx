import React from 'react'
import Giscus from '@giscus/react'
import g from './giscus.module.css'

const index = () => {
  return (
    <div className={g.giscus}>
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
