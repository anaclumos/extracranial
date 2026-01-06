import type { Props } from '@theme/TOCItems/Tree'
import { type JSX, memo } from 'react'

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
            className={linkClassName ?? undefined}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for rendering TOC heading HTML
            dangerouslySetInnerHTML={{
              __html: heading.value,
            }}
            href={`#${heading.id}`}
          />
          <TOCItemTree
            className={className}
            isChild
            linkClassName={linkClassName}
            toc={heading.children}
          />
        </li>
      ))}
    </ul>
  )
}

export default memo(TOCItemTree)
