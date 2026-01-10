import Translate, { translate } from '@docusaurus/Translate'
import { cn } from '@site/src/util/cn'
import { useCallback, useEffect, useRef, useState } from 'react'
import { funFacts } from '../../fun-facts'
import { shuffleArray } from '../../utils/helpers'
import BentoWidget from '../bento-widget'
import styles from './styles.module.css'

const getBioSnippets = () =>
  funFacts.map((fact) => translate({ id: fact.id, message: fact.message }))

interface FunFactsWidgetProps {
  className?: string
}

export default function FunFactsWidget({ className }: FunFactsWidgetProps) {
  const [snippet, setSnippet] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const shuffledSnippets = useRef<string[]>([])
  const currentIndex = useRef(0)

  const refreshSnippet = useCallback(() => {
    if (shuffledSnippets.current.length === 0) {
      shuffledSnippets.current = shuffleArray(getBioSnippets())
    }
    setSnippet(shuffledSnippets.current[currentIndex.current] ?? '')
    currentIndex.current =
      (currentIndex.current + 1) % shuffledSnippets.current.length
  }, [])

  const handleRefresh = () => {
    if (isRefreshing) {
      return
    }
    setIsRefreshing(true)
    setTimeout(refreshSnippet, 240)
  }

  useEffect(() => {
    refreshSnippet()
  }, [refreshSnippet])

  const refreshLabel = translate({
    id: 'bento.bio.refreshLabel',
    message: 'Refresh fun fact',
  })

  return (
    <BentoWidget className={cn(styles.funFactsWidget, className)}>
      <span className={styles.bioLabel}>
        <Translate id="bento.bio.label">Fun Fact</Translate>
      </span>
      <p
        className={cn(
          styles.bioContent,
          isRefreshing && styles.bioContentRefreshing
        )}
        onAnimationEnd={() => setIsRefreshing(false)}
      >
        {snippet}
      </p>
      <button
        aria-label={refreshLabel}
        className={styles.bioRefreshButton}
        onClick={handleRefresh}
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </BentoWidget>
  )
}
