import React from 'react'
import Link from '@docusaurus/Link'
import styles from './styles.module.css'

import { backlinks } from '@site/src/data/backlinks'
import { filenames } from '@site/src/data/filenames'
import { translate } from '@docusaurus/Translate'

type Props = {
  documentTitle: string
}
const escapeRegExp = (string) => {
  // Escapes special characters for use in a regular expression
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const processBacklinkItem = (text, title) => {
  text = text
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

  let normalizedTitle = title.normalize('NFC')
  let normalizedText = text.normalize('NFC')

  // Escape special characters in title
  let escapedTitle = escapeRegExp(normalizedTitle)

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

const Backlink = (props: Props) => {
  const { documentTitle } = props

  // normalize to 'NFC' to match the key of backlinks
  // See https://cho.sh/r/DF5A6E
  const documentTitleEncoded = documentTitle.normalize('NFC')
  const backlinkItems = backlinks[documentTitleEncoded]
  const title = documentTitleEncoded

  return (
    <div className={styles.backlinkTable}>
      <h2 className={styles.backlinkTableH2}>
        {translate({
          id: 'backlink.title',
          message: 'Links to This Note',
          description: 'The title of the backlink section',
        })}
      </h2>
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

export default Backlink
