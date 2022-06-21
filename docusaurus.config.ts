import i18n = require('./config/i18n.config')
import docs = require('./config/docs.config')
import blog = require('./config/blog.config')
import theme = require('./config/theme.config')
import katexStylesheet = require('./config/katex.stylesheet')
import navbar = require('./config/navbar.config')

import type { Config } from '@docusaurus/types'
import ga = require('./config/ga.config')

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
        googleAnalytics: ga,
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
}

export = config
