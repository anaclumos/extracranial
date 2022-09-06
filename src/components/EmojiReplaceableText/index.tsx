import React from 'react'
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
  const {
    text,
    emoji,
    photo,
    showByDefault,
    border,
    photoAlt,
  } = props
  const [showEmoji, setShowEmoji] = React.useState(
    showByDefault === 'emoji'
  )
  const handleClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault()
    setShowEmoji(!showEmoji)
  }

  return (
    <span
      onClick={handleClick}
      className={styles.emojiReplaceableText}
    >
      {showEmoji ? (
        emoji === undefined ? (
          photo === undefined ? (
            text
          ) : border === true ? (
            <img
              className={styles.border}
              src={photo}
              alt={photoAlt}
              width="38px"
              height="38px"
            />
          ) : (
            <img
              className={styles.emoji}
              src={photo}
              alt={photoAlt}
              width="38px"
              height="38px"
            />
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
