import Translate from '@docusaurus/Translate'
import type { Props } from '@theme/EditThisPage'
import clsx from 'clsx'
import React from 'react'
import type { JSX } from 'react'
import styles from './styles.module.css'

export default function EditThisPage({ editUrl }: Props) {
  return (
    <a
      href={editUrl}
      target='_blank'
      rel='noreferrer noopener'
      className={clsx(
        'ThemeClassNames.common.editThisPage',
        styles.editThisPage,
      )}
    >
      <Translate
        id='theme.common.editThisPage'
        description='The link label to edit the current page'
      >
        Edit this page
      </Translate>
    </a>
  )
}
