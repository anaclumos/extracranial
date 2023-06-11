import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'

import { useBlogPost } from '@docusaurus/theme-common/internal'
import type { Props } from '@theme/BlogPostItem/Header/Title'
import Balancer from 'react-wrap-balancer'

import styles from './styles.module.css'

export default function BlogPostItemHeaderTitle({ className }: Props): JSX.Element {
  const { metadata, isBlogPostPage } = useBlogPost()
  const { permalink, title } = metadata
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2'
  let emoji = ''
  let titlearray = Array.from(title)
  while (titlearray[titlearray.length - 1] !== ' ') {
    emoji = titlearray.slice(-1).join('') + emoji
    titlearray = titlearray.slice(0, -1)
  }
  return (
    <TitleHeading className={clsx(styles.title, className)} itemProp="headline">
      {isBlogPostPage ? (
        <>
          <Balancer>{titlearray.join('')}</Balancer>
          <br />
          {emoji}
        </>
      ) : (
        <Link itemProp="url" to={permalink}>
          <>
            <Balancer>{titlearray.join('')}</Balancer>
            <br />
            {emoji}
          </>
        </Link>
      )}
    </TitleHeading>
  )
}
