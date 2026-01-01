import Translate from '@docusaurus/Translate'
import { cn } from '@site/src/util/cn'
import type { Props } from '@theme/EditThisPage'
import type { JSX } from 'react'
import styles from './styles.module.css'

export default function EditThisPage({ editUrl }: Props): JSX.Element {
  return (
    <a
      className={cn('ThemeClassNames.common.editThisPage', styles.editThisPage)}
      href={editUrl}
      rel="noreferrer noopener"
      target="_blank"
    >
      <Translate
        description="The link label to edit the current page"
        id="theme.common.editThisPage"
      >
        Edit this page
      </Translate>
    </a>
  )
}
