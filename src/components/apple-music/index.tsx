interface AppleMusicProps {
  url: string
}

export default function AppleMusic({ url }: AppleMusicProps) {
  return (
    <iframe
      allow="autoplay *; encrypted-media *; clipboard-write"
      className="w-full animate-pulse overflow-hidden border-none"
      height="175px"
      id="embedPlayer"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
      src={url}
      title="Apple Music Player"
    />
  )
}
