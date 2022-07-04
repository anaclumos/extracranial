import i18n = require('./config/i18n.config')
import docs = require('./config/docs.config')
import blog = require('./config/blog.config')
import theme = require('./config/theme.config')
import katexStylesheet = require('./config/katex.stylesheet')
import navbar = require('./config/navbar.config')

import type { Config } from '@docusaurus/types'
import analytics = require('./config/ga.config')

const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const config: Config = {
  title: 'cho.sh',
  tagline: 'I am Sunghyun Cho, traveling the WWW.',
  url: 'https://cho.sh',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'anaclumos',
  projectName: 'www',
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
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    navbar: navbar,
    prism: {
      theme: darkCodeTheme,
      darkTheme: darkCodeTheme,
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },
  },
  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: ['appInstalled', 'queryString', 'standalone'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/favicon.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json', // your PWA manifest
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/favicon.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: '/img/favicon.png',
            color: '#5597ec',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: '/img/favicon.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#5597ec',
          },
        ],
      },
    ],
  ],
}

export = config
