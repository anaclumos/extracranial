import styles from './index.module.css'

interface AppleMusicProps {
  url: string
}

export default function AppleMusic({ url }: AppleMusicProps) {
  return (
    <iframe
      id="embedPlayer"
      src={url}
      height="175px"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
      allow="autoplay *; encrypted-media *; clipboard-write"
      className={styles.embedPlayer}
    />
  )
}
