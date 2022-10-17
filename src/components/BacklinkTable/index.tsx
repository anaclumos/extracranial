import React from 'react'
import Link from '@docusaurus/Link'
import styles from './styles.module.css'

import { backlinks } from './backlinks'
import { filenames } from './filenames'
import { translate } from '@docusaurus/Translate'
// @ts-ignore
import { useDoc } from '@docusaurus/theme-common/internal'

type Props = {
  documentTitle: string
}

const processBacklinkItem = (text: string) => {
  let splittedText = text
    .trim()
    .replace(
      /(\*\*|__)(.*?)\1/g,
      `<b class=${styles.mentionedString}>$2</b>`
    )
    .replace('\n', '')
  return (
    <pre
      className={styles.backlinkItemText}
      dangerouslySetInnerHTML={{ __html: splittedText }}
    />
  )
}

const Backlink = (props: Props) => {
  const { documentTitle } = props
  const { frontMatter } = useDoc()
  const { aliases } = frontMatter

  const backlinkItems =
    backlinks[documentTitle.toLowerCase()]
  if (aliases)
    for (const alias of aliases) {
      if (backlinks[alias]) {
        backlinkItems.push(...backlinks[alias])
      }
    }

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
        {(backlinkItems &&
          Object.keys(backlinkItems).map((backlink) => {
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
                    backlinkItems[backlink]
                  )}
                </div>
              </Link>
            )
          })) || (
          <p className={styles.noBacklink}>
            {translate({
              id: 'backlink.noBacklink',
              message: 'Nothing here yet...',
              description:
                'The message when there is no backlink',
            })}
          </p>
        )}
      </div>
    </div>
  )
}

export default Backlink
