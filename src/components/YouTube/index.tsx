import styles from './index.module.css'

interface YouTubeProps {
  id: string
}

export default function YouTube({ id }: YouTubeProps) {
  return (
    <figure>
      <iframe className={styles.youtube} title="YouTube" src={`https://www.youtube.com/embed/${id}`} />
    </figure>
  )
}
