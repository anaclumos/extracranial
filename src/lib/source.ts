import { loader } from 'fumadocs-core/source'
import { docs, newsroom } from '@/.source'
import { i18n } from './i18n'

export const researchSource = loader({
  baseUrl: '/research',
  i18n,
  source: docs.toFumadocsSource(),
})

// Blog/newsroom source
export const newsroomSource = loader({
  baseUrl: '/newsroom',
  i18n,
  source: newsroom.toFumadocsSource(),
})
