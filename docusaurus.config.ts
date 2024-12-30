import type { Config } from '@docusaurus/types'
import blog from './config/blog.config'
import docs from './config/docs.config'
import i18n from './config/i18n.config'
import navbar from './config/navbar.config'
import theme from './config/theme.config'

// Site metadata constants
const SITE_URL = 'https://cho.sh'
const CDN_BASE = 'https://cdn.jsdelivr.net'

// Create async config to allow for dynamic content
const config: Config = {
  title: 'cho.sh',
  tagline: 'I travel the WWW.',
  titleDelimiter: '@',
  url: SITE_URL,
  baseUrl: '/',

  // File handling configurations
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',
  onDuplicateRoutes: 'warn',
  trailingSlash: false,
  favicon: 'img/favicon.svg',

  // Repository info
  organizationName: 'anaclumos',
  projectName: 'extracranial',

  // Internationalization
  i18n,
  baseUrlIssueBanner: false,

  // Performance optimizations
  future: {
    experimental_faster: true,
  },

  // Markdown configuration
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

  // Main presets configuration
  presets: [
    [
      'classic',
      {
        docs,
        blog,
        theme,
        gtag: {
          trackingID: 'G-7GMRW82QVZ',
          anonymizeIP: true,
        },
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects: (existingPath: string): string[] | undefined => {
          // Handle blog and research redirects
          if (existingPath.includes('/blog') || existingPath.includes('/research')) {
            return [existingPath.replace('/blog/', '/w/'), existingPath.replace('/research/', '/r/')]
          }

          // Handle /r redirects
          if (existingPath.endsWith('/r') || existingPath.endsWith('/r/')) {
            return ['/r/000000']
          }

          return undefined
        },
      },
    ],
  ],

  // External resources with performance optimizations
  stylesheets: [
    {
      href: `${CDN_BASE}/npm/katex@latest/dist/katex.min.css`,
      type: 'text/css',
      rel: 'stylesheet',
      crossorigin: 'anonymous',
      as: 'style',
    },
    {
      href: `${CDN_BASE}/gh/toss/tossface@latest/dist/tossface.css`,
      type: 'text/css',
      rel: 'stylesheet',
      crossorigin: 'anonymous',
      as: 'style',
    },
    {
      href: `${CDN_BASE}/gh/orioncactus/pretendard@latest/dist/web/variable/pretendardvariable-dynamic-subset.min.css`,
      type: 'text/css',
      rel: 'stylesheet',
      preload: true,
      as: 'style',
      crossorigin: 'anonymous',
    },
    {
      href: 'https://statics.goorm.io/fonts/GoormSansCode/v1.0.1/GoormSansCode.min.css',
      type: 'text/css',
      rel: 'stylesheet',
      crossorigin: 'anonymous',
      as: 'style',
    },
  ],

  // Theme configuration
  themeConfig: {
    // Search configuration
    algolia: {
      appId: 'YYIGMBHSI6',
      apiKey: '4f28c78c43e91f6f922d20140434977f',
      indexName: 'cho',
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: 'search',
      debug: false,
    },

    // Theme settings
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar,

    // Syntax highlighting
    prism: {
      additionalLanguages: ['java', 'swift', 'diff', 'docker'],
    },

    // Documentation settings
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

    // Mermaid diagram settings
    mermaid: {
      options: {
        fontFamily: 'var(--font-family-monospace)',
        themeVariables: {
          darkMode: true,
        },
      },
    },
  },

  // Analytics script with performance attributes
  scripts: [
    {
      src: 'https://sa.cho.sh/latest.js',
      async: true,
      defer: true,
      'data-collect-dnt': 'true',
      strategy: 'lazyOnload',
    },
  ],

  themes: ['@docusaurus/theme-mermaid'],
}

export default config
