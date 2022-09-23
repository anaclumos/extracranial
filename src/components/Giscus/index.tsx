import React from 'react'
import Giscus from '@giscus/react'
import g from './giscus.module.css'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const index = () => {
  const { i18n } = useDocusaurusContext()

  return (
    <div className={g.giscus}>
      <Giscus
        id="comments"
        repo="anaclumos/extracranial-comments"
        repoId="R_kgDOHh2XAw"
        category="General"
        categoryId="DIC_kwDOHh2XA84CPxJo"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        strict="0"
        theme="https://cho.sh/css/giscus.css"
        lang={i18n.currentLocale}
      />
    </div>
  )
}

export default index
