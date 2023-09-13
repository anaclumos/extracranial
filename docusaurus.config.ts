import type { Config } from '@docusaurus/types'
import i18n from './config/i18n.config'
import docs from './config/docs.config'
import blog from './config/blog.config'
import theme from './config/theme.config'
import katexStylesheet from './config/katex.stylesheet'
import navbar from './config/navbar.config'
import analytics from './config/ga.config'
import darkCodeTheme from 'prism-react-renderer/themes/dracula'

const config: Config = {
  title: 'Sunghyun Cho',
  tagline: 'I am Sunghyun Cho, traveling the WWW.',
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
        gtag: analytics.ga4,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          if (existingPath.includes('/blog') || existingPath.includes('/research')) {
            return [existingPath.replace('/blog/', '/w/'), existingPath.replace('/research/', '/r/')]
          }
          return undefined
        },
      },
    ],
  ],
  stylesheets: [katexStylesheet],
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
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    navbar: navbar,
    prism: {
      theme: darkCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['java', 'swift'],
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
    {
      src: 'https://static.cloudflareinsights.com/beacon.min.js',
      defer: true,
      async: true,
      'data-cf-beacon': '{"token": "53278117b8c44edeb9eeb9af447d5529"}',
    },
    {
      src: 'https://platform.twitter.com/widgets.js',
      async: true,
      defer: true,
    },
  ],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
}

module.exports = config
