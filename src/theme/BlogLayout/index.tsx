import { cn } from '@site/src/util/cn'
import type { Props } from '@theme/BlogLayout'
import BlogSidebar from '@theme/BlogSidebar'
import Layout from '@theme/Layout'
import styles from './styles.module.css'

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
      <div className={styles.blogLayout} style={{ margin: '2rem auto' }}>
        <div className="row">
          <BlogSidebar sidebar={sidebar} />
          <main
            className={mainColumnClassName}
            itemScope
            itemType="http://schema.org/Blog"
          >
            <div style={{ maxWidth: 'min(65ch, 100%)' }}>{children}</div>
          </main>
          {toc && <div className="col col--3">{toc}</div>}
        </div>
      </div>
    </Layout>
  )
}
