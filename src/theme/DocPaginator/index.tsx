import Translate, { translate } from '@docusaurus/Translate'
import { cn } from '@site/src/util/cn'
import type { Props } from '@theme/DocPaginator'
import PaginatorNavLink from '@theme/PaginatorNavLink'
import type { JSX } from 'react'
import styles from './styles.module.css'

export default function DocPaginator(props: Props): JSX.Element {
  const { previous, next } = props
  return (
    <nav
      aria-label={translate({
        id: 'theme.docs.paginator.navAriaLabel',
        message: 'Docs pages navigation',
        description: 'The ARIA label for the docs pagination',
      })}
      className={cn('pagination-nav', styles.docPaginator)}
    >
      {previous && (
        <PaginatorNavLink
          {...previous}
          subLabel={
            <Translate
              description="The label used to navigate to the previous doc"
              id="theme.docs.paginator.previous"
            >
              Previous
            </Translate>
          }
        />
      )}
      {next && (
        <PaginatorNavLink
          {...next}
          isNext
          subLabel={
            <Translate
              description="The label used to navigate to the next doc"
              id="theme.docs.paginator.next"
            >
              Next
            </Translate>
          }
        />
      )}
    </nav>
  )
}
