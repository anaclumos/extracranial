import { useDoc } from '@docusaurus/plugin-content-docs/client'
import { useWindowSize } from '@docusaurus/theme-common'
import Backlink from '@site/src/components/backlink'
import { ErrorBoundary } from '@site/src/components/error-boundary'
import { cn } from '@site/src/util/cn'
import DocBreadcrumbs from '@theme/DocBreadcrumbs'
import DocItemContent from '@theme/DocItem/Content'
import DocItemFooter from '@theme/DocItem/Footer'
import type { Props } from '@theme/DocItem/Layout'
import DocItemPaginator from '@theme/DocItem/Paginator'
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop'
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile'
import DocVersionBadge from '@theme/DocVersionBadge'
import DocVersionBanner from '@theme/DocVersionBanner'

function useDocTOC() {
  const { frontMatter, toc } = useDoc()
  const windowSize = useWindowSize()

  const hidden = frontMatter.hide_table_of_contents
  const canRender = !hidden && toc.length > 0

  const mobile = canRender ? <DocItemTOCMobile /> : undefined

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined

  return {
    hidden,
    mobile,
    desktop,
  }
}

export default function DocItemLayout({ children }: Props) {
  const title = useDoc().metadata.title
  const docTOC = useDocTOC()
  return (
    <div className="row">
      <div className={cn('col', !docTOC.hidden && 'min-[997px]:max-w-[75%]')}>
        <DocVersionBanner />
        <div className="max-w-prose max-[996px]:px-1 [&_article>*:first-child]:mt-0 [&_header+*]:mt-0">
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
          <ErrorBoundary>
            <Backlink documentTitle={title} />
          </ErrorBoundary>
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  )
}
