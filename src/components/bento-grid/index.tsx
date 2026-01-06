import Link from '@docusaurus/Link'
import Translate, { translate } from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { cn } from '@site/src/util/cn'
import { Squircle } from 'corner-smoothing'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { funFacts } from './fun-facts'
import styles from './styles.module.css'

const CORNER_RADIUS = 28
const CORNER_SMOOTHING = 0.6

interface BentoCardProps {
  className?: string
  children: ReactNode
  href?: string
  external?: boolean
  animate?: boolean
}

function BentoCard({
  className,
  children,
  href,
  external,
  animate = true,
}: BentoCardProps) {
  const cardContent = (
    <Squircle
      className={cn(styles.bentoCard, animate && styles.animateIn, className)}
      cornerRadius={CORNER_RADIUS}
      cornerSmoothing={CORNER_SMOOTHING}
    >
      {children}
    </Squircle>
  )

  if (href) {
    if (external) {
      return (
        <a
          className={styles.cardLink}
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {cardContent}
        </a>
      )
    }
    return (
      <Link className={styles.cardLink} to={href}>
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

function HeroCard() {
  return (
    <BentoCard className={cn(styles.cardXL, styles.heroCard)}>
      <div aria-hidden="true" className={styles.heroGlow} />
      <h1 className={styles.heroTitle}>
        <Translate id="bento.hero.name">Sunghyun Cho</Translate>
      </h1>
      <p className={styles.heroSubtitle}>
        <Translate id="bento.hero.subtitle">
          Graduated from KMLA and USC, building medical AI platform at Lunit.
          Previously at Woowa Brothers, Karrot, and Grammarly.
        </Translate>
      </p>
    </BentoCard>
  )
}

const LASTFM_API_KEY = 'f38b247197f3dc409a6911356a204510'
const LASTFM_USERNAME = 'anaclumos'

interface LastFmTrack {
  name: string
  artist: { '#text': string }
  album: { '#text': string }
  image: Array<{ '#text': string; size: string }>
  '@attr'?: { nowplaying: string }
  url: string
}

interface LastFmResponse {
  recenttracks: {
    track: LastFmTrack[]
  }
}

function SpotifyLogo() {
  return (
    <svg
      aria-hidden="true"
      className={styles.spotifyLogo}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

function NowPlayingWidget() {
  const [track, setTrack] = useState<LastFmTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data: LastFmResponse = await response.json()
        const latestTrack = data.recenttracks.track[0]

        if (latestTrack) {
          setTrack(latestTrack)
          setIsPlaying(latestTrack['@attr']?.nowplaying === 'true')
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }
        console.error('Failed to fetch Last.fm data:', error)
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 30_000)
    return () => {
      controller.abort()
      clearInterval(interval)
    }
  }, [])

  const albumArt =
    track?.image.find((img) => img.size === 'extralarge')?.['#text'] ||
    track?.image.find((img) => img.size === 'large')?.['#text'] ||
    ''

  if (loading || !track) {
    return (
      <BentoCard className={cn(styles.cardNormal, styles.nowPlayingCard)}>
        <div className={styles.nowPlayingLoading}>
          <SpotifyLogo />
        </div>
      </BentoCard>
    )
  }

  return (
    <BentoCard
      className={cn(styles.cardNormal, styles.nowPlayingCard)}
      external
      href={track.url}
    >
      <div className={styles.nowPlayingGrid}>
        <div className={styles.nowPlayingArtWrapper}>
          {albumArt && (
            <img
              alt={`${track.album['#text']} album art`}
              className={styles.nowPlayingArt}
              height={300}
              src={albumArt}
              width={300}
            />
          )}
          <div className={styles.nowPlayingLogoCell}>
            <div className={styles.nowPlayingLogoStack}>
              <SpotifyLogo />
              {isPlaying && <span className={styles.nowPlayingDot} />}
            </div>
          </div>
        </div>
        <div className={styles.nowPlayingInfo}>
          <p className={styles.nowPlayingTitle}>{track.name}</p>
          <p className={styles.nowPlayingArtist}>{track.artist['#text']}</p>
        </div>
      </div>
    </BentoCard>
  )
}

function GitHubGraphWidget() {
  return (
    <BentoCard
      className={cn(styles.cardFull, styles.githubGraphCard)}
      external
      href="https://github.com/anaclumos"
    >
      <div className={styles.githubGraphHeader}>
        <svg
          aria-hidden="true"
          className={styles.githubGraphLogo}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        <span className={styles.githubGraphLabel}>@anaclumos</span>
      </div>
      <img
        alt="GitHub contribution graph"
        className={styles.githubGraphImage}
        height={104}
        src="https://ghchart.rshah.org/22c55e/anaclumos"
        width={663}
      />
    </BentoCard>
  )
}

const getBioSnippets = () =>
  funFacts.map((fact) => translate({ id: fact.id, message: fact.message }))

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const a = shuffled[i]
    const b = shuffled[j]
    if (a === undefined || b === undefined) {
      continue
    }
    shuffled[i] = b
    shuffled[j] = a
  }
  return shuffled
}

