/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import clsx from 'clsx'
import DocCard from '@site/src/components/DocCard'
import type { Props } from '@theme/DocCardList'
import type { PropSidebarItem } from '@docusaurus/plugin-content-docs'

// Filter categories that don't have a link.
function filterItems(items: PropSidebarItem[]): PropSidebarItem[] {
  return items.filter((item) => {
    return true
  })
}

export default function DocCardList({ items, className }: Props): JSX.Element {
  return (
    <section className={clsx('row', className)}>
      {filterItems(items).map((item, index) => (
        <article key={index} className='col col--12 margin-bottom--lg'>
          <DocCard item={item} />
        </article>
      ))}
    </section>
  )
}
