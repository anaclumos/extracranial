const navbar = {
  title: 'cho.sh',
  logo: {
    alt: 'cho.sh logo',
    src: 'img/favicon.png',
  },
  items: [
    {
      type: 'doc',
      docId: 'hey',
      position: 'left',
      label: 'Research Notes',
    },
    { to: '/blog', label: 'Blog', position: 'left' },
    {
      type: 'localeDropdown',
      position: 'right',
    },
    {
      href: 'https://github.com/anaclumos',
      position: 'right',
      className: 'header-github-link',
      'aria-label': 'GitHub repository',
    },
  ],
}

export = navbar
