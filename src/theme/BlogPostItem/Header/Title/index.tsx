import React, { JSX } from 'react'
import { cn } from '@site/src/util/cn'
import Link from '@docusaurus/Link'

import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import type { Props } from '@theme/BlogPostItem/Header/Title'

export default function BlogPostItemHeaderTitle({ className }: Props): JSX.Element {
  const { metadata, isBlogPostPage } = useBlogPost()
  const { permalink, title } = metadata
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2'

  let emoji = ''
  let titleText = title

  let lastNonSpaceIndex = title.length - 1
  while (lastNonSpaceIndex >= 0 && title[lastNonSpaceIndex] === ' ') {
    lastNonSpaceIndex--
  }

  let emojiStartIndex = lastNonSpaceIndex
  while (emojiStartIndex >= 0 && title[emojiStartIndex] !== ' ') {
    emojiStartIndex--
  }

  if (emojiStartIndex >= 0) {
    emoji = title.slice(emojiStartIndex + 1)
    titleText = title.slice(0, emojiStartIndex + 1)
  }

  return (
    <TitleHeading className={cn(className, 'text-balance')} itemProp="headline">
      {isBlogPostPage ? (
        <>
          {titleText}
          <br />
          {emoji}
        </>
      ) : (
        <Link itemProp="url" to={permalink}>
          <>
            {titleText}
            <br />
            {emoji}
          </>
        </Link>
      )}
    </TitleHeading>
  )
}
