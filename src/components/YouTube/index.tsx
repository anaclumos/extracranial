import React from 'react'
import type { JSX } from 'react'
import styles from './index.module.css'

type Props = {
  id: string
}

const YouTube = ({ id }: Props) => {
  return (
    <figure>
      <iframe
        className={styles.youtube}
        title='YouTube'
        src={`https://www.youtube.com/embed/${id}`}
      />
    </figure>
  )
}

export default YouTube
