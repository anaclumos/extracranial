'use client'

import { translate } from '@docusaurus/Translate'
import { useSigma } from '@react-sigma/core'
import { useCallback } from 'react'
import styles from './styles.module.css'

interface GraphControlsProps {
  selectedNode?: string | null
}

export default function GraphControls({ selectedNode }: GraphControlsProps) {
  const sigma = useSigma()

  const handleZoomIn = useCallback(() => {
    const camera = sigma.getCamera()
    camera.animate({ ratio: camera.ratio / 1.5 }, { duration: 300 })
  }, [sigma])

  const handleZoomOut = useCallback(() => {
    const camera = sigma.getCamera()
    camera.animate({ ratio: camera.ratio * 1.5 }, { duration: 300 })
  }, [sigma])

  const handleReset = useCallback(() => {
    const camera = sigma.getCamera()
    camera.animate({ x: 0.5, y: 0.5, ratio: 1 }, { duration: 500 })
  }, [sigma])

  const handleFocusSelected = useCallback(() => {
    if (selectedNode && sigma.getGraph().hasNode(selectedNode)) {
      const nodePosition = sigma.getNodeDisplayData(selectedNode)
      if (nodePosition) {
        sigma
          .getCamera()
          .animate(
            { x: nodePosition.x, y: nodePosition.y, ratio: 0.3 },
            { duration: 500 }
          )
      }
    }
  }, [sigma, selectedNode])

  return (
    <div className={styles.controlsContainer}>
      <button
        aria-label={translate({
          id: 'graph.controls.zoomIn',
          message: 'Zoom In',
        })}
        className={styles.controlButton}
        onClick={handleZoomIn}
        title={translate({
          id: 'graph.controls.zoomIn.title',
          message: 'Zoom in to see more detail',
        })}
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="18"
          role="img"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
          <line x1="11" x2="11" y1="8" y2="14" />
          <line x1="8" x2="14" y1="11" y2="11" />
        </svg>
      </button>
      <button
        aria-label={translate({
          id: 'graph.controls.zoomOut',
          message: 'Zoom Out',
        })}
        className={styles.controlButton}
        onClick={handleZoomOut}
        title={translate({
          id: 'graph.controls.zoomOut.title',
          message: 'Zoom out to see more of the graph',
        })}
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="18"
          role="img"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
          <line x1="8" x2="14" y1="11" y2="11" />
        </svg>
      </button>
      <button
        aria-label={translate({
          id: 'graph.controls.resetView',
          message: 'Reset View',
        })}
        className={styles.controlButton}
        onClick={handleReset}
        title={translate({
          id: 'graph.controls.resetView.title',
          message: 'Reset view to show the entire graph',
        })}
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="18"
          role="img"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
      {selectedNode && (
        <button
          aria-label={translate({
            id: 'graph.controls.focusSelected',
            message: 'Focus Selected',
          })}
          className={styles.controlButton}
          onClick={handleFocusSelected}
          title={translate({
            id: 'graph.controls.focusSelected.title',
            message: 'Center view on the selected node',
          })}
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="18"
            role="img"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M22 12h-4" />
            <path d="M6 12H2" />
            <path d="M12 6V2" />
            <path d="M12 22v-4" />
          </svg>
        </button>
      )}
    </div>
  )
}
