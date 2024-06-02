import type { Config } from '@docusaurus/types'
import blog from './config/blog.config'
import docs from './config/docs.config'
import i18n from './config/i18n.config'
import navbar from './config/navbar.config'
import theme from './config/theme.config'

const config: Config = {
  title: 'Sunghyun "Siwoo" Cho',
  tagline: 'I am Sunghyun "Siwoo" Cho, traveling the WWW.',
  titleDelimiter: '@',
  url: 'https://cho.sh',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  trailingSlash: false,
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'anaclumos',
  projectName: 'extracranial',
  i18n: i18n,
  baseUrlIssueBanner: false,
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('swc-loader'),
      options: {
        jsc: {
          parser: {
            sync: true,
            syntax: 'typescript',
            tsx: true,
          },
          target: 'es2017',
        },
        module: {
          type: isServer ? 'commonjs' : 'es6',
        },
      },
    }),
  },
  presets: [
    [
      'classic',
      {
        docs: docs,
        blog: blog,
        theme: theme,
        gtag: {
          trackingID: 'G-7GMRW82QVZ',
          anonymizeIP: true,
        },
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          if (existingPath.includes('/blog') || existingPath.includes('/research')) {
            return [existingPath.replace('/blog/', '/w/'), existingPath.replace('/research/', '/r/')]
          }
          if (existingPath === '/r') {
            return ['/r/000000']
          }
          return undefined
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css',
      type: 'text/css',
      rel: 'stylesheet',
    },
    {
      href: 'https://cdn.jsdelivr.net/gh/toss/tossface/dist/tossface.css',
      type: 'text/css',
      rel: 'stylesheet',
    },
    {
      href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
      type: 'text/css',
      rel: 'stylesheet',
      as: 'style',
      crossorigin: true,
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
    navbar: navbar,
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
      },
    },
  },
  scripts: [
    {
      src: 'https://sa.cho.sh/latest.js',
      async: true,
      defer: true,
      'data-collect-dnt': 'true',
    },
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        'http-equiv': 'Permissions-Policy',
        content: 'interest-cohort=()',
      },
    },
    {
      tagName: 'noscript',
      attributes: {},
      innerHTML:
        '<img src="https://sa.cho.sh/noscript.gif" alt="SA" collect-dnt=true referrerPolicy="no-referrer-when-downgrade" />',
    },
  ],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
}

module.exports = config
