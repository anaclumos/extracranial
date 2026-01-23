'use client'

import Translate, { translate } from '@docusaurus/Translate'
import { useCallback, useState } from 'react'
import styles from './styles.module.css'

export interface GraphSettingsValues {
  labelThreshold: number
  linkThickness: number
  centerForce: number
  repelForce: number
  linkForce: number
  linkDistance: number
}

interface GraphSettingsProps {
  values: GraphSettingsValues
  onChange: (values: GraphSettingsValues) => void
  onStartTimelapse: () => void
  onStopTimelapse: () => void
  isTimelapseRunning: boolean
}

const DEFAULT_VALUES: GraphSettingsValues = {
  labelThreshold: 8,
  linkThickness: 1.5,
  centerForce: 0.0001,
  repelForce: 50_000,
  linkForce: 0.5,
  linkDistance: 50,
}

export { DEFAULT_VALUES }

export default function GraphSettings({
  values,
  onChange,
  onStartTimelapse,
  onStopTimelapse,
  isTimelapseRunning,
}: GraphSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [])

  const handleChange = useCallback(
    (key: keyof GraphSettingsValues, value: number) => {
      onChange({ ...values, [key]: value })
    },
    [values, onChange]
  )

  const handleReset = useCallback(() => {
    onChange(DEFAULT_VALUES)
  }, [onChange])

  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.settingsButtons}>
        <button
          aria-label={
            isTimelapseRunning
              ? translate({
                  id: 'graph.settings.timelapse.stop.label',
                  message: 'Stop timelapse',
                })
              : translate({
                  id: 'graph.settings.timelapse.start.label',
                  message: 'Start timelapse',
                })
          }
          className={styles.settingsButton}
          onClick={isTimelapseRunning ? onStopTimelapse : onStartTimelapse}
          title={
            isTimelapseRunning
              ? translate({
                  id: 'graph.settings.timelapse.stop',
                  message: 'Stop the timelapse animation',
                })
              : translate({
                  id: 'graph.settings.timelapse.start',
                  message: 'Watch the graph build up over time',
                })
          }
          type="button"
        >
          {isTimelapseRunning ? (
            <svg
              aria-hidden="true"
              fill="currentColor"
              height="18"
              role="img"
              viewBox="0 0 24 24"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect height="16" width="4" x="6" y="4" />
              <rect height="16" width="4" x="14" y="4" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              fill="currentColor"
              height="18"
              role="img"
              viewBox="0 0 24 24"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
        <button
          aria-expanded={isOpen}
          aria-label={translate({
            id: 'graph.settings.button.label',
            message: 'Graph settings',
          })}
          className={styles.settingsButton}
          data-active={isOpen}
          onClick={toggleOpen}
          title={translate({
            id: 'graph.settings.button.title',
            message: 'Adjust graph visualization settings',
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
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className={styles.settingsPanel}>
          <div className={styles.settingsHeader}>
            <span>
              <Translate id="graph.settings.title">Graph Settings</Translate>
            </span>
            <button
              className={styles.resetButton}
              onClick={handleReset}
              title={translate({
                id: 'graph.settings.reset.title',
                message: 'Reset all settings to defaults',
              })}
              type="button"
            >
              <Translate id="graph.settings.reset">Reset</Translate>
            </button>
          </div>

          <div className={styles.settingItem}>
            <label htmlFor="labelThreshold">
              <Translate id="graph.settings.labelThreshold">
                Label Threshold
              </Translate>
              <span className={styles.settingValue}>
                {values.labelThreshold}
              </span>
            </label>
            <input
              autoComplete="off"
              id="labelThreshold"
              max="30"
              min="1"
              name="labelThreshold"
              onChange={(e) =>
                handleChange('labelThreshold', Number(e.target.value))
              }
              step="1"
              type="range"
              value={values.labelThreshold}
            />
          </div>

          <div className={styles.settingItem}>
            <label htmlFor="linkThickness">
              <Translate id="graph.settings.linkThickness">
                Link Thickness
              </Translate>
              <span className={styles.settingValue}>
                {values.linkThickness.toFixed(1)}
              </span>
            </label>
            <input
              autoComplete="off"
              id="linkThickness"
              max="5"
              min="0.5"
              name="linkThickness"
              onChange={(e) =>
                handleChange('linkThickness', Number(e.target.value))
              }
              step="0.5"
              type="range"
              value={values.linkThickness}
            />
          </div>

          <div className={styles.settingItem}>
            <label htmlFor="centerForce">
              <Translate id="graph.settings.gravity">Gravity</Translate>
              <span className={styles.settingValue}>
                {values.centerForce.toFixed(4)}
              </span>
            </label>
            <input
              autoComplete="off"
              id="centerForce"
              max="0.01"
              min="0"
              name="centerForce"
              onChange={(e) =>
                handleChange('centerForce', Number(e.target.value))
              }
              step="0.0005"
              type="range"
              value={values.centerForce}
            />
          </div>

          <div className={styles.settingItem}>
            <label htmlFor="repelForce">
              <Translate id="graph.settings.repulsion">Repulsion</Translate>
              <span className={styles.settingValue}>
                {values.repelForce.toLocaleString()}
              </span>
            </label>
            <input
              autoComplete="off"
              id="repelForce"
              max="100000"
              min="1000"
              name="repelForce"
              onChange={(e) =>
                handleChange('repelForce', Number(e.target.value))
              }
              step="1000"
              type="range"
              value={values.repelForce}
            />
          </div>

          <div className={styles.settingItem}>
            <label htmlFor="linkForce">
              <Translate id="graph.settings.edgePull">Edge Pull</Translate>
              <span className={styles.settingValue}>
                {values.linkForce.toFixed(2)}
              </span>
            </label>
            <input
              autoComplete="off"
              id="linkForce"
              max="1"
              min="0"
              name="linkForce"
              onChange={(e) =>
                handleChange('linkForce', Number(e.target.value))
              }
              step="0.05"
              type="range"
              value={values.linkForce}
            />
          </div>
        </div>
      )}
    </div>
  )
}
