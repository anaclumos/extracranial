import { type KeyboardEvent, type MouseEvent, useState } from 'react'
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

  const toggle = () => {
    setShowEmoji(!showEmoji)
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggle()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  const renderEmojiContent = () => {
    if (emoji !== undefined) {
      return <span className={styles.emoji}>{emoji}</span>
    }

    if (photo === undefined) {
      return text
    }

    const imgClassName = border === true ? styles.photo : styles.emoji
    return (
      <>
        <img
          alt={photoAlt}
          className={imgClassName}
          height="28"
          src={photo}
          width="28"
        />
        <span className={styles.allyText}>{text}</span>
      </>
    )
  }

  return (
    <button
      className={styles.emojiReplaceableText}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      {showEmoji ? (
        renderEmojiContent()
      ) : (
        <span className={styles.text}>{text}</span>
      )}
    </button>
  )
}
