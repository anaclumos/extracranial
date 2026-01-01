interface SpotifyProps {
  url: string
}

export default function Spotify({ url }: SpotifyProps) {
  return (
    <iframe
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen={false}
      className="h-40 w-full rounded-xl"
      loading="lazy"
      src={url}
      title="Spotify Player"
    />
  )
}
