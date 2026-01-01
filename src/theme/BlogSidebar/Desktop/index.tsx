import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import { cn } from '@site/src/util/cn'
import type { Props } from '@theme/BlogSidebar/Desktop'

import styles from './styles.module.css'

export default function BlogSidebarDesktop({ sidebar }: Props) {
  return (
    <aside className="col col--3">
      <nav
        aria-label={translate({
          id: 'theme.blog.sidebar.navAriaLabel',
          message: 'Blog Articles navigation',
          description: 'The ARIA label for Articles in the blog sidebar',
        })}
        className={cn(styles.sidebar, 'thin-scrollbar')}
      >
        <div className={cn(styles.sidebarItemTitle, 'margin-bottom--md')}>
          {sidebar.title}
        </div>
        <ul className={cn(styles.sidebarItemList, 'clean-list')}>
          {sidebar.items.map((item) => (
            <Link
              activeClassName={styles.sidebarItemLinkActive}
              className={styles.sidebarItemLink}
              isNavLink
              key={item.permalink}
              to={item.permalink}
            >
              <li className={cn(styles.sidebarItem)}>{item.title}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
