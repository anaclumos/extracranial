import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { translate } from '@docusaurus/Translate'
import { usePluralForm } from '@docusaurus/theme-common'

import { useBlogPost } from '@docusaurus/theme-common/internal'
import type { Props } from '@theme/BlogPostItem/Header/Info'

import styles from './styles.module.css'

import { previousAnalyticsData } from '@site/static/previous'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

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

function ReadingTime({ readingTime }: { readingTime: number }) {
  const readingTimePlural = useReadingTimePlural()
  return <>{readingTimePlural(readingTime)}</>
}

function Date({ date, formattedDate }: { date: string; formattedDate: string }) {
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
  let viewCount = 0
  if (viewCountKey.length === 6 && /^[a-fA-F0-9]+$/.test(viewCountKey)) {
    await fetch(
      `https://simpleanalytics.com/cho.sh.json?version=5&info=false&start=2022-06-01&fields=pages&pages=*${viewCountKey}*`
    ).then((response) =>
      response
        .json()
        .then((data) => data.pages)
        .then((pages) => {
          pages.forEach((page) => {
            viewCount += page.pageviews
          })
        })
    )
  }
  viewCount += previousAnalyticsData[viewCountKey] || 0
  return viewCount
}

const getViewString = (viewCount: number, locale: string) => {
  if (viewCount === -1) {
    return translate({
      id: 'theme.blog.post.loading.views',
      message: 'Loading...',
      description: 'The blog post view count is loading',
    })
  }
  if (viewCount === 0) {
    return translate({
      id: 'theme.blog.post.no.views',
      message: 'Unknown Views',
      description: 'The blog post has no views',
    })
  } else if (viewCount === 1) {
    return (
      viewCount.toLocaleString(locale) +
      translate({
        id: 'theme.blog.post.view',
        message: 'view',
        description: 'The blog post has 1 view',
      })
    )
  } else {
    return (
      viewCount.toLocaleString(locale) +
      translate({
        id: 'theme.blog.post.views',
        message: 'views',
        description: 'The blog post has multiple views',
      })
    )
  }
}

export default function BlogPostItemHeaderInfo({ className }: Props): JSX.Element {
  const { metadata } = useBlogPost()
  const { date, formattedDate, readingTime, permalink } = metadata
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale ?? 'en'

  const [viewCount, setViewCount] = useState(-1)
  useEffect(() => {
    getViewCount(permalink).then((viewcount) => {
      if (typeof viewcount === 'number') setViewCount(viewcount)
    })
  }, [permalink])

  return (
    <div className={clsx(styles.container, 'margin-vert--md', className)}>
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
          <a
            href={'https://simpleanalytics.com/cho.sh'}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.viewCount}
          >
            <span>{getViewString(viewCount, locale)}</span>
          </a>
        </>
      )}
    </div>
  )
}
