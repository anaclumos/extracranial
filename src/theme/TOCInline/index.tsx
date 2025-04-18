import type { Props } from '@theme/TOCInline'
import TOCItems from '@theme/TOCItems'
import React from 'react'
import type { JSX } from 'react'

import styles from './styles.module.css'

export default function TOCInline({
  toc,
  minHeadingLevel,
  maxHeadingLevel,
}: Props) {
  return (
    <div className={styles.tableOfContentsInline}>
      <TOCItems
        toc={toc}
        minHeadingLevel={minHeadingLevel}
        maxHeadingLevel={maxHeadingLevel}
        className='table-of-contents'
        linkClassName={null}
      />
    </div>
  )
}
