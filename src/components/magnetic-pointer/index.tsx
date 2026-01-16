import { motion } from 'motion/react'
import { Cursor, useCursorState, useMagneticPull } from 'motion-plus/react'
import { useRef } from 'react'
import styles from './styles.module.css'

export default function MagneticPointer() {
  const ref = useRef<HTMLButtonElement>(null)
  const pull = useMagneticPull(ref, 0.1)

  const { zone } = useCursorState()

  return (
    <div className={styles.container}>
      <div className={styles.glass}>
        <div className={styles.highlight} />
        <div className={styles.rimLight} />
        <motion.button
          aria-label="Go back to appearance settings"
          className={styles.button}
          ref={ref}
          whileTap="pressed"
        >
          <motion.span style={pull} variants={{ pressed: { scale: 0.95 } }}>
            <Chevron />
            Appearance
          </motion.span>
        </motion.button>
      </div>

      <Cursor
        className={styles.cursor}
        magnetic
        style={{
          borderRadius: 10,
          mixBlendMode: zone === 'overlay' ? 'difference' : 'multiply',
        }}
        variants={{
          default: {
            backgroundColor: zone === 'overlay' ? '#eee' : '#7e7e7e',
          },
          pointer: {
            backgroundColor: zone === 'overlay' ? '#fff' : '#ddd',
          },
        }}
      />
    </div>
  )
}

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="20"
      viewBox="0 0 12 20"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2L2 10L10 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}
