import { cn } from '@site/src/util/cn'
import type { Props } from '@theme/BlogLayout'
import BlogSidebar from '@theme/BlogSidebar'
import Layout from '@theme/Layout'

export default function BlogLayout(props: Props) {
  const { sidebar, toc, children, ...layoutProps } = props
  const hasSidebar = sidebar && sidebar.items.length > 0
  const hasToc = Boolean(toc)
  const mainColumnClassName = cn('col', {
    'col--6': hasSidebar && hasToc,
    'col--9': hasSidebar && !hasToc,
    'col--8 col--offset-1': !hasSidebar && hasToc,
    'col--9 col--offset-1': !(hasSidebar || hasToc),
  })

  return (
    <Layout {...layoutProps}>
      <div className="mx-auto my-8 max-w-screen-2xl px-4">
        <div className="row">
          <BlogSidebar sidebar={sidebar} />
          <main
            className={mainColumnClassName}
            itemScope
            itemType="http://schema.org/Blog"
          >
            <div className="max-w-prose">{children}</div>
          </main>
          {toc && <div className="col col--3">{toc}</div>}
        </div>
      </div>
    </Layout>
  )
}
