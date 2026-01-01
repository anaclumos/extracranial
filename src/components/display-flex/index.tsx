import type { ReactNode } from 'react'
import styles from './styles.module.css'

interface DisplayFlexProps {
  children: ReactNode
}

export default function DisplayFlex({ children }: DisplayFlexProps) {
  return <div className={styles.displayFlex}>{children}</div>
}
