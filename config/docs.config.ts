import latex from './latex.config'

const sidebarProcessor = (items) => {
  const preferredOrder = ['Welcome', 'Journals', 'Memex']
  const orderedItems = []
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
        item.items = item.items.sort().reverse()
      } else {
        item.items = item.items.sort(() => Math.random() - 0.5)
      }
    }
    return item
  })
  return result
}
const docs = {
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
