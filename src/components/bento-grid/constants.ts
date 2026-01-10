export const CORNER_RADIUS = 28
export const CORNER_SMOOTHING = 0.6

export const LASTFM_API_KEY = 'f38b247197f3dc409a6911356a204510'
export const LASTFM_USERNAME = 'anaclumos'

export const GITHUB_USERNAME = 'anaclumos'
export const GITHUB_WEEKS = 52

export const MAPKIT_TOKEN =
  'eyJraWQiOiIzRlRWQUxHQlBNIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJRS1BYUDk3ODhMIiwiaWF0IjoxNzY3NTI2NzIwLCJvcmlnaW4iOiJjaG8uc2giLCJleHAiOjE4MzA1MjQ0MDB9.c0GhqgFDK_frPMh8ZKVSeAonhwhAPzQqpSrLP8dJ4nb2ydmR833F0cDUd9rcgf0gHWAFt7gW3fPwP0i9pOUxLg'

export const HABIT_DAYS = 52

export const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export const GITHUB_LEVEL_COLORS = [
  'var(--github-empty)',
  '#9be9a8',
  '#40c463',
  '#30a14e',
  '#216e39',
]

export const HABIT_COLORS = [
  'var(--apple-blue)',
  '#409cff',
  '#66b0ff',
  '#0062cc',
  '#3392ff',
  '#0077f0',
  '#004999',
  '#007aff',
]

export const ORGANIZATIONS = {
  kmla: { icon: '/img/kmla.png', en: 'KMLA', ko: '민사고' },
  usc: { icon: '/img/usc.svg', en: 'USC', ko: 'USC' },
  lunit: { icon: '/img/lunit.svg', en: 'Lunit', ko: '루닛' },
  baemin: { icon: '/img/baemin.png', en: 'Baemin', ko: '배달의민족' },
  karrot: { icon: '/img/karrot.png', en: 'Karrot', ko: '당근' },
  grammarly: { icon: '/img/grammarly.png', en: 'Grammarly', ko: 'Grammarly' },
} as const

export type OrganizationKey = keyof typeof ORGANIZATIONS

export const MD_EXT_RE = /\.md$/
export const SPACE_RE = / /g
export const LEADING_SLASH_RE = /^\//
