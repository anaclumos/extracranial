import BlogSidebar from '@theme/BlogSidebar'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React from 'react'
import type { JSX } from 'react'

import type { Props } from '@theme/BlogLayout'
import styles from './styles.module.css'

export default function BlogLayout(props: Props) {
  const { sidebar, toc, children, ...layoutProps } = props
  const hasSidebar = sidebar && sidebar.items.length > 0

  return (
    <Layout {...layoutProps}>
      <div className={clsx(styles.blogLayout, 'margin-vert--lg')}>
        <div className='row'>
          <BlogSidebar sidebar={sidebar} />
          <main
            className={clsx('col', {
              'col--6': hasSidebar,
              'col--9 col--offset-1': !hasSidebar,
            })}
            itemScope
            itemType='http://schema.org/Blog'
          >
            {children}
          </main>
          {toc && <div className='col col--3'>{toc}</div>}
        </div>
      </div>
    </Layout>
  )
}
