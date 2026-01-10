import type { ReactNode } from 'react'

export interface BentoCardProps {
  className?: string
  children: ReactNode
  href?: string
  external?: boolean
  animate?: boolean
}

export interface HabitDefinition {
  id: string
  title: string
  status: 'TODO' | 'ING' | 'SUCCESS' | 'FAILURE'
  sourceFile: string
  slug?: string
}

export type HabitLog = Record<string, string[]>

export interface LastFmTrack {
  name: string
  artist: { '#text': string }
  album: { '#text': string }
  image: Array<{ '#text': string; size: string }>
  '@attr'?: { nowplaying: string }
  url: string
}

export interface LastFmResponse {
  recenttracks: {
    track: LastFmTrack[]
  }
}

export interface ContributionDay {
  date: string
  level: number
  count: number
}

export interface ContributionWeek {
  days: (ContributionDay | null)[]
  weekTotal: number
}

export interface FunFactSnippet {
  id: string
  message: string
}
