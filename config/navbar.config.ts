import fs from 'fs'
import path from 'path'
const getMostRecentJournalLink = () => {
  const today = new Date()
  while (true) {
    const file = today.toISOString().split('T')[0]
    const filePath = path.join(
      __dirname,
      '..',
      'Brain',
      'Journals',
      file + '.md'
    )
    if (fs.existsSync(filePath)) {
      return `/r/${file}`
    }
    today.setDate(today.getDate() - 1)
  }
}

const navbar = {
  title: 'Sunghyun Cho',
  logo: {
    alt: 'Sunghyun Cho Logo',
    src: 'img/favicon.svg',
  },
  items: [
    {
      type: 'doc',
      docId: 'Hey',
      position: 'left',
      label: 'Research',
    },
    {
      to: '/w/archive',
      label: 'Articles',
      position: 'left',
    },
    {
      to: getMostRecentJournalLink(),
      label: 'Today',
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
