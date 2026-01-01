import { type MouseEvent, useState } from 'react'
import styles from './index.module.css'

interface EmojiReplaceableTextProps {
  text: string
  emoji?: string
  photo?: string
  photoAlt?: string
  showByDefault?: 'emoji' | 'text'
  countdown?: number
  border?: boolean
}

export default function EmojiReplaceableText({
  text,
  emoji,
  photo,
  showByDefault,
  border,
  photoAlt,
}: EmojiReplaceableTextProps) {
  const [showEmoji, setShowEmoji] = useState(showByDefault === 'emoji')

  const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault()
    setShowEmoji(!showEmoji)
  }

  return (
    <span className={styles.emojiReplaceableText} onClick={handleClick}>
      {showEmoji ? (
        emoji === undefined ? (
          photo === undefined ? (
            text
          ) : border === true ? (
            <>
              <img
                alt={photoAlt}
                className={styles.photo}
                height="28"
                src={photo}
                width="28"
              />
              <span className={styles.allyText}>{text}</span>
            </>
          ) : (
            <>
              <img
                alt={photoAlt}
                className={styles.emoji}
                height="28"
                src={photo}
                width="28"
              />
              <span className={styles.allyText}>{text}</span>
            </>
          )
        ) : (
          <span className={styles.emoji}>{emoji}</span>
        )
      ) : (
        <span className={styles.text}>{text}</span>
      )}
    </span>
  )
}
