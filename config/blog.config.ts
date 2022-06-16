const math = require('remark-math')
const katex = require('rehype-katex')

const blog = {
  showReadingTime: false,
  blogSidebarCount: 'ALL',
  remarkPlugins: [math],
  rehypePlugins: [katex],
}

export = blog
