import fs from 'fs'
import path from 'path'

const getMostRecentJournalLink = () => {
  const today = new Date()
  today.setDate(today.getDate() + 2)
  let file = ''
  while ((file = today.toISOString().split('T')[0])) {
    const filePath = path.join(__dirname, '..', 'Research', 'journals', file + '.md')
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
    src: '/img/favicon.svg',
  },
  items: [
    {
      type: 'dropdown',
      label: 'Research',
      position: 'left',
      items: [
        {
          type: 'doc',
          docId: 'Hey',
          label: 'Hey 👋🏻',
        },
        {
          to: getMostRecentJournalLink(),
          label: 'Today',
        },
        {
          to: '/random',
          label: 'Random',
        },
        {
          to: '/3d',
          label: 'Graph',
        },
      ],
    },
    {
      to: '/w/archive',
      label: 'Articles',
      position: 'left',
    },
    {
      href: 'https://hn.cho.sh/subscribe',
      label: 'Newsletters',
      position: 'left',
      className: 'navbar-hn-en-link',
      'aria-label': 'Newsletters',
    },
    {
      href: 'https://hn.cho.sh/ko/subscribe',
      label: '뉴스레터',
      position: 'left',
      className: 'navbar-hn-ko-link',
      'aria-label': 'Newsletters',
    },
    {
      href: 'https://github.com/anaclumos',
      position: 'right',
      className: 'navbar-github-link',
      'aria-label': 'GitHub repository',
    },
    {
      href: 'https://linkedin.com/in/anaclumos',
      position: 'right',
      className: 'navbar-linkedin-link',
      'aria-label': 'LinkedIn Account',
    },
    {
      type: 'localeDropdown',
      position: 'right',
    },
  ],
}

export default navbar
