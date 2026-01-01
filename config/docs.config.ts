import type { Options as PresetClassicOptions } from '@docusaurus/preset-classic'
import latex from './latex.config'

// Using any[] since Docusaurus sidebar types are complex and internal
// biome-ignore lint/suspicious/noExplicitAny: Docusaurus sidebar types are complex and internal
type SidebarItems = any[]

const sidebarProcessor = (items: SidebarItems): SidebarItems => {
  const preferredOrder = ['Welcome', 'Journals', 'Memex']
  const orderedItems: SidebarItems = []

  for (const item of preferredOrder) {
    const itemToAdd = items.find((i) => i.label === item || i.id === item)
    if (itemToAdd) {
      orderedItems.push(itemToAdd)
    }
  }

  const result = orderedItems.map((item) => {
    if (item.type === 'category') {
      item.collapsible = true
      item.collapsed = true
      if (item.label === 'Journals') {
        item.items = item.items?.sort().reverse()
      } else {
        item.items = item.items?.sort(() => Math.random() - 0.5)
      }
    }
    return item
  })

  return result
}

const docs: PresetClassicOptions['docs'] = {
  path: 'docs',
  routeBasePath: '/r',
  exclude: ['**/templates/**'],
  breadcrumbs: false,
  sidebarCollapsed: true,
  sidebarCollapsible: true,
  showLastUpdateAuthor: false,
  showLastUpdateTime: false,
  editUrl: ({ docPath }) => {
    return `https://github.com/anaclumos/extracranial/tree/main/Research/${docPath}`
  },
  remarkPlugins: [latex.math],
  rehypePlugins: [latex.katex],
  async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
    const sidebarItems = await defaultSidebarItemsGenerator(args)
    return sidebarProcessor(sidebarItems)
  },
}

export default docs
