import Link from '@docusaurus/Link'
import { cn } from '@site/src/util/cn'
import type { BentoWidgetProps } from '../../types'
import styles from './styles.module.css'

export default function BentoWidget({
  className,
  children,
  href,
  external,
  animate = true,
  ariaLabel,
}: BentoWidgetProps) {
  const widgetContent = (
    <div
      className={cn(styles.bentoWidget, animate && styles.animateIn, className)}
    >
      {children}
    </div>
  )

  if (href) {
    if (external) {
      return (
        <a
          aria-label={ariaLabel ? `${ariaLabel} (opens in new tab)` : undefined}
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
      <Link aria-label={ariaLabel} className={styles.widgetLink} to={href}>
        {widgetContent}
      </Link>
    )
  }

  return widgetContent
}
