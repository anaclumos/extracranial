import styles from './styles.module.css'

interface YouTubeProps {
  id: string
  title?: string
}

export default function YouTube({
  id,
  title = 'YouTube video player',
}: YouTubeProps) {
  return (
    <figure>
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.youtube}
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
      />
    </figure>
  )
}
