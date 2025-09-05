"use client"

import React, { useEffect, useState } from 'react'
import Giscus from '@giscus/react'
import { useParams } from 'next/navigation'

const GiscusComments = () => {
  const { lang, slug } = useParams<{ lang: string, slug: string }>() || { lang: 'en', slug: '' }
  
  return (
    <div>
      <Giscus
    repo="anaclumos/extracranial-comments"
    repoId="R_kgDOHh2XAw"
    category="General"
    categoryId="DIC_kwDOHh2XA84CPxJo"
    mapping="specific"
    term={slug}
    strict="0"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="bottom"
    theme="preferred_color_scheme"
    lang={lang}
    />
    </div>
  )
}

export default GiscusComments

