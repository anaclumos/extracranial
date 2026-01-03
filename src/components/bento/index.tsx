import Link from '@docusaurus/Link'
import Translate, { translate } from '@docusaurus/Translate'
import { cn } from '@site/src/util/cn'
import { Squircle } from 'corner-smoothing'
import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    mapkit: typeof mapkit
  }
  namespace mapkit {
    function init(options: {
      authorizationCallback: (done: (token: string) => void) => void
    }): void
    class Coordinate {
      constructor(latitude: number, longitude: number)
    }
    class Map {
      constructor(element: HTMLElement, options?: MapConstructorOptions)
      destroy(): void
      static MapTypes: { Standard: string }
    }
    interface MapConstructorOptions {
      center?: Coordinate
      cameraDistance?: number
      mapType?: string
      showsCompass?: string
      showsZoomControl?: boolean
      showsMapTypeControl?: boolean
      isScrollEnabled?: boolean
      isZoomEnabled?: boolean
      isRotationEnabled?: boolean
    }
    const FeatureVisibility: { Hidden: string }
  }
}

import styles from './styles.module.css'

const CORNER_RADIUS = 28
const CORNER_SMOOTHING = 0.6

interface BentoCardProps {
  className?: string
  children: React.ReactNode
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

// ═══════════════════════════════════════════════════════════════════════════
// Hero Card
// ═══════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════
// Now Playing Widget — Last.fm API
// ═══════════════════════════════════════════════════════════════════════════

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
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
        )
        const data: LastFmResponse = await response.json()
        const latestTrack = data.recenttracks.track[0]

        if (latestTrack) {
          setTrack(latestTrack)
          setIsPlaying(latestTrack['@attr']?.nowplaying === 'true')
        }
      } catch (error) {
        console.error('Failed to fetch Last.fm data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 30_000)
    return () => clearInterval(interval)
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
        {albumArt && (
          <img
            alt={`${track.album['#text']} album art`}
            className={styles.nowPlayingArt}
            src={albumArt}
          />
        )}
        <div className={styles.nowPlayingLogoCell}>
          <SpotifyLogo />
          {isPlaying && <span className={styles.nowPlayingDot} />}
        </div>
        <div className={styles.nowPlayingInfo}>
          <p className={styles.nowPlayingTitle}>{track.name}</p>
          <p className={styles.nowPlayingArtist}>{track.artist['#text']}</p>
        </div>
      </div>
    </BentoCard>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// GitHub Contribution Graph Widget
// ═══════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════
// Bio Card
// ═══════════════════════════════════════════════════════════════════════════

const getBioSnippets = () => [
  // Accelerationist - Part 1
  translate({
    id: 'bento.bio.snippet1',
    message:
      'I consider myself an accelerationist in many fields, albeit the only field I am actively participating in right now is oss/acc (i.e., build more, ship more, talk more open source!) I built and led some successful OSS projects, one even getting me MikeRoweSofted. I feel particularly happy when people send me excellent and mindful thoughts.',
  }),
  // Accelerationist - Part 2
  translate({
    id: 'bento.bio.snippet2',
    message:
      'While oss/acc is the only field I am actively into, I want to expand to nuc/acc, bme/acc, med/acc, and eventually sci/acc.',
  }),
  // Accelerationist - Part 3
  translate({
    id: 'bento.bio.snippet3',
    message:
      'Speaking of med/acc, I am very fortunate to work in the field of my interest. I am working on MLOps for a Medical AI company. Our automation software solves all the medical AI issues. I want to contribute to a better ecosystem by building a competitive global open-market product and potentially open-sourcing them.',
  }),
  // Lateral thinking
  translate({
    id: 'bento.bio.snippet4',
    message:
      'I love lateral thinking (thinking outside the box) and crazy ideas. For example, how can you say, "Shooting rockets are too expensive," then "OK, just land them and reuse them." When paired with exceptional engineering talents, lateral thinking can make amazing breakthroughs regardless of field.',
  }),
  // Early adopter - Part 1
  translate({
    id: 'bento.bio.snippet5',
    message:
      'I am an early adopter and enthusiast in many fields. I love trying out half-baked products and early-stage prototypes. We must explore fresh ideas and converse on them as scientists and engineers. Alas, someone needs to fund them to improve the product, and if so, that better be me!',
  }),
  // Early adopter - Part 2
  translate({
    id: 'bento.bio.snippet6',
    message:
      'As a great perk other than helping them build the future, I think of those prices expedition costs for ideas, not a price tag of a product. I get ideas from them like, "Oh shit, they nailed this part" or "Oh no, this they missed the potential," and imagine how I would\'ve done it. If you\'re building something extraordinary, you can count me as your first customer. I\'ll drop my bucks!',
  }),
  // Korean culture - Part 1
  translate({
    id: 'bento.bio.snippet7',
    message:
      'I am Korean, and I love Korean culture, not to mention I love K-pop. But more than the recent sprout in Korean cultures, my genuine interest lies in traditional Korean cultures, which are heavily underexplored. My favorite folklore is the story of Bulgasari (불가사리), a metal-eating fire-bending beast that brought the corrupt people to their knees and brought an end to a war and suffering. My favorite artifacts are Jangseung (a.k.a. Beoksu), a totem pole guarding well-being.',
  }),
  // Korean culture - Part 2
  translate({
    id: 'bento.bio.snippet8',
    message:
      'In that same vein, I don\'t have an English name, even when studying in the US. I think Kihong Lee and Uzoamaka Aduba put it best. "If they can learn to speak Tchaikovsky, Michelangelo, and Dostoevsky, then they can learn to say your name."',
  }),
  // Korean history
  translate({
    id: 'bento.bio.snippet9',
    message:
      "I can't mention my love for Korean history and East Asian geopolitics. I always feel significant turbulence whenever I look into any timespan in 5,000 years of Korean history, and I enjoy how our people saved themselves or screwed up. History doesn't repeat itself but rhymes, so better be prepared, right?",
  }),
  // Trading
  translate({
    id: 'bento.bio.snippet10',
    message:
      "I also trade a lot. I was honored to rank 1st place on couple of stock leaderboards on Toss Securities (Korean Robinhood). These days, I'm spending most of my free time studying many algorithmic trading strategies. I sometimes Simons and sometimes Newton myself, but I'm fortifying my strategy with lessons I learn every day. I am not a millionaire yet but I'm on my way!",
  }),
  // Console gamer - Part 1
  translate({
    id: 'bento.bio.snippet11',
    message:
      'I am a heavy console gamer, especially in story-rich games or games with great soundtrack. Those story games are the 21st-century evolution of great literature, from movies in the 20th century to novels in the 19th century. Knowing how to appreciate and savor a good game is a skill and privilege, and I am so happy when I encounter one.',
  }),
  // Console gamer - Part 2
  translate({
    id: 'bento.bio.snippet12',
    message:
      "If you want me to list my favorite games, I'd say Ghost of Tsushima, Death Stranding, Detroit: Become Human and Sanabi. The Last of Us and Spidermen Series also name themselves in honorable mentions. Recently, I am obsessed with Rhythm Heaven, and I've been binge-playing it on Nintendo Wii, DS, and Gameboy (Analog Pocket). I guess I love games with great music after all.",
  }),
  // a11y/i18n - Part 1
  translate({
    id: 'bento.bio.snippet13',
    message:
      "I am obsessed with a11y (Accessibility) and i18n (Internationalization). Two parts of me play with this. First, I felt left out for a while, not being in the loop with American Outlets. The notion of being on the scene is heavy, and I've seen so many talented friends missing out on so many opportunities due to their linguistic barriers. The linguistic barrier, especially in tech, is the new Apartheid, even though it is not intentional.",
  }),
  // a11y/i18n - Part 2
  translate({
    id: 'bento.bio.snippet14',
    message:
      "The second part is that these two are the fast and quick way to gauge how craftsmanshipful, mindful, and meticulously built the product is. If they screwed up on a11y and i18n, the chances are, it's not a mind-blowing product.",
  }),
  // Extroverted
  translate({
    id: 'bento.bio.snippet15',
    message:
      'I am very extroverted. Well, I used to be. I love talking to many intelligent people and making myself the dumbest person in the room. I eventually want to build a product or service based not on hype but on exceptional quality. That makes me look up to my heroes: Jen-Hsun Huang (I love his perserverance), Lisa Tzwu-Fang Su (I love her technological yet messianic leadership), and Guillermo Rauch (I love how he transitioned from a dev with a bold manifesto in 2014 and then transitioned into rectifying the future.).',
  }),
  // Medici
  translate({
    id: 'bento.bio.snippet16',
    message:
      "With everything, I eventually dream of becoming the Medici of Science & Technology. The Medici patronized brilliant people during the changing Renaissance era and revolutionized the art industry. I was deeply moved by the Medici's values - that by mobilizing brilliant people, we can shape a better future. I've decided I want to gather talented individuals to forge the future together. I want to turn my fantasies into reality, pave that path forward, and through this create an ecosystem where people can freely enjoy new adventures.",
  }),
]

function BioCard() {
  const [snippet, setSnippet] = useState('')

  const refreshSnippet = () => {
    const snippets = getBioSnippets()
    const randomIndex = Math.floor(Math.random() * snippets.length)
    setSnippet(snippets[randomIndex] ?? '')
  }

  useEffect(() => {
    refreshSnippet()
  }, [])

  const refreshLabel = translate({
    id: 'bento.bio.refreshLabel',
    message: 'Refresh fun fact',
  })

  return (
    <BentoCard className={cn(styles.cardNormal, styles.bioCard)}>
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

// ═══════════════════════════════════════════════════════════════════════════
// Map Widget — Apple MapKit JS
// ═══════════════════════════════════════════════════════════════════════════

const MAPKIT_TOKEN =
  'eyJraWQiOiIzUEYzWTZMVVA0IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJRS1BYUDk3ODhMIiwiaWF0IjoxNzY3NDIwODkzLCJvcmlnaW4iOiIqLmNoby5zaCJ9.Qp0Y0u-5erM_WuzkP_M6WBUddf7boqsGmSSMA5wNocHCta7-Af9ryCTWOXxAjGX8n3xeq90NlDYgv3T0lH4LPQ'

function MapWidget() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let map: mapkit.Map | null = null

    const initMap = () => {
      if (!(mapRef.current && window.mapkit)) return

      mapkit.init({
        authorizationCallback: (done) => {
          done(MAPKIT_TOKEN)
        },
      })

      const gangnamStation = new mapkit.Coordinate(37.4981, 127.0283)

      map = new mapkit.Map(mapRef.current, {
        center: gangnamStation,
        cameraDistance: 50_000,
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
      const script = document.createElement('script')
      script.src = 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js'
      script.crossOrigin = 'anonymous'
      script.addEventListener('load', initMap)
      document.head.appendChild(script)
    }

    return () => {
      if (map) {
        map.destroy()
      }
    }
  }, [])

  return (
    <BentoCard className={cn(styles.cardLarge, styles.mapCard)}>
      <div className={styles.mapWrapper}>
        <div className={styles.mapImage} ref={mapRef} />
        <span className={styles.mapPulse} />
      </div>
    </BentoCard>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Landing Component
// ═══════════════════════════════════════════════════════════════════════════

export default function BentoLanding() {
  return (
    <main className={styles.bentoContainer}>
      <div className={styles.bentoGrid}>
        {/* Hero */}
        <HeroCard />

        {/* Now Playing - Last.fm */}
        <NowPlayingWidget />

        {/* Fun Fact */}
        <BioCard />

        {/* Map location */}
        <MapWidget />

        {/* GitHub contribution graph */}
        <GitHubGraphWidget />
      </div>
    </main>
  )
}
