import type { Props } from '@theme/TOCInline'
import TOCItems from '@theme/TOCItems'
import type { JSX } from 'react'
import styles from './styles.module.css'

export default function TOCInline({
  toc,
  minHeadingLevel,
  maxHeadingLevel,
}: Props): JSX.Element {
  return (
    <div className={styles.tableOfContentsInline}>
      <TOCItems
        className="table-of-contents"
        linkClassName={null}
        maxHeadingLevel={maxHeadingLevel}
        minHeadingLevel={minHeadingLevel}
        toc={toc}
      />
    </div>
  )
}
