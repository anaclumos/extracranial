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
          'sticky top-[calc(var(--ifm-navbar-height)+2rem)] max-h-[calc(100vh-(var(--ifm-navbar-height)+4rem))] overflow-y-auto rounded-[var(--border-radius)] px-10 py-7 pr-7 text-end opacity-[var(--unhovered-transparency)] transition-opacity duration-200 ease-in-out hover:opacity-100 max-lg:hidden'
        )}
      >
        <div className={cn('mx-3 mb-4 font-bold text-xl')}>{sidebar.title}</div>
        <ul className={cn('clean-list', 'text-balance text-base')}>
          {sidebar.items.map((item) => (
            <Link
              activeClassName="!text-[var(--ifm-color-primary)] !grayscale-0"
              className="block text-[var(--ifm-font-color-base)] grayscale transition-[filter] duration-200 hover:text-[var(--ifm-font-color-base)] hover:no-underline hover:grayscale-0"
              isNavLink
              key={item.permalink}
              to={item.permalink}
            >
              <li className="rounded-[var(--border-radius)] p-2 transition-[filter,background-color] duration-200 hover:bg-[var(--ifm-menu-color-background-active)] hover:grayscale-0">
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
