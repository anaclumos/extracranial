import React from 'react'
import type { Props } from '@theme/Icon/ExternalLink'

import styles from './styles.module.css'

export default function IconExternalLink({ width = 13.5, height = 13.5 }: Props): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={styles.iconExternalLink}
      viewBox="0 0 64 64"
    ></svg>
  )
}
