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
  title: 'cho.sh',
  logo: {
    alt: 'cho.sh logo',
    src: '/img/favicon.svg',
    width: 32,
    height: 32,
  },
  items: [
    {
      type: 'dropdown',
      label: 'Research',
      position: 'left',
      items: [
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
        {
          to: '/r/000000',
          label: "What's this?",
        },
      ],
    },
    {
      to: '/w/archive',
      label: 'Articles',
      position: 'left',
    },
    {
      href: 'https://siw.ooo/',
      label: 'Newsletters',
      position: 'left',
      className: 'navbar-hn-en-link',
      'aria-label': 'Newsletters',
    },
    {
      href: 'https://siw.ooo/',
      label: '뉴스레터',
      position: 'left',
      className: 'navbar-hn-ko-link',
      'aria-label': 'Newsletters',
    },
    {
      href: 'https://github.com/anaclumos/extracranial',
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
