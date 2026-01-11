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
