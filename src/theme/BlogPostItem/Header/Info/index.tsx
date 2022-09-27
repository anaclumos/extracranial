import React from 'react'
import clsx from 'clsx'
import { translate } from '@docusaurus/Translate'
import { usePluralForm } from '@docusaurus/theme-common'
// @ts-ignore
import { useBlogPost } from '@docusaurus/theme-common/internal'
import type { Props } from '@theme/BlogPostItem/Header/Info'

import styles from './styles.module.css'

// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
  const { selectMessage } = usePluralForm()
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat)
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        { readingTime }
      )
    )
  }
}

function ReadingTime({
  readingTime,
}: {
  readingTime: number
}) {
  const readingTimePlural = useReadingTimePlural()
  return <>{readingTimePlural(readingTime)}</>
}

function Date({
  date,
  formattedDate,
}: {
  date: string
  formattedDate: string
}) {
  return (
    <time dateTime={date} itemProp="datePublished">
      {formattedDate}
    </time>
  )
}

function Spacer() {
  return <>{' • '}</>
}
async function getViewCount(path: string) {
  const viewCountPath = path.split('?')[0]
  const viewCountKey = viewCountPath.split('/').slice(-1)[0]
  let viewCount: Number = 0
  if (
    viewCountKey.length === 6 &&
    /^[a-fA-F0-9]+$/.test(viewCountKey)
  ) {
    await fetch(
      `https://simpleanalytics.com/cho.sh.json?version=5&info=false&fields=pages&pages=*${viewCountKey}*`
    ).then((response) =>
      response
        .json()
        .then((data) => data.pages)
        .then((pages) => {
          // console.log(pages)
          pages.forEach((page) => {
            console.log(page)
            viewCount += page.pageviews
          })
        })
    )
  }
  console.log(viewCount)
  return viewCount
}

export default function BlogPostItemHeaderInfo({
  className,
}: Props): JSX.Element {
  const { metadata } = useBlogPost()
  const { date, formattedDate, readingTime, permalink } =
    metadata

  const [viewCount, setViewCount] = React.useState(0)
  React.useEffect(() => {
    getViewCount(permalink).then((viewcount) => {
      if (typeof viewcount === 'number')
        setViewCount(viewcount)
    })
  }, [permalink])

  return (
    <div
      className={clsx(
        styles.container,
        'margin-vert--md',
        className
      )}
    >
      <Date date={date} formattedDate={formattedDate} />
      {typeof readingTime !== 'undefined' && (
        <>
          <Spacer />
          <ReadingTime readingTime={readingTime} />
        </>
      )}
      {typeof viewCount !== 'undefined' && (
        <>
          <Spacer />
          <span>{viewCount.toLocaleString()} Views</span>
        </>
      )}
    </div>
  )
}
