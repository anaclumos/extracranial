import React from 'react'
import styles from './index.module.css'

type Props = {
  children: React.ReactNode
}

const DisplayFlex = (props: Props) => {
  return <div className={styles.displayFlex}>{props.children}</div>
}

export default DisplayFlex
