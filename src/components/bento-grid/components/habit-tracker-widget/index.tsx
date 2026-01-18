import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import habitLogData from '@site/src/data/habit-log.json'
import habitsData from '@site/src/data/habits.json'
import journalDates from '@site/src/data/journals.json'
import { cn } from '@site/src/util/cn'
import { useMemo } from 'react'
import {
  HABIT_COLORS,
  HABIT_DAYS,
  LEADING_SLASH_RE,
  MD_EXT_RE,
  SPACE_RE,
} from '../../constants'
import type { HabitDefinition, HabitLog } from '../../types'
import { generateDateRange } from '../../utils/helpers'
import BentoWidget from '../bento-widget'
import styles from './styles.module.css'

interface HabitTrackerWidgetProps {
  className?: string
}

export default function HabitTrackerWidget({
  className,
}: HabitTrackerWidgetProps) {
  const habits = useMemo(
    () => (habitsData as HabitDefinition[]).filter((h) => h.status === 'ING'),
    []
  )
  const habitLog = habitLogData as HabitLog
  const existingJournals = useMemo(() => new Set(journalDates as string[]), [])

  if (habits.length === 0) {
    return null
  }

  const dates = useMemo(() => generateDateRange(HABIT_DAYS), [])
  const completedDatesSet = useMemo(() => {
    const completed = new Map<string, Set<string>>()

    for (const habit of habits) {
      completed.set(habit.id, new Set(habitLog[habit.id] ?? []))
    }

    return completed
  }, [habits, habitLog])

  const dailyCompletionCount = useMemo(() => {
    return dates.map((date) => {
      let count = 0
      for (const habit of habits) {
        if (completedDatesSet.get(habit.id)?.has(date)) {
          count++
        }
      }
      return count
    })
  }, [dates, habits, completedDatesSet])

  return (
    <BentoWidget className={cn(styles.habitTrackerWidget, className)}>
      <div className={styles.habitTrackerHeader}>
        <svg
          aria-hidden="true"
          className={styles.habitTrackerLogo}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.habitTrackerLabel}>
          <Translate id="bento.habits.label">Habits</Translate>
        </span>
      </div>
      <div className={styles.habitGrid}>
        <div className={styles.habitGridRow}>
          <div className={styles.habitIdCell} />
          {dates.map((date, idx) => {
            const count = dailyCompletionCount[idx] ?? 0
            const allDone = count === habits.length
            const hasJournal = existingJournals.has(date)
            const cellClassName = cn(
              styles.habitDayHeader,
              allDone && styles.habitDayHeaderAllDone
            )
            const title = `${date}: ${count}/${habits.length} habits`
            const content = count > 0 ? count : ''

            return hasJournal ? (
              <Link
                className={cellClassName}
                key={`header-${date}`}
                title={title}
                to={`/r/${date}`}
              >
                {content}
              </Link>
            ) : (
              <span
                className={cellClassName}
                key={`header-${date}`}
                title={title}
              >
                {content}
              </span>
            )
          })}
        </div>
        {habits.map((habit, habitIndex) => {
          const completedSet = completedDatesSet.get(habit.id)
          const slugPath = habit.slug
            ? habit.slug.replace(LEADING_SLASH_RE, '')
            : habit.sourceFile.replace(MD_EXT_RE, '').replace(SPACE_RE, '%20')
          const habitColor = HABIT_COLORS[habitIndex % HABIT_COLORS.length]
          return (
            <div className={styles.habitGridRow} key={habit.id}>
              <Link
                className={styles.habitIdCell}
                style={{ color: habitColor }}
                title={habit.title}
                to={`/r/${slugPath}`}
              >
                {habit.id}
              </Link>
              {dates.map((date) => {
                const isCompleted = completedSet?.has(date) ?? false
                const hasJournal = existingJournals.has(date)
                const cellClassName = cn(
                  styles.habitCell,
                  isCompleted ? styles.habitCellDone : styles.habitCellEmpty
                )
                const style = isCompleted
                  ? { background: habitColor }
                  : undefined
                const title = `${habit.id} - ${date}: ${isCompleted ? 'Done' : 'Not done'}`

                return hasJournal ? (
                  <Link
                    className={cellClassName}
                    key={`${habit.id}-${date}`}
                    style={style}
                    title={title}
                    to={`/r/${date}`}
                  />
                ) : (
                  <span
                    className={cellClassName}
                    key={`${habit.id}-${date}`}
                    style={style}
                    title={title}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </BentoWidget>
  )
}
