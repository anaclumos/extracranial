'use client'

import { translate } from '@docusaurus/Translate'
import { useSigma } from '@react-sigma/core'
import { useCallback, useDeferredValue, useId, useMemo, useState } from 'react'
import styles from './styles.module.css'

interface GraphSearchProps {
  onSelect: (nodeId: string) => void
}

export default function GraphSearch({ onSelect }: GraphSearchProps) {
  const sigma = useSigma()
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const listboxId = useId()
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(() => {
    const trimmedQuery = deferredQuery.trim()
    if (!trimmedQuery || trimmedQuery.length < 2) {
      return []
    }

    const graph = sigma.getGraph()
    const lowerQuery = trimmedQuery.toLowerCase()

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
  }, [sigma, deferredQuery])

  const handleSelect = useCallback(
    (nodeId: string) => {
      onSelect(nodeId)
      setQuery('')
      setIsOpen(false)
      setActiveIndex(-1)

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
      setActiveIndex(-1)
    },
    []
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || results.length === 0) {
        if (e.key === 'Escape') {
          setIsOpen(false)
          setQuery('')
        }
        return
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setActiveIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1))
          break
        case 'Enter': {
          e.preventDefault()
          const selectedResult = results[activeIndex] ?? results[0]
          if (selectedResult) {
            handleSelect(selectedResult.id)
          }
          break
        }
        case 'Escape':
          setIsOpen(false)
          setQuery('')
          setActiveIndex(-1)
          break
        default:
          break
      }
    },
    [isOpen, results, activeIndex, handleSelect]
  )

  const handleFocus = useCallback(() => setIsOpen(true), [])

  const getOptionId = useCallback(
    (index: number) => `${listboxId}-option-${index}`,
    [listboxId]
  )

  return (
    <div className={styles.searchContainer}>
      <input
        aria-activedescendant={
          activeIndex >= 0 ? getOptionId(activeIndex) : undefined
        }
        aria-autocomplete="list"
        aria-controls={isOpen && results.length > 0 ? listboxId : undefined}
        aria-expanded={isOpen && results.length > 0}
        aria-label={translate({
          id: 'graph.search.label',
          message: 'Search notes',
        })}
        autoComplete="off"
        className={styles.searchInput}
        name="graph-search"
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={translate({
          id: 'graph.search.placeholder',
          message: 'Search notes\u2026 (e.g. "graph")',
        })}
        role="combobox"
        title={translate({
          id: 'graph.search.title',
          message: 'Search for notes by name and navigate to them',
        })}
        type="text"
        value={query}
      />
      {isOpen && results.length > 0 && (
        <div
          aria-label={translate({
            id: 'graph.search.results.label',
            message: 'Search results',
          })}
          className={styles.searchResults}
          id={listboxId}
          role="listbox"
        >
          {results.map((result, index) => (
            <button
              aria-selected={index === activeIndex}
              className={styles.searchResultItem}
              data-active={index === activeIndex}
              id={getOptionId(index)}
              key={result.id}
              onClick={() => handleSelect(result.id)}
              onMouseEnter={() => setActiveIndex(index)}
              role="option"
              tabIndex={-1}
              type="button"
            >
              {result.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
