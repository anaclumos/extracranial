import React, { useState, MouseEvent } from 'react'
import styles from './index.module.css'

type Props = {
  text: string
  emoji?: string
  photo?: string
  photoAlt?: string
  showByDefault?: 'emoji' | 'text'
  countdown?: number
  border?: boolean
}

const EmojiReplaceableText = (props: Props) => {
  const { text, emoji, photo, showByDefault, border, photoAlt } = props
  const [showEmoji, setShowEmoji] = useState(showByDefault === 'emoji')
  const handleClick = (e: MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    setShowEmoji(!showEmoji)
  }

  return (
    <span onClick={handleClick} className={styles.emojiReplaceableText}>
      {showEmoji ? (
        emoji === undefined ? (
          photo === undefined ? (
            text
          ) : border === true ? (
            <>
              <img className={styles.photo} src={photo} alt={photoAlt} width="28" height="28" />
              <span className={styles.allyText}>{text}</span>
            </>
          ) : (
            <>
              <img className={styles.emoji} src={photo} alt={photoAlt} width="28" height="28" />
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

export default EmojiReplaceableText
