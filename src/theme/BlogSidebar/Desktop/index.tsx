import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import type { Props } from '@theme/BlogSidebar/Desktop'
import Balancer from 'react-wrap-balancer'

import styles from './styles.module.css'

export default function BlogSidebarDesktop({ sidebar }: Props): JSX.Element {
  return (
    <aside className="col col--3">
      <nav
        className={clsx(styles.sidebar, 'thin-scrollbar')}
        aria-label={translate({
          id: 'theme.blog.sidebar.navAriaLabel',
          message: 'Blog Articles navigation',
          description: 'The ARIA label for Articles in the blog sidebar',
        })}
      >
        <div className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>{sidebar.title}</div>
        <ul className={clsx(styles.sidebarItemList, 'clean-list')}>
          {sidebar.items.map((item) => (
            <Link
              isNavLink
              to={item.permalink}
              className={styles.sidebarItemLink}
              activeClassName={styles.sidebarItemLinkActive}
            >
              <li key={item.permalink} className={styles.sidebarItem}>
                <Balancer>{item.title}</Balancer>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
