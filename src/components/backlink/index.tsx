import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import backlinks from '@site/src/data/backlinks.json'
import filenames from '@site/src/data/filenames.json'
import styles from './styles.module.css'

interface BacklinkProps {
  documentTitle: string
}

function escapeRegExp(str: string): string {
  // Escapes special characters for use in a regular expression
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
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

  // Escape special characters in title
  const escapedTitle = escapeRegExp(normalizedTitle)

  try {
    // Replace [[title|display]] with `<b class="${styles.highlight}">${display}</b>` with regex
    const regex1 = new RegExp(`\\[\\[${escapedTitle}\\|(.+?)\\]\\]`, 'gi')
    normalizedText = normalizedText.replace(regex1, `<b class="${styles.highlight}">$1</b>`)

    // Replace [[title]] with `<b class="${styles.highlight}">${title}</b>` with regex
    const regex2 = new RegExp(`\\[\\[${escapedTitle}\\]\\]`, 'gi')
    normalizedText = normalizedText.replace(regex2, `<b class="${styles.highlight}">${normalizedTitle}</b>`)

    // Replace [[other text|display]] with display. other can include spaces
    const regex3 = new RegExp(`\\[\\[(.+?)\\|(.+?)\\]\\]`, 'g')
    normalizedText = normalizedText.replace(regex3, '$2')

    // Replace [[other]] with other
    const regex4 = new RegExp(`\\[\\[(.+?)\\]\\]`, 'g')
    normalizedText = normalizedText.replace(regex4, '$1')
  } catch (e) {
    console.error('Error processing backlink item:', e)
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
  // normalize to 'NFC' to match the key of backlinks
  // See https://cho.sh/r/DF5A6E
  const documentTitleEncoded = documentTitle.normalize('NFC')
  const backlinkItems = backlinks[documentTitleEncoded]
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
              if (!filenames[backlinkTitle]) {
                console.warn(`Backlink title not found: ${backlinkTitle}`)
              }
              const link = filenames[backlinkTitle].replace('/', '')
              return (
                <Link to={link} className={styles.backlinkItemLink} key={backlink}>
                  <div className={styles.backlinkItem}>
                    <h3 className={styles.backlinkMentionedFileName}>{backlinkTitle}</h3>
                    {processBacklinkItem(backlinkItems[backlink], title)}
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
