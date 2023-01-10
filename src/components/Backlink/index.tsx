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

  const backlinkItems = backlinks[documentTitle]

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
            // sort by filename, reversed
            .sort()
            .reverse()
            .map((backlink) => {
              const backlinkTitle = backlink.split('/').pop().replace('.md', '')
              return (
                <Link to={filenames[backlinkTitle]} className={styles.backlinkItemLink} key={backlink}>
                  <div className={styles.backlinkItem}>
                    <h3 className={styles.backlinkMentionedFileName}>{backlinkTitle}</h3>
                    {processBacklinkItem(backlinkItems[backlink], documentTitle)}
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
