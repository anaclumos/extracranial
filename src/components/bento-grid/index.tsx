import BioCard from './components/BioCard'
import GitHubGraphWidget from './components/GitHubGraphWidget'
import HabitTrackerWidget from './components/HabitTrackerWidget'
import HeroCard from './components/HeroCard'
import MapWidget from './components/MapWidget'
import NowPlayingWidget from './components/NowPlayingWidget'
import styles from './styles.module.css'

export default function BentoGrid() {
  return (
    <main className={styles.bentoContainer}>
      <div className={styles.bentoGrid}>
        <HeroCard className={styles.card2x2} />
        <NowPlayingWidget className={styles.card1x1} />
        <MapWidget className={styles.card1x1} />
        <BioCard className={styles.card2x1} />
        <HabitTrackerWidget className={styles.card4x1} />
        <GitHubGraphWidget className={styles.card4x1} />
      </div>
    </main>
  )
}
