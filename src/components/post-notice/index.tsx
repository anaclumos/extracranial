import { translate } from '@docusaurus/Translate'
import Admonition from '@theme/Admonition'
import styles from './PostNotice.module.css'

const TRANSLATIONS = {
  title: translate({ message: 'Heads Up!' }),
  bulletOneFront: translate({ message: 'I wrote this post more than ' }),
  bulletOneBackSingular: translate({ message: ' year ago.' }),
  bulletOneBackPlural: translate({ message: ' years ago.' }),
  bulletTwo: translate({ message: "That's enough time for things to change." }),
  bulletThree: translate({
    message: 'Possibly, I may not endorse the content anymore.',
  }),
  callToAction: translate({ message: 'Google Latest Articles Instead' }),
} as const

interface PostMetadata {
  date: string
  title: string
}

interface PostNoticeProps {
  metadata: PostMetadata
}

const TWO_YEARS_MS = 365 * 24 * 60 * 60 * 1000 * 2

function isOldPost(date: string): boolean {
  const now = new Date()
  const postDate = new Date(date)
  return now.getTime() - postDate.getTime() > TWO_YEARS_MS
}

function howManyYearsAgo(date: string): number {
  const now = new Date()
  const postDate = new Date(date)
  const diff = now.getTime() - postDate.getTime()
  return Math.floor(diff / (365 * 24 * 60 * 60 * 1000))
}

function urlify(text: string): string {
  return text.replace(/\s/g, '+')
}

function SearchGoogleButton({ title }: { title: string }) {
  return (
    <a
      className={styles.searchGoogleButton}
      href={`https://www.google.com/search?q=${urlify(title)}&tbs=qdr:y`}
      rel="noopener noreferrer"
      target="_blank"
    >
      {TRANSLATIONS.callToAction}
    </a>
  )
}

export default function PostNotice({ metadata }: PostNoticeProps) {
  if (!isOldPost(metadata.date)) {
    return null
  }

  const yearsAgo = howManyYearsAgo(metadata.date)

  return (
    <Admonition title={TRANSLATIONS.title} type="caution">
      <ul>
        <li>
          {TRANSLATIONS.bulletOneFront}
          {yearsAgo}
          {yearsAgo > 1
            ? TRANSLATIONS.bulletOneBackPlural
            : TRANSLATIONS.bulletOneBackSingular}
        </li>
        <li>{TRANSLATIONS.bulletTwo}</li>
        <li>{TRANSLATIONS.bulletThree}</li>
      </ul>
      <SearchGoogleButton title={metadata.title} />
    </Admonition>
  )
}
