const math = require('remark-math')
const katex = require('rehype-katex')

const blog = {
  showReadingTime: false,
  blogTitle: 'cho.sh',
  blogDescription: 'I am Sunghyun Cho, traveling the WWW.',
  postsPerPage: 'ALL',
  blogSidebarCount: 10,
  blogSidebarTitle: 'Updates',
  remarkPlugins: [math],
  rehypePlugins: [katex],
}

export = blog
