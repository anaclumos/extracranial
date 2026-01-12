import fs from 'node:fs'
import path from 'node:path'
import type { ThemeConfig } from '@docusaurus/preset-classic'

const getMostRecentJournalLink = (): string => {
  const today = new Date()
  today.setDate(today.getDate() + 2)
  let file = ''
  do {
    file = today.toISOString().split('T')[0] ?? ''
    const filePath = path.join(
      __dirname,
      '..',
      'Research',
      'journals',
      `${file}.md`
    )
    if (fs.existsSync(filePath)) {
      return `/r/${file}`
    }
    today.setDate(today.getDate() - 1)
  } while (file)
  return '/r/000000'
}

const navbar = {
  title: 'cho.sh',
  logo: {
    alt: 'cho.sh logo',
    src: '/icons/symbol.svg',
    width: 32,
    height: 32,
  },
  items: [
    {
      to: '/r/000000',
      label: "What's this?",
      position: 'left' as const,
    },
    {
      to: getMostRecentJournalLink(),
      label: 'Today',
      position: 'left' as const,
    },
    {
      to: '/random',
      label: 'Random',
      position: 'left' as const,
    },
    {
      to: '/graph',
      label: 'Graph',
      position: 'left' as const,
    },
    {
      to: '/w/archive',
      label: 'Articles',
      position: 'left' as const,
    },
    {
      href: 'https://card.cho.sh/?place=cho.sh',
      position: 'right' as const,
      className: 'navbar-wallet-link',
      'aria-label': 'Apple Wallet Card',
    },
    {
      href: 'https://github.com/anaclumos/extracranial',
      position: 'right' as const,
      className: 'navbar-github-link',
      'aria-label': 'GitHub repository',
    },
    {
      href: 'https://linkedin.com/in/anaclumos',
      position: 'right' as const,
      className: 'navbar-linkedin-link',
      'aria-label': 'LinkedIn Account',
    },
    {
      type: 'localeDropdown' as const,
      position: 'right' as const,
    },
  ],
} satisfies ThemeConfig['navbar']

export default navbar
