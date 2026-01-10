import Link from '@docusaurus/Link'
import { cn } from '@site/src/util/cn'
import { Squircle } from 'corner-smoothing'
import { CORNER_RADIUS, CORNER_SMOOTHING } from '../../constants'
import type { BentoWidgetProps } from '../../types'
import styles from './styles.module.css'

export default function BentoWidget({
  className,
  children,
  href,
  external,
  animate = true,
}: BentoWidgetProps) {
  const widgetContent = (
    <Squircle
      className={cn(styles.bentoWidget, animate && styles.animateIn, className)}
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
          className={styles.widgetLink}
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {widgetContent}
        </a>
      )
    }
    return (
      <Link className={styles.widgetLink} to={href}>
        {widgetContent}
      </Link>
    )
  }

  return widgetContent
}
