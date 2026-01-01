import type { Props } from '@theme/TOCInline'
import TOCItems from '@theme/TOCItems'
import type { JSX } from 'react'

export default function TOCInline({
  toc,
  minHeadingLevel,
  maxHeadingLevel,
}: Props): JSX.Element {
  return (
    <div className="[&_ul]:list-disc [&_ul]:pt-0 [&_ul]:text-base">
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
