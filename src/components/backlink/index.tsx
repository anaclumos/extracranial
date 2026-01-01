import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import backlinks from '@site/src/data/backlinks.json'
import filenames from '@site/src/data/filenames.json'
import styles from './styles.module.css'

interface BacklinkProps {
  documentTitle: string
}

type BacklinksData = Record<string, Record<string, string>>
type FilenamesData = Record<string, string>

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
    // Silently handle regex processing errors
  }

  return (
    <pre
      className={styles.backlinkItemText}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for rendering highlighted backlinks
      dangerouslySetInnerHTML={{
        __html: normalizedText.trim(),
      }}
    />
  )
}

export default function Backlink({ documentTitle }: BacklinkProps) {
  const documentTitleEncoded = documentTitle.normalize('NFC')
  const backlinkItems = typedBacklinks[documentTitleEncoded]
  const title = documentTitleEncoded

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
        {(backlinkItems &&
          Object.keys(backlinkItems)
            .sort()
            .reverse()
            .map((backlink) => {
              const backlinkTitle = backlink.normalize('NFC')
              const filenameEntry = typedFilenames[backlinkTitle]
              if (!filenameEntry) {
                return null
              }
              const link = filenameEntry.replace('/', '')
              const backlinkContent = backlinkItems[backlink]
              if (!backlinkContent) {
                return null
              }
              return (
                <Link
                  className={styles.backlinkItemLink}
                  key={backlink}
                  to={link}
                >
                  <div className={styles.backlinkItem}>
                    <h4 className={styles.backlinkMentionedFileName}>
                      {backlinkTitle}
                    </h4>
                    {processBacklinkItem(backlinkContent, title)}
                  </div>
                </Link>
              )
            })) || (
          <p className={styles.noBacklink}>
            {translate({
              id: 'backlink.noBacklink',
              message: 'Nothing here yet...',
              description: 'The message when there is no backlink',
            })}
          </p>
        )}
      </div>
    </div>
  )
}
