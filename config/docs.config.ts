const math = require('remark-math')
const katex = require('rehype-katex')

const docs = {
  sidebarPath: require.resolve('./sidebars.js'),
  routeBasePath: '/research-notes',
  breadcrumbs: true,
  sidebarCollapsed: false,
  sidebarCollapsible: true,
  remarkPlugins: [math],
  rehypePlugins: [katex],
}

export = docs
