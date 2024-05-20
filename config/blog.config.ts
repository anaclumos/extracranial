import latex from './latex.config'

const blog = {
  showReadingTime: false,
  blogTitle: 'Sunghyun "Siwoo" Cho',
  blogDescription: 'I am Sunghyun "Siwoo" Cho, traveling the WWW.',
  postsPerPage: 'ALL',
  blogSidebarCount: 'ALL',
  blogSidebarTitle: 'Articles',
  routeBasePath: '/w',
  remarkPlugins: [latex.math],
  rehypePlugins: [latex.katex],
  authorsMapPath: 'authors.yml',
  editUrl: ({ locale, blogPath }) => {
    return `https://github.com/anaclumos/extracranial/tree/main/posts/${blogPath.replace('/index.md', '')}/${locale}.md`
  },
}

export default blog
