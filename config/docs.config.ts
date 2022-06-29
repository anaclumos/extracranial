const math = require('remark-math')
const katex = require('rehype-katex')

const sidebarProcessor = (items) => {
  const result = items.map((item) => {
    if (item.type === 'category') {
      // set collapsible and collapsed to true
      item.collapsible = true
      item.collapsed = true
      // if label is 'Journals', reverse the order of items
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
  sidebarPath: require.resolve('./sidebars.js'),
  routeBasePath: '/research',
  breadcrumbs: true,
  sidebarCollapsed: false,
  sidebarCollapsible: true,
  remarkPlugins: [math],
  rehypePlugins: [katex],
  async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
    const sidebarItems = await defaultSidebarItemsGenerator(args)
    return sidebarProcessor(sidebarItems)
  },
}

export = docs
