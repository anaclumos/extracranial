import type { Config } from '@docusaurus/types'
import i18n = require('./config/i18n.config')
import docs = require('./config/docs.config')
import blog = require('./config/blog.config')
import theme = require('./config/theme.config')
import katexStylesheet = require('./config/katex.stylesheet')
import navbar = require('./config/navbar.config')
import pwaOptions = require('./config/pwa.config')
import analytics = require('./config/ga.config')

const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const config: Config = {
  title: 'Sunghyun Cho',
  tagline: 'I am Sunghyun Cho, traveling the WWW.',
  url: 'https://cho.sh',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'anaclumos',
  projectName: 'extracranial',
  i18n: i18n,
  presets: [
    [
      'classic',
      {
        docs: docs,
        blog: blog,
        theme: theme,
        googleAnalytics: analytics.ua,
        gtag: analytics.ga4,
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
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    navbar: navbar,
    prism: {
      theme: darkCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['java'],
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },
  },
  scripts: [
    {
      src: 'https://scripts.simpleanalyticscdn.com/latest.js',
      async: true,
      defer: true,
    },
  ],
  plugins: [['@docusaurus/plugin-pwa', pwaOptions]],
}

export = config
