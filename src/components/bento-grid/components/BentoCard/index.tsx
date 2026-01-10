import Link from '@docusaurus/Link'
import { cn } from '@site/src/util/cn'
import { Squircle } from 'corner-smoothing'
import { CORNER_RADIUS, CORNER_SMOOTHING } from '../../constants'
import type { BentoCardProps } from '../../types'
import styles from './styles.module.css'

export default function BentoCard({
  className,
  children,
  href,
  external,
  animate = true,
}: BentoCardProps) {
  const cardContent = (
    <Squircle
      className={cn(styles.bentoCard, animate && styles.animateIn, className)}
      cornerRadius={CORNER_RADIUS}
      cornerSmoothing={CORNER_SMOOTHING}
    >
      {children}
    </Squircle>
  )

  if (href) {
    if (external) {
      return (
        <a
          className={styles.cardLink}
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {cardContent}
        </a>
      )
    }
    return (
      <Link className={styles.cardLink} to={href}>
        {cardContent}
      </Link>
    )
  }

  return cardContent
}
