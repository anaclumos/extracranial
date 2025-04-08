import type { Props } from '@theme/TOCItems/Tree'
import { type JSX, memo } from 'react'

// Recursive component rendering the toc tree
function TOCItemTree({
  toc,
  className,
  linkClassName,
  isChild,
}: Props): JSX.Element | null {
  if (!toc.length) {
    return null
  }
  return (
    <ul className={isChild ? undefined : className}>
      {toc.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={linkClassName ?? undefined}
            aria-label={heading.id}
          >
            {typeof heading.value === 'string' ? (
              <span className='toc-heading-text'>
                {heading.value.replace(/<[^>]*>/g, '')}
              </span>
            ) : (
              <span className='toc-heading-text'>{heading.value}</span>
            )}
          </a>
          <TOCItemTree
            isChild
            toc={heading.children}
            className={className}
            linkClassName={linkClassName}
          />
        </li>
      ))}
    </ul>
  )
}

// Memo only the tree root is enough
export default memo(TOCItemTree)
