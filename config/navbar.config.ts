const navbar = {
  title: 'cho.sh',
  logo: {
    alt: 'cho.sh logo',
    src: 'img/favicon.png',
  },
  items: [
    {
      type: 'doc',
      docId: 'Hey',
      position: 'left',
      label: 'Research Notes',
    },
    {
      to: '/blog/archive',
      label: 'Blog',
      position: 'left',
    },
    {
      href: 'https://github.com/anaclumos',
      position: 'right',
      className: 'header-github-link',
      'aria-label': 'GitHub repository',
    },
    {
      href: 'https://linkedin.com/in/anaclumos',
      position: 'right',
      className: 'header-linkedin-link',
      'aria-label': 'LinkedIn Account',
    },
    {
      href: 'https://twitter.com/anaclumos',
      position: 'right',
      className: 'header-twitter-link',
      'aria-label': 'Twitter Account',
    },
    {
      type: 'localeDropdown',
      position: 'right',
    },
  ],
}

export = navbar
