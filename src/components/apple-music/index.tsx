import styles from './styles.module.css'

interface AppleMusicProps {
  url: string
  title?: string
}

export default function AppleMusic({
  url,
  title = 'Apple Music player',
}: AppleMusicProps) {
  return (
    <iframe
      allow="autoplay *; encrypted-media *; clipboard-write"
      className={styles.embedPlayer}
      height="175px"
      loading="lazy"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
      src={url}
      title={title}
    />
  )
}
