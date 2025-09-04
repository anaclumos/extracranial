export default function AppleMusicSong({ url }: { url: string }) {
    return (
      <iframe
        id="embedPlayer"
        src={url}
        height="175px"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        allow="autoplay *; encrypted-media *; clipboard-write"
      ></iframe>
    )
}