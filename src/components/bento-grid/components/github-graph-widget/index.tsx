import { cn } from '@site/src/util/cn'
import { useEffect, useState } from 'react'
import {
  DAY_NAMES,
  GITHUB_LEVEL_COLORS,
  GITHUB_USERNAME,
  GITHUB_WEEKS,
} from '../../constants'
import type { ContributionDay, ContributionWeek } from '../../types'
import BentoWidget from '../bento-widget'
import styles from './styles.module.css'

interface WidgetContributionWeek extends ContributionWeek {
  id: string
}

export default function GitHubGraphWidget({
  className,
}: {
  className?: string
}) {
  const [weeks, setWeeks] = useState<WidgetContributionWeek[]>([])

  useEffect(() => {
    const controller = new AbortController()
    const fetchContributions = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
          { signal: controller.signal }
        )
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const data: { contributions: ContributionDay[] } = await response.json()
        const contributions = data.contributions.slice(-GITHUB_WEEKS * 7)
        const weekData: WidgetContributionWeek[] = []

        for (let w = 0; w < GITHUB_WEEKS; w++) {
          const weekDays: (ContributionDay | null)[] = new Array(7).fill(null)
          let weekTotal = 0

          for (let d = 0; d < 7; d++) {
            const idx = w * 7 + d
            const contrib = contributions[idx]
            if (contrib) {
              const dayOfWeek = new Date(contrib.date).getDay()
              weekDays[dayOfWeek] = contrib
              weekTotal += contrib.count
            }
          }
          const weekId = weekDays.find((d) => d)?.date ?? `week-${w}`
          weekData.push({ days: weekDays, weekTotal, id: weekId })
        }
        setWeeks(weekData)
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }
        setWeeks([])
      }
    }

    fetchContributions()
    return () => controller.abort()
  }, [])

  return (
    <BentoWidget
      ariaLabel="View GitHub profile"
      className={cn(className, styles.githubGraphWidget)}
      external
      href={`https://github.com/${GITHUB_USERNAME}`}
    >
      <div className={styles.githubHeader}>
        <svg
          aria-hidden="true"
          className={styles.githubLogo}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        <span className={styles.githubLabel}>GitHub</span>
      </div>
      <div className={styles.githubGrid}>
        <div className={styles.githubGridRow}>
          <div className={styles.githubDayCell} />
          {weeks.map((week) => {
            const hasContributions = week.weekTotal > 0
            return (
              <div
                className={cn(
                  styles.githubWeekHeader,
                  hasContributions && styles.githubWeekHeaderActive
                )}
                key={week.id}
                title={`Week of ${week.id}: ${week.weekTotal} contributions`}
              >
                {hasContributions ? week.weekTotal : ''}
              </div>
            )
          })}
        </div>
        {DAY_NAMES.map((dayName, dayIdx) => (
          <div className={styles.githubGridRow} key={dayName}>
            <div className={styles.githubDayCell}>{dayName}</div>
            {weeks.map((week) => {
              const contrib = week.days[dayIdx]
              if (!contrib) {
                return (
                  <div
                    aria-hidden="true"
                    className={cn(styles.githubCell, styles.githubCellEmpty)}
                    key={`${dayName}-${week.id}`}
                  />
                )
              }
              return (
                <div
                  className={cn(
                    styles.githubCell,
                    contrib.level === 0
                      ? styles.githubCellEmpty
                      : styles.githubCellActive
                  )}
                  key={contrib.date}
                  style={{ background: GITHUB_LEVEL_COLORS[contrib.level] }}
                  title={`${contrib.date}: ${contrib.count} contributions`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </BentoWidget>
  )
}
