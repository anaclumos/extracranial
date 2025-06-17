import type { Config } from '@docusaurus/types'
import blog from './config/blog.config'
import docs from './config/docs.config'
import i18n from './config/i18n.config'
import navbar from './config/navbar.config'
import theme from './config/theme.config'

const SITE_URL = 'https://cho.sh'
const CDN_BASE = 'https://cdn.jsdelivr.net'

const config: Config = {
  title: 'cho.sh',
  tagline: 'I travel the WWW.',
  titleDelimiter: '@',
  url: SITE_URL,
  baseUrl: '/',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',
  onDuplicateRoutes: 'warn',
  trailingSlash: false,
  favicon: 'img/favicon.svg',

  organizationName: 'anaclumos',
  projectName: 'extracranial',

  i18n,
  baseUrlIssueBanner: false,

  // future: {
  // v4: true,
  // experimental_faster: true,
  // },

  markdown: {
    format: 'mdx',
    mermaid: true,
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
    remarkRehypeOptions: {
      footnoteLabel: 'Footnotes',
    },
    anchors: {
      maintainCase: true,
    },
  },

  presets: [
    [
      'classic',
      {
        docs,
        blog,
        theme,
      },
    ],
  ],

  plugins: [
    [
      'vercel-analytics',
      {
        mode: 'auto',
      },
    ],
  ],

  stylesheets: [
    {
      href: `${CDN_BASE}/npm/katex@latest/dist/katex.min.css`,
      type: 'text/css',
      rel: 'stylesheet',
      crossorigin: 'anonymous',
      as: 'style',
    },
  ],

  themeConfig: {
    algolia: {
      appId: 'YYIGMBHSI6',
      apiKey: '4f28c78c43e91f6f922d20140434977f',
      indexName: 'cho',
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: 'search',
      debug: false,
    },

    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar,

    prism: {
      additionalLanguages: ['java', 'swift', 'diff', 'docker'],
    },

    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 6,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },

    mermaid: {
      options: {
        fontFamily: 'var(--font-family-monospace)',
        themeVariables: {
          darkMode: true,
        },
      },
    },
  },

  themes: ['@docusaurus/theme-mermaid'],
}

export default config
