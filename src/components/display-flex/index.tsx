import type { ReactNode } from 'react'
import styles from './index.module.css'

interface DisplayFlexProps {
  children: ReactNode
}

export default function DisplayFlex({ children }: DisplayFlexProps) {
  return (
    <figure>
      <div className={styles.displayFlex}>{children}</div>
    </figure>
  )
}
