import BrowserOnly from '@docusaurus/BrowserOnly'
import { lazy, Suspense } from 'react'
import FunFactsWidget from './components/fun-facts-widget'
import HabitTrackerWidget from './components/habit-tracker-widget'
import HeroWidget from './components/hero-widget'
import NowPlayingWidget from './components/now-playing-widget'
import styles from './styles.module.css'

const MapWidget = lazy(() => import('./components/map-widget'))
const GitHubGraphWidget = lazy(() => import('./components/github-graph-widget'))

function LoadingCard({
  className,
  label,
}: {
  className: string
  label: string
}) {
  return (
    <div
      aria-busy="true"
      aria-label={label}
      className={[styles.loadingCard, className].filter(Boolean).join(' ')}
    />
  )
}

export default function BentoGrid() {
  return (
    <main className={styles.bentoContainer}>
      <div className={styles.bentoGrid}>
        <HeroWidget className={styles.card2x2} />
        <NowPlayingWidget className={styles.card1x1} />
        <BrowserOnly
          fallback={
            <LoadingCard
              className={styles.card1x1}
              label="Loading map widget"
            />
          }
        >
          {() => (
            <Suspense
              fallback={
                <LoadingCard
                  className={styles.card1x1}
                  label="Loading map widget"
                />
              }
            >
              <MapWidget className={styles.card1x1} />
            </Suspense>
          )}
        </BrowserOnly>
        <FunFactsWidget className={styles.card2x1} />
        <HabitTrackerWidget className={styles.card4x1} />
        <BrowserOnly
          fallback={
            <LoadingCard
              className={styles.card4x1}
              label="Loading GitHub widget"
            />
          }
        >
          {() => (
            <Suspense
              fallback={
                <LoadingCard
                  className={styles.card4x1}
                  label="Loading GitHub widget"
                />
              }
            >
              <GitHubGraphWidget className={styles.card4x1} />
            </Suspense>
          )}
        </BrowserOnly>
      </div>
    </main>
  )
}
