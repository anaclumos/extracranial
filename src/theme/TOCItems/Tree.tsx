import React, { JSX, memo } from 'react'
import type { Props } from '@theme/TOCItems/Tree'

// Recursive component rendering the toc tree
function TOCItemTree({ toc, className, linkClassName, isChild }: Props): JSX.Element | null {
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
            dangerouslySetInnerHTML={{
              __html: heading.value,
            }}
          />
          <TOCItemTree isChild toc={heading.children} className={className} linkClassName={linkClassName} />
        </li>
      ))}
    </ul>
  )
}

// Memo only the tree root is enough
export default memo(TOCItemTree)
