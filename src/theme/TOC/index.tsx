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
        'sticky-sidebar hidden rounded-theme p-theme opacity-10 transition-opacity duration-200 hover:opacity-100 min-[997px]:block',
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