function BioCard() {
  const [snippet, setSnippet] = useState('')
  const shuffledSnippets = useRef<string[]>([])
  const currentIndex = useRef(0)

  const refreshSnippet = useCallback(() => {
    if (shuffledSnippets.current.length === 0) {
      shuffledSnippets.current = shuffleArray(getBioSnippets())
    }
    setSnippet(shuffledSnippets.current[currentIndex.current] ?? '')
    currentIndex.current =
      (currentIndex.current + 1) % shuffledSnippets.current.length
  }, [])

  useEffect(() => {
    refreshSnippet()
  }, [refreshSnippet])

  const refreshLabel = translate({
    id: 'bento.bio.refreshLabel',
    message: 'Refresh fun fact',
  })

  return (
    <BentoCard className={cn(styles.cardLarge, styles.bioCard)}>
      <span className={styles.bioLabel}>
        <Translate id="bento.bio.label">Fun Fact</Translate>
      </span>
      <p className={styles.bioContent}>{snippet}</p>
      <button
        aria-label={refreshLabel}
        className={styles.bioRefreshButton}
        onClick={refreshSnippet}
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </BentoCard>
  )
}

const MAPKIT_TOKEN =
  'eyJraWQiOiIzRlRWQUxHQlBNIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJRS1BYUDk3ODhMIiwiaWF0IjoxNzY3NTI2NzIwLCJvcmlnaW4iOiJjaG8uc2giLCJleHAiOjE4MzA1MjQ0MDB9.c0GhqgFDK_frPMh8ZKVSeAonhwhAPzQqpSrLP8dJ4nb2ydmR833F0cDUd9rcgf0gHWAFt7gW3fPwP0i9pOUxLg'

function MapWidget() {
  const mapRef = useRef<HTMLDivElement>(null)
  const { i18n } = useDocusaurusContext()

  useEffect(() => {
    let map: MapKitMapInstance | null = null
    let script: HTMLScriptElement | null = null

    const initMap = () => {
      const mapkit = window.mapkit
      if (!(mapRef.current && mapkit)) {
        return
      }

      mapkit.init({
        authorizationCallback: (done: (token: string) => void) => {
          done(MAPKIT_TOKEN)
        },
        language: i18n.currentLocale,
      })

      const gangnamStation = new mapkit.Coordinate(37.4981, 127.0283)

      map = new mapkit.Map(mapRef.current, {
        center: gangnamStation,
        cameraDistance: 20_000,
        mapType: mapkit.Map.MapTypes.Standard,
        showsCompass: mapkit.FeatureVisibility.Hidden,
        showsZoomControl: false,
        showsMapTypeControl: false,
        isScrollEnabled: false,
        isZoomEnabled: false,
        isRotationEnabled: false,
      })
    }

    if (window.mapkit) {
      initMap()
    } else {
      script =
        document.querySelector<HTMLScriptElement>('script[data-mapkit]') ??
        document.createElement('script')

      if (!script.dataset.mapkit) {
        script.src = 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js'
        script.crossOrigin = 'anonymous'
        script.dataset.mapkit = 'true'
        document.head.appendChild(script)
      }

      script.addEventListener('load', initMap)
    }

    return () => {
      if (script) {
        script.removeEventListener('load', initMap)
      }
      if (map) {
        map.destroy()
      }
    }
  }, [i18n.currentLocale])

  return (
    <BentoCard className={cn(styles.cardNormal, styles.mapCard)}>
      <div className={styles.mapWrapper}>
        <div className={styles.mapImage} ref={mapRef} />
        <span className={styles.mapPulse} />
      </div>
    </BentoCard>
  )
}

export default function BentoGrid() {
  return (
    <main className={styles.bentoContainer}>
      <div className={styles.bentoGrid}>
        <HeroCard />
        <NowPlayingWidget />
        <MapWidget />
        <BioCard />
        <GitHubGraphWidget />
      </div>
    </main>
  )
}
