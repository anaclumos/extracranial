import Link from '@docusaurus/Link'
import { NavbarSecondaryMenuFiller } from '@docusaurus/theme-common'
import type { Props } from '@theme/BlogSidebar/Mobile'

function BlogSidebarMobileSecondaryMenu({ sidebar }: Props) {
  return (
    <ul className="menu__list">
      {sidebar.items.map((item) => (
        <li className="menu__list-item" key={item.permalink}>
          <Link
            activeClassName="menu__link--active"
            className="menu__link"
            isNavLink
            style={{ textWrap: 'balance' }}
            to={item.permalink}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function BlogSidebarMobile(props: Props) {
  return (
    <NavbarSecondaryMenuFiller
      component={BlogSidebarMobileSecondaryMenu}
      props={props}
    />
  )
}
