import styles from './index.module.css'

interface AppleMusicProps {
  url: string
}

export default function AppleMusic({ url }: AppleMusicProps) {
  return (
    <iframe
      allow="autoplay *; encrypted-media *; clipboard-write"
      className={styles.embedPlayer}
      height="175px"
      id="embedPlayer"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
      src={url}
      title="Apple Music Player"
    />
  )
}
