const pwaOptions = {
  debug: false,
  offlineModeActivationStrategies: [
    'appInstalled',
    'queryString',
    'standalone',
  ],
  pwaHead: [
    {
      tagName: 'link',
      rel: 'icon',
      href: '/img/favicon.svg',
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
      href: '/img/favicon.svg',
    },
    {
      tagName: 'link',
      rel: 'mask-icon',
      href: '/img/favicon.svg',
      color: '#5597ec',
    },
    {
      tagName: 'meta',
      name: 'msapplication-TileImage',
      content: '/img/favicon.svg',
    },
    {
      tagName: 'meta',
      name: 'msapplication-TileColor',
      content: '#5597ec',
    },
  ],
}

export = pwaOptions
