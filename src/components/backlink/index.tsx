import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import backlinks from '@site/src/data/backlinks.json'
import filenames from '@site/src/data/filenames.json'
import { useMemo } from 'react'
import styles from './styles.module.css'

interface BacklinkProps {
  documentTitle: string
}

type BacklinksData = Record<string, Record<string, string>>
type FilenamesData = Record<string, string>
interface BacklinkEntry {
  title: string
  link: string
  content: string
}

const typedBacklinks = backlinks as BacklinksData
const typedFilenames = filenames as FilenamesData

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function processBacklinkItem(text: string, title: string) {
  const escapedText = text
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

  const normalizedTitle = title.normalize('NFC')
  let normalizedText = escapedText.normalize('NFC')
  const escapedTitle = escapeRegExp(normalizedTitle)

  try {
    const regex1 = new RegExp(`\\[\\[${escapedTitle}\\|(.+?)\\]\\]`, 'gi')
    normalizedText = normalizedText.replace(
      regex1,
      `<b class="${styles.highlight}">$1</b>`
    )

    const regex2 = new RegExp(`\\[\\[${escapedTitle}\\]\\]`, 'gi')
    normalizedText = normalizedText.replace(
      regex2,
      `<b class="${styles.highlight}">${normalizedTitle}</b>`
    )

    const regex3 = /\[\[(.+?)\|(.+?)\]\]/g
    normalizedText = normalizedText.replace(regex3, '$2')

    const regex4 = /\[\[(.+?)\]\]/g
    normalizedText = normalizedText.replace(regex4, '$1')
  } catch {
    return (
      <pre
        className={styles.backlinkItemText}
        dangerouslySetInnerHTML={{ __html: escapedText.trim() }}
      />
    )
  }

  return (
    <pre
      className={styles.backlinkItemText}
      dangerouslySetInnerHTML={{
        __html: normalizedText.trim(),
      }}
    />
  )
}

export default function Backlink({ documentTitle }: BacklinkProps) {
  const documentTitleEncoded = useMemo(
    () => documentTitle.normalize('NFC'),
    [documentTitle]
  )
  const backlinkItems = typedBacklinks[documentTitleEncoded]
  const title = documentTitleEncoded

  const backlinkEntries = useMemo(() => {
    if (!backlinkItems) {
      return []
    }

    const entries: BacklinkEntry[] = []
    const keys = Object.keys(backlinkItems).sort().reverse()
    for (const backlink of keys) {
      const backlinkTitle = backlink.normalize('NFC')
      const filenameEntry = typedFilenames[backlinkTitle]
      const backlinkContent = backlinkItems[backlink]

      if (!(filenameEntry && backlinkContent)) {
        continue
      }

      const link = filenameEntry.replace('/', '')
      entries.push({ title: backlinkTitle, link, content: backlinkContent })
    }

    return entries
  }, [backlinkItems])

  return (
    <div className={styles.backlinkTable}>
      <h3 className={styles.backlinkTableH2}>
        {translate({
          id: 'backlink.title',
          message: 'Links to This Note',
          description: 'The title of the backlink section',
        })}
      </h3>
      <div className={styles.backlinkGridView}>
        {backlinkEntries.length > 0 ? (
          backlinkEntries.map((entry) => (
            <Link
              className={styles.backlinkItemLink}
              key={entry.title}
              to={entry.link}
            >
              <div className={styles.backlinkItem}>
                <h4 className={styles.backlinkMentionedFileName}>
                  {entry.title}
                </h4>
                {processBacklinkItem(entry.content, title)}
              </div>
            </Link>
          ))
        ) : (
          <p className={styles.noBacklink}>
            {translate({
              id: 'backlink.noBacklink',
              message: 'Nothing here yet\u2026',
              description: 'The message when there is no backlink',
            })}
          </p>
        )}
      </div>
    </div>
  )
}
