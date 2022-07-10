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
  editUrl: ({ locale, blogDirPath, blogPath }) => {
    return `https://github.com/anaclumos/www/tree/main/posts/${blogPath.replace('/index.md', '')}/${locale}.md`
  },
}

export = blog
