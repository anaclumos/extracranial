import { useThemeConfig } from '@docusaurus/theme-common'
import {
  type TOCHighlightConfig,
  useFilteredAndTreeifiedTOC,
  useTOCHighlight,
} from '@docusaurus/theme-common/internal'
import type { Props } from '@theme/TOCItems'
import TOCItemTree from '@theme/TOCItems/Tree'
import React from 'react'
import { useMemo } from 'react'

export default function TOCItems({
  toc,
  className = 'table-of-contents',
  linkClassName = 'table-of-contents__link',
  linkActiveClassName = undefined,
  minHeadingLevel: minHeadingLevelOption,
  maxHeadingLevel: maxHeadingLevelOption,
  ...props
}: Props) {
  const themeConfig = useThemeConfig()

  const minHeadingLevel =
    minHeadingLevelOption ?? themeConfig.tableOfContents.minHeadingLevel
  const maxHeadingLevel =
    maxHeadingLevelOption ?? themeConfig.tableOfContents.maxHeadingLevel

  const tocTree = useFilteredAndTreeifiedTOC({
    toc,
    minHeadingLevel,
    maxHeadingLevel,
  })

  const tocHighlightConfig: TOCHighlightConfig | undefined = useMemo(() => {
    if (linkClassName && linkActiveClassName) {
      return {
        linkClassName,
        linkActiveClassName,
        minHeadingLevel,
        maxHeadingLevel,
      }
    }
    return undefined
  }, [linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel])
  useTOCHighlight(tocHighlightConfig)

  return (
    <TOCItemTree
      toc={tocTree}
      className={className}
      linkClassName={linkClassName}
      {...props}
    />
  )
}
