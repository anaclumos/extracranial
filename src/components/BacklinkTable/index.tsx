import React from 'react'
import Link from '@docusaurus/Link'
import styles from './styles.module.css'

import { backlinks } from './backlinks'
import { filenames } from './filenames'
import { translate } from '@docusaurus/Translate'

type Props = {
  documentTitle: string
}

const processBacklinkItem = (text: string) => {
  let splittedText =
    '... ' +
    text
      .replace(
        /(\*\*|__)(.*?)\1/g,
        `<b class=${styles.mentionedString}>$2</b>`
      )
      .replace('\n', '') +
    ' ...'
  return (
    <pre
      className={styles.backlinkItemText}
      dangerouslySetInnerHTML={{ __html: splittedText }}
    />
  )
}

const Backlink = (props: Props) => {
  const { documentTitle } = props

  return (
    <div className={styles.backlink}>
      <h2 className={styles.backlinkTitle}>
        {translate({
          id: 'backlink.title',
          message: 'Links to This Note',
          description: 'The title of the backlink section',
        })}
      </h2>
      <div className={styles.backlinkList}>
        {(backlinks[documentTitle] &&
          Object.keys(backlinks[documentTitle]).map(
            (backlink) => {
              const backlinkTitle = backlink
                .split('/')
                .pop()
                .replace('.md', '')
              return (
                <Link
                  to={filenames[backlinkTitle]}
                  className={styles.backlinkItemLink}
                >
                  <div className={styles.backlinkItem}>
                    <h3 className={styles.mentioner}>
                      {backlinkTitle}
                    </h3>
                    {processBacklinkItem(
                      backlinks[documentTitle][backlink]
                    )}
                  </div>
                </Link>
              )
            }
          )) || <p>No links to this note</p>}
      </div>
    </div>
  )
}

export default Backlink
