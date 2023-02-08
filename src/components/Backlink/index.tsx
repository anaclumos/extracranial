import React from 'react'
import Link from '@docusaurus/Link'
import styles from './styles.module.css'

import { backlinks } from '@site/src/data/backlinks'
import { filenames } from '@site/src/data/filenames'
import { translate } from '@docusaurus/Translate'

type Props = {
  documentTitle: string
}

const processBacklinkItem = (text: string, title: string) => {
  // replace title with <b>title</b>
  let splittedText = text
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .split(title)
  splittedText = splittedText.map((item, index) => {
    if (index === splittedText.length - 1) {
      return item
    }
    return (
      item +
      `<b class="${styles.highlight}">${title
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')}</b>`
    )
  })
  return (
    <pre
      className={styles.backlinkItemText}
      dangerouslySetInnerHTML={{
        __html: splittedText.join(''),
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
              let backlinkTitle = backlink.normalize('NFC')
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
