export const messages: Record<string, Record<string, string>> = {
  en: {
    'home.cta.after': ' and see the documentation.',
    'home.cta.before': 'You can open ',
    'home.title': 'Hello World',
    'nav.newsroom': 'Newsroom',
    'nav.research': 'Research',
    'nav.title': 'Sunghyun Cho',
    'newsroom.tagline': 'Updates on building, shipping, and scaling products and experiences',
    'newsroom.title': 'Newsroom',

    'post.back': 'Back',
    'post.category': 'Category',
    'post.categoryDefault': 'News',
    'post.published': 'Published',
  },
  ko: {
    'home.cta.after': ' 를 열어보세요.',
    'home.cta.before': '문서를 보려면 ',
    'home.title': '안녕하세요',
    'nav.newsroom': '열람실',
    'nav.research': '연구실',
    'nav.title': '조성현',
    'newsroom.tagline': '제품, 그리고 경험을, 만들고, 내보내고, 성장시키는 일들에 대해',
    'newsroom.title': '열람실',
    'post.back': '돌아가기',
    'post.category': '카테고리',
    'post.categoryDefault': '뉴스',
    'post.published': '게시일',
  },
}

export const t = (locale: string, key: string) => {
  return messages[locale]?.[key] ?? messages.en?.[key] ?? key
}

const intlLocaleMap: Record<string, string> = {
  en: 'en-US',
  ko: 'ko-KR',
}

export const formatDate = (locale: string, value: string) => {
  const tag = intlLocaleMap[locale] ?? 'en-US'
  return new Date(value).toLocaleDateString(tag, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
