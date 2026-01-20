import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import backlinks from '@site/src/data/backlinks.json'
import filenames from '@site/src/data/filenames.json'
import { useMemo } from 'react'
import styles from './styles.module.css'

interface BacklinkSidebarProps {
  documentTitle: string
}

type BacklinksData = Record<string, Record<string, string>>
type FilenamesData = Record<string, string>
interface BacklinkEntry {
  title: string
  link: string
  excerpt?: string
}

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
    result = `${result}\u2026`
  }

  return result
}

export default function BacklinkSidebar({
  documentTitle,
}: BacklinkSidebarProps) {
  const documentTitleEncoded = useMemo(
    () => documentTitle.normalize('NFC'),
    [documentTitle]
  )
  const backlinkItems = typedBacklinks[documentTitleEncoded]

  const backlinkEntries = useMemo(() => {
    if (!backlinkItems) {
      return []
    }

    const entries: BacklinkEntry[] = []
    const keys = Object.keys(backlinkItems).sort().reverse()
    for (const backlink of keys) {
      const backlinkTitle = backlink.normalize('NFC')
      const filenameEntry = typedFilenames[backlinkTitle]
      if (!filenameEntry) {
        continue
      }
      const link = filenameEntry.replace('/', '')
      const content = backlinkItems[backlink]
      const excerpt = content
        ? processExcerpt(content, documentTitleEncoded)
        : undefined
      entries.push({ title: backlinkTitle, link, excerpt })
    }

    return entries
  }, [backlinkItems, documentTitleEncoded])

  return (
    <div className={styles.backlinkSidebar}>
      <h4 className={styles.title}>
        {translate({
          id: 'backlink.sidebar.title',
          message: 'Links to This Note',
          description: 'The title of the backlink sidebar section',
        })}
      </h4>
      <ul className={styles.list}>
        {backlinkEntries.length > 0 ? (
          backlinkEntries.map((entry) => (
            <li className={styles.listItem} key={entry.title}>
              <Link className={styles.link} to={entry.link}>
                <span className={styles.linkTitle}>{entry.title}</span>
                {entry.excerpt && (
                  <span
                    className={styles.excerpt}
                    dangerouslySetInnerHTML={{ __html: entry.excerpt }}
                  />
                )}
              </Link>
            </li>
          ))
        ) : (
          <li className={styles.empty}>
            {translate({
              id: 'backlink.sidebar.empty',
              message: 'Nothing here yet\u2026',
              description: 'The message when there is no backlink',
            })}
          </li>
        )}
      </ul>
    </div>
  )
}
