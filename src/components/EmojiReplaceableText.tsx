import React from 'react'
import Translate from '@docusaurus/Translate'
import styles from './EmojiReplaceableText.module.css'
import { useTimeout } from '../util/useTimeout'

type Props = {
  text: string
  emoji?: string
  photo?: string
  emojiByDefault?: 'emoji' | 'text'
  countdown?: number
}

const EmojiReplaceableText = (props: Props) => {
  const { text, emoji, photo, emojiByDefault, countdown } = props
  const [showEmoji, setShowEmoji] = React.useState(emojiByDefault === 'emoji')
  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    setShowEmoji(!showEmoji)
  }

  useTimeout(() => {
    if (countdown) {
      setShowEmoji(emojiByDefault !== 'emoji')
    }
  }, countdown * 1000)

  return (
    <span onClick={handleClick} className={styles.emojiReplaceableText}>
      {showEmoji ? (
        emoji === undefined ? (
          photo === undefined ? (
            <Translate>{text}</Translate>
          ) : (
            <img src={photo} />
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
