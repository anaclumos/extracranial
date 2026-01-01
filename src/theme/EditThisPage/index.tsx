import React, { JSX } from 'react'
import Translate from '@docusaurus/Translate'
import type { Props } from '@theme/EditThisPage'
import { cn } from '@site/src/util/cn'
import styles from './styles.module.css'

export default function EditThisPage({ editUrl }: Props): JSX.Element {
  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={cn('ThemeClassNames.common.editThisPage', styles.editThisPage)}
    >
      <Translate id="theme.common.editThisPage" description="The link label to edit the current page">
        Edit this page
      </Translate>
    </a>
  )
}
