interface SpotifyProps {
  url: string
}

export default function Spotify({ url }: SpotifyProps) {
  return (
    <iframe
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen={false}
      height="152"
      loading="lazy"
      src={url}
      style={{ borderRadius: 12 }}
      width="100%"
    />
  )
}
