import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import { cn } from '@site/src/util/cn'
import type { Props } from '@theme/BlogSidebar/Desktop'

export default function BlogSidebarDesktop({ sidebar }: Props) {
  return (
    <aside className="col col--3">
      <nav
        aria-label={translate({
          id: 'theme.blog.sidebar.navAriaLabel',
          message: 'Blog Articles navigation',
          description: 'The ARIA label for Articles in the blog sidebar',
        })}
        className={cn(
          'thin-scrollbar',
          'sticky-sidebar rounded-theme px-10 py-7 pr-7 text-end opacity-10 transition-opacity duration-200 hover:opacity-100 max-lg:hidden'
        )}
      >
        <div className={cn('mx-3 mb-4 font-bold text-xl')}>{sidebar.title}</div>
        <ul className={cn('clean-list', 'text-balance text-base')}>
          {sidebar.items.map((item) => (
            <Link
              activeClassName="!text-primary !grayscale-0"
              className="block text-base-color grayscale transition-[filter] duration-200 hover:text-base-color hover:no-underline hover:grayscale-0"
              isNavLink
              key={item.permalink}
              to={item.permalink}
            >
              <li className="rounded-theme p-2 transition-[filter,background-color] duration-200 hover:bg-menu-active hover:grayscale-0">
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
