import Link from '@docusaurus/Link'
import { NavbarSecondaryMenuFiller } from '@docusaurus/theme-common'
import type { Props } from '@theme/BlogSidebar/Mobile'
import React from 'react'
import type { JSX } from 'react'
import Balancer from 'react-wrap-balancer'

function BlogSidebarMobileSecondaryMenu({ sidebar }: Props) {
  return (
    <ul className='menu__list'>
      {sidebar.items.map((item) => (
        <li key={item.permalink} className='menu__list-item'>
          <Link
            isNavLink
            to={item.permalink}
            className='menu__link'
            activeClassName='menu__link--active'
          >
            <Balancer>{item.title}</Balancer>
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
