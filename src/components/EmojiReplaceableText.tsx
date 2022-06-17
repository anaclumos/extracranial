import React from 'react'
import Translate, { translate } from '@docusaurus/Translate'
import styles from './EmojiReplaceableText.module.css'

type Props = {
  text: string
  emoji?: string
  photoSrc?: string
  emojiByDefault?: 'emoji' | 'text'
}

const EmojiReplaceableText = (props: Props) => {
  const { text, emoji, photoSrc, emojiByDefault } = props
  const [showEmoji, setShowEmoji] = React.useState(emojiByDefault === 'emoji')
  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    setShowEmoji(!showEmoji)
  }
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
