import { cn } from '@site/src/util/cn'
import type { Props } from '@theme/TOC'
import TOCItems from '@theme/TOCItems'
import type { JSX } from 'react'

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight'
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active'

export default function TOC({ className, ...props }: Props): JSX.Element {
  return (
    <div
      className={cn(
        'thin-scrollbar',
        'sticky top-[calc(var(--ifm-navbar-height)+2rem)] hidden max-h-[calc(100vh-(var(--ifm-navbar-height)+4rem))] overflow-y-auto rounded-[var(--border-radius)] p-[var(--padding)] opacity-[var(--unhovered-transparency)] transition-opacity duration-200 ease-in-out hover:opacity-100 min-[997px]:block',
        className
      )}
    >
      <TOCItems
        {...props}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
        linkClassName={LINK_CLASS_NAME}
      />
    </div>
  )
}
