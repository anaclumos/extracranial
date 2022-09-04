const math = require('remark-math')
const katex = require('rehype-katex')

const blog = {
  showReadingTime: false,
  blogTitle: 'Sunghyun Cho',
  blogDescription: 'I am Sunghyun Cho, traveling the WWW.',
  postsPerPage: 10,
  blogSidebarCount: 10,
  blogSidebarTitle: 'Recent Posts',
  remarkPlugins: [math],
  rehypePlugins: [katex],
  authorsMapPath: 'authors.yml',
  editUrl: ({ locale, blogDirPath, blogPath }) => {
    return `https://github.com/anaclumos/www/tree/main/posts/${blogPath.replace(
      '/index.md',
      ''
    )}/${locale}.md`
  },
}

export = blog
