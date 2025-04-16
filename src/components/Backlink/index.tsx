import Link from '@docusaurus/Link'
import React from 'react'
import type { JSX } from 'react'
import styles from './styles.module.css'

import { translate } from '@docusaurus/Translate'
import { backlinks } from '@site/src/data/backlinks'
import { filenames } from '@site/src/data/filenames'

type Props = {
  documentTitle: string
}

const escapeRegExp = (string) => {
  // Escapes special characters for use in a regular expression
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const processBacklinkItem = (inputText: string, title: string) => {
  // Use a local variable instead of reassigning the parameter
  const cleanText = inputText.trim()
  // We don't need to HTML escape since we're not using dangerouslySetInnerHTML

  const normalizedTitle = title.normalize('NFC')
  let processedText = cleanText.normalize('NFC')

  // Escape special characters in title for regex
  const escapedTitle = escapeRegExp(normalizedTitle)

  try {
    // Replace [[other text|display]] with display. other can include spaces
    processedText = processedText.replace(/\[\[(.+?)\|(.+?)\]\]/g, '$2')

    // Replace [[other]] with other
    processedText = processedText.replace(/\[\[(.+?)\]\]/g, '$1')

    // Split the text by title matches to properly highlight them
    const titleRegex = new RegExp(`(${escapedTitle})`, 'gi')
    const parts = processedText.split(titleRegex)

    if (parts.length <= 1) {
      // No matches, just return the text
      return (
        <pre className={styles.backlinkItemText}>{processedText.trim()}</pre>
      )
    }

    // Create React elements for each part
    const elements = parts.map((part, index) => {
      // Skip empty parts
      if (!part) return null

      // Create a unique key that doesn't depend solely on array index
      const uniqueKey = `${title.substring(0, 3)}-${index}-${part.substring(0, 3)}`

      // If this part matches the title, highlight it
      if (part.toLowerCase() === normalizedTitle.toLowerCase()) {
        return (
          <b key={uniqueKey} className={styles.highlight}>
            {part}
          </b>
        )
      }

      // Otherwise just render as regular text
      return <span key={uniqueKey}>{part}</span>
    })

    return <pre className={styles.backlinkItemText}>{elements}</pre>
  } catch (e) {
    console.error('Error processing backlink item:', e)
    return <pre className={styles.backlinkItemText}>{cleanText.trim()}</pre>
  }
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
                <Link
                  to={link}
                  className={styles.backlinkItemLink}
                  key={backlink}
                >
                  <div className={styles.backlinkItem}>
                    <h3 className={styles.backlinkMentionedFileName}>
                      {backlinkTitle}
                    </h3>
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
