'use client'

import { translate } from '@docusaurus/Translate'
import { useSigma } from '@react-sigma/core'
import { useCallback, useMemo, useState } from 'react'
import styles from './styles.module.css'

interface GraphSearchProps {
  onSelect: (nodeId: string) => void
}

export default function GraphSearch({ onSelect }: GraphSearchProps) {
  const sigma = useSigma()
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) {
      return []
    }

    const graph = sigma.getGraph()
    const lowerQuery = query.toLowerCase()

    return graph
      .nodes()
      .filter((nodeId) => {
        const attrs = graph.getNodeAttributes(nodeId)
        const label = (attrs.label as string) || nodeId
        return label.toLowerCase().includes(lowerQuery)
      })
      .slice(0, 10)
      .map((nodeId) => {
        const attrs = graph.getNodeAttributes(nodeId)
        return {
          id: nodeId,
          label: (attrs.label as string) || nodeId,
        }
      })
  }, [sigma, query])

  const handleSelect = useCallback(
    (nodeId: string) => {
      onSelect(nodeId)
      setQuery('')
      setIsOpen(false)

      const nodePosition = sigma.getNodeDisplayData(nodeId)
      if (nodePosition) {
        sigma
          .getCamera()
          .animate(
            { x: nodePosition.x, y: nodePosition.y, ratio: 0.3 },
            { duration: 500 }
          )
      }
    },
    [sigma, onSelect]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
      setIsOpen(true)
    },
    []
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && results.length > 0) {
        const firstResult = results[0]
        if (firstResult) {
          handleSelect(firstResult.id)
        }
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
      }
    },
    [results, handleSelect]
  )

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={translate({
          id: 'graph.search.placeholder',
          message: 'Search notes...',
        })}
        title={translate({
          id: 'graph.search.title',
          message: 'Search for notes by name and navigate to them',
        })}
        type="text"
        value={query}
      />
      {isOpen && results.length > 0 && (
        <ul className={styles.searchResults}>
          {results.map((result) => (
            <li key={result.id}>
              <button
                className={styles.searchResultItem}
                onClick={() => handleSelect(result.id)}
                type="button"
              >
                {result.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
