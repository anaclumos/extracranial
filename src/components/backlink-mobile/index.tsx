import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import backlinks from '@site/src/data/backlinks.json'
import filenames from '@site/src/data/filenames.json'
import styles from './styles.module.css'

interface BacklinkMobileProps {
  documentTitle: string
}

type BacklinksData = Record<string, Record<string, string>>
type FilenamesData = Record<string, string>

const typedBacklinks = backlinks as BacklinksData
const typedFilenames = filenames as FilenamesData

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function processExcerpt(text: string, title: string): string {
  const normalizedText = text.trim().normalize('NFC')

  const normalizedTitle = title.normalize('NFC')
  const escapedTitle = escapeRegExp(normalizedTitle)

  // First, strip wikilinks to plain text for truncation calculation
  let plainText = normalizedText
  try {
    const regex1 = new RegExp(`\\[\\[${escapedTitle}\\|(.+?)\\]\\]`, 'gi')
    plainText = plainText.replace(regex1, '$1')

    const regex2 = new RegExp(`\\[\\[${escapedTitle}\\]\\]`, 'gi')
    plainText = plainText.replace(regex2, normalizedTitle)

    plainText = plainText.replace(/\[\[(.+?)\|(.+?)\]\]/g, '$2')
    plainText = plainText.replace(/\[\[(.+?)\]\]/g, '$1')
  } catch {
    // If regex fails, use original text
  }

  // Truncate plain text before adding HTML
  const maxLength = 140
  let truncated = false
  if (plainText.length > maxLength) {
    plainText = plainText.slice(0, maxLength)
    truncated = true
  }

  // Escape HTML entities
  let result = plainText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Now add <b> tags for the title (on the already-truncated text)
  try {
    const escapedTitleForHtml = normalizedTitle
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    const titleRegex = new RegExp(escapeRegExp(escapedTitleForHtml), 'gi')
    result = result.replace(titleRegex, `<b>${escapedTitleForHtml}</b>`)
  } catch {
    // If regex fails, return without bold
  }

  if (truncated) {
    result = `${result}...`
  }

  return result
}

export default function BacklinkMobile({ documentTitle }: BacklinkMobileProps) {
  const documentTitleEncoded = documentTitle.normalize('NFC')
  const backlinkItems = typedBacklinks[documentTitleEncoded]

  const backlinkEntries = backlinkItems
    ? Object.keys(backlinkItems)
        .sort()
        .reverse()
        .map((backlink) => {
          const backlinkTitle = backlink.normalize('NFC')
          const filenameEntry = typedFilenames[backlinkTitle]
          if (!filenameEntry) {
            return null
          }
          const link = filenameEntry.replace('/', '')
          const content = backlinkItems[backlink]
          return { title: backlinkTitle, link, content }
        })
        .filter(Boolean)
    : []

  const backlinkCount = backlinkEntries.length

  return (
    <details className={styles.backlinkMobile}>
      <summary className={styles.summary}>
        {translate({
          id: 'backlink.mobile.title',
          message: 'Links to This Note',
          description: 'The title of the mobile backlink section',
        })}
        {backlinkCount > 0 && (
          <span className={styles.count}>{backlinkCount}</span>
        )}
      </summary>
      <div className={styles.content}>
        <ul className={styles.list}>
          {backlinkEntries.length > 0 ? (
            backlinkEntries.map((entry) =>
              entry ? (
                <li className={styles.listItem} key={entry.title}>
                  <Link className={styles.link} to={entry.link}>
                    <span className={styles.linkTitle}>{entry.title}</span>
                    {entry.content && (
                      <span
                        className={styles.excerpt}
                        dangerouslySetInnerHTML={{
                          __html: processExcerpt(
                            entry.content,
                            documentTitleEncoded
                          ),
                        }}
                      />
                    )}
                  </Link>
                </li>
              ) : null
            )
          ) : (
            <li className={styles.empty}>
              {translate({
                id: 'backlink.mobile.empty',
                message: 'Nothing here yet...',
                description: 'The message when there is no backlink on mobile',
              })}
            </li>
          )}
        </ul>
      </div>
    </details>
  )
}
