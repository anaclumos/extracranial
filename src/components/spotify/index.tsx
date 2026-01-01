interface SpotifyProps {
  url: string
  title?: string
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
      style={{ width: '100%', borderRadius: '0.75rem' }}
      title={title}
    />
  )
}
