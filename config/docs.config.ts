const math = require('remark-math')
const katex = require('rehype-katex')

const sidebarDivider = {
  type: 'html',
  value: '<hr id="divider" />',
}

const sidebarProcessor = (items) => {
  const preferredOrder = ['Hey', 'Journals', 'Projects', 'Interests', 'Readings', 'Archive']
  const orderedItems = []
  preferredOrder.forEach((item) => {
    const itemToAdd = items.find((i) => i.label === item || i.id === item)
    if (itemToAdd) {
      orderedItems.push(itemToAdd)
    }
    if (item === 'Journals') {
      orderedItems.push(sidebarDivider)
    }
  })
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
  sidebarPath: require.resolve('./sidebars.js'),
  routeBasePath: '/research',
  breadcrumbs: true,
  sidebarCollapsed: true,
  sidebarCollapsible: true,
  showLastUpdateAuthor: false,
  showLastUpdateTime: false,
  editUrl: 'https://github.com/anaclumos/www/tree/main/',
  remarkPlugins: [math],
  rehypePlugins: [katex],
  async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
    const sidebarItems = await defaultSidebarItemsGenerator(args)
    return sidebarProcessor(sidebarItems)
  },
}

export = docs
