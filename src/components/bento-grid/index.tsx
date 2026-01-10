import FunFactsWidget from './components/fun-facts-widget'
import GitHubGraphWidget from './components/github-graph-widget'
import HabitTrackerWidget from './components/habit-tracker-widget'
import HeroWidget from './components/hero-widget'
import MapWidget from './components/map-widget'
import NowPlayingWidget from './components/now-playing-widget'
import styles from './styles.module.css'

export default function BentoGrid() {
  return (
    <main className={styles.bentoContainer}>
      <div className={styles.bentoGrid}>
        <HeroWidget className={styles.card2x2} />
        <NowPlayingWidget className={styles.card1x1} />
        <MapWidget className={styles.card1x1} />
        <FunFactsWidget className={styles.card2x1} />
        <HabitTrackerWidget className={styles.card4x1} />
        <GitHubGraphWidget className={styles.card4x1} />
      </div>
    </main>
  )
}
