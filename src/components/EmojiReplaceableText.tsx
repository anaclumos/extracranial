import React from 'react'
import Translate from '@docusaurus/Translate'
import styles from './EmojiReplaceableText.module.css'
import { useTimeout } from '../util/useTimeout'

type Props = {
  text: string
  emoji?: string
  photoSrc?: string
  emojiByDefault?: 'emoji' | 'text'
  countdown?: number
}

const EmojiReplaceableText = (props: Props) => {
  const { text, emoji, photoSrc, emojiByDefault, countdown } = props
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
          photoSrc === undefined ? (
            <Translate>{text}</Translate>
          ) : (
            <img src={photoSrc} />
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
