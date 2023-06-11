import Link from '@docusaurus/Link'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.css'

type Props = {
  title: string
  width?: number
  description: string
  image: string
  icon: string
  gradientStart?: string
  gradientEnd?: string
  link?: string
}

const WidgetItem = ({
  title,
  link = 'https://github.com/anaclumos',
  description,
  image,
  icon,
  width = 1,
  gradientStart = '#FB5C74',
  gradientEnd = '#FA233D',
}: Props): JSX.Element => {
  return (
    <Link to={link} className={styles.link}>
      <div
        className={clsx(styles.item, width === 2 && styles.wide)}
        style={{ background: `linear-gradient(160deg, ${gradientStart} 0%, ${gradientEnd} 100%)` }}
      >
        <div className={styles.flex}>
          <img className={styles.photo} src={image} alt={title} />
          <img className={styles.icon} src={icon} alt={title} />
        </div>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default WidgetItem
