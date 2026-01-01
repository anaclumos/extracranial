import type { Options as PresetClassicOptions } from '@docusaurus/preset-classic'
import latex from './latex.config'

interface EditUrlParams {
  locale: string
  blogPath: string
}

const blog = {
  showReadingTime: false,
  blogTitle: 'cho.sh',
  blogDescription: 'I travel the WWW.',
  postsPerPage: 'ALL',
  blogSidebarCount: 'ALL',
  blogSidebarTitle: 'Articles',
  routeBasePath: '/w',
  remarkPlugins: [latex.math],
  rehypePlugins: [latex.katex],
  authorsMapPath: 'authors.yml',
  editUrl: ({ locale, blogPath }: EditUrlParams) => {
    return `https://github.com/anaclumos/extracranial/tree/main/posts/${blogPath.replace('/index.md', '')}/${locale}.md`
  },
} satisfies PresetClassicOptions['blog']

export default blog
