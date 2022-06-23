const math = require('remark-math')
const katex = require('rehype-katex')

const blog = {
  showReadingTime: false,
  blogSidebarCount: 10,
  blogSidebarTitle: 'Updates',
  remarkPlugins: [math],
  rehypePlugins: [katex],
}

export = blog
