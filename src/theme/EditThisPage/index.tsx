import Translate from '@docusaurus/Translate'
import type { Props } from '@theme/EditThisPage'
import type { JSX } from 'react'

export default function EditThisPage({ editUrl }: Props): JSX.Element {
  return (
    <a
      aria-label="Edit this page (opens in new tab)"
      className="mb-6"
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
      <span aria-hidden="true"> ↗</span>
    </a>
  )
}
