import type { CSSProperties } from 'react'

interface SpotifyProps {
  url: string
  title?: string
}

const IFRAME_STYLE: CSSProperties = {
  width: '100%',
  borderRadius: '0.75rem',
}

export default function Spotify({
  url,
  title = 'Spotify music player',
}: SpotifyProps) {
  return (
    <iframe
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen={false}
      height="160"
      loading="lazy"
      src={url}
      style={IFRAME_STYLE}
      title={title}
    />
  )
}
