import React, { JSX } from 'react'
import styles from './index.module.css'

type Props = {
  url: string
}

const AppleMusicSong = ({ url }: Props) => {
  return (
    <iframe
      id="embedPlayer"
      src={url}
      height="175px"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
      allow="autoplay *; encrypted-media *; clipboard-write"
      className={styles.embedPlayer}
    ></iframe>
  )
}

export default AppleMusicSong
