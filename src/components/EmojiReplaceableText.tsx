import React from 'react'
import styles from './EmojiReplaceableText.module.css'
import { useTimeout } from '../util/useTimeout'

type Props = {
  text: string
  emoji?: string
  photo?: string
  photoAlt?: string
  emojiByDefault?: 'emoji' | 'text'
  countdown?: number
}

const EmojiReplaceableText = (props: Props) => {
  const { text, emoji, photo, emojiByDefault, countdown, photoAlt } = props
  const [showEmoji, setShowEmoji] = React.useState(emojiByDefault === 'emoji')
  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    setShowEmoji(!showEmoji)
  }

  useTimeout(() => {
    if (countdown) {
      setShowEmoji(false)
    }
  }, countdown * 1000)

  return (
    <span onClick={handleClick} className={styles.emojiReplaceableText}>
      {showEmoji ? (
        emoji === undefined ? (
          photo === undefined ? (
            text
          ) : (
            <img src={photo} alt={photoAlt} width='2rem' height='2rem' />
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
