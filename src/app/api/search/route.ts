import { createFromSource } from 'fumadocs-core/search/server'
import { researchSource } from '@/lib/source'

export const { GET } = createFromSource(researchSource, {
  language: 'english',
  localeMap: {
    en: 'english',
    ko: 'english', // Fallback to English for Korean
  },
})
