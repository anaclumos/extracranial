import React, { JSX } from 'react'
import { cn } from '@site/src/util/cn'
import Layout from '@theme/Layout'
import BlogSidebar from '@theme/BlogSidebar'

import type { Props } from '@theme/BlogLayout'
import styles from './styles.module.css'

export default function BlogLayout(props: Props): JSX.Element {
  const { sidebar, toc, children, ...layoutProps } = props
  const hasSidebar = sidebar && sidebar.items.length > 0

  return (
    <Layout {...layoutProps}>
      <div className={cn(styles.blogLayout, 'margin-vert--lg')}>
        <div className="row">
          <BlogSidebar sidebar={sidebar} />
          <main
            className={cn('col', {
              'col--6': hasSidebar,
              'col--9 col--offset-1': !hasSidebar,
            })}
            itemScope
            itemType="http://schema.org/Blog"
          >
            {children}
          </main>
          {toc && <div className="col col--3">{toc}</div>}
        </div>
      </div>
    </Layout>
  )
}
