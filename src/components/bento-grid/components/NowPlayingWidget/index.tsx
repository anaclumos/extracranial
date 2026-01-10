import { cn } from '@site/src/util/cn'
import { useEffect, useState } from 'react'
import { LASTFM_API_KEY, LASTFM_USERNAME } from '../../constants'
import type { LastFmResponse, LastFmTrack } from '../../types'
import BentoCard from '../BentoCard'
import styles from './styles.module.css'

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

interface NowPlayingWidgetProps {
  className?: string
}

export default function NowPlayingWidget({ className }: NowPlayingWidgetProps) {
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
      <BentoCard className={cn(styles.nowPlayingCard, className)}>
        <div className={styles.nowPlayingLoading}>
          <SpotifyLogo />
        </div>
      </BentoCard>
    )
  }

  return (
    <BentoCard
      className={cn(styles.nowPlayingCard, className)}
      external
      href={track.url}
    >
      <div className={styles.nowPlayingGrid}>
        <div className={styles.nowPlayingLogoCell}>
          <div className={styles.nowPlayingLogoStack}>
            <SpotifyLogo />
            {isPlaying && <span className={styles.nowPlayingDot} />}
          </div>
        </div>
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
        </div>
        <div className={styles.nowPlayingInfo}>
          <p className={styles.nowPlayingTitle}>{track.name}</p>
          <p className={styles.nowPlayingArtist}>{track.artist['#text']}</p>
        </div>
      </div>
    </BentoCard>
  )
}
