import { Cursor, useCursorState } from 'motion-plus/react'
import type { ReactNode } from 'react'

// Liquid-glass-js inspired parameters (translated to CSS opacity/intensity)
// Edge Intensity: 0.01, Rim Intensity: 0.05, Tint Opacity: 0.2
const EDGE_OPACITY = 0.1 // 0.01 * 10 for visibility
const RIM_OPACITY = 0.5 // 0.05 * 10 for visibility
const TINT_OPACITY = 0.2
const CORNER_BOOST = 0.2 // 0.02 * 10

function GlobalCursor() {
  const { zone } = useCursorState()

  return (
    <Cursor
      magnetic
      style={{
        borderRadius: 10,
        mixBlendMode: zone === 'overlay' ? 'difference' : 'normal',
        pointerEvents: 'none',
        // NO backdrop-filter, NO blur - fully transparent
        // Rim border (edge intensity 0.01 → subtle)
        border: `1px solid rgba(255, 255, 255, ${EDGE_OPACITY})`,
        // Multi-layer effects based on liquid-glass parameters
        boxShadow: [
          // Rim highlight - top (rim intensity 0.05)
          `inset 0 1px 0 rgba(255, 255, 255, ${RIM_OPACITY})`,
          // Rim shadow - bottom
          `inset 0 -1px 0 rgba(0, 0, 0, ${EDGE_OPACITY})`,
          // Corner boost highlights (corner boost 0.02)
          `inset 1px 1px 2px rgba(255, 255, 255, ${CORNER_BOOST})`,
          `inset -1px -1px 2px rgba(0, 0, 0, ${CORNER_BOOST * 0.5})`,
          // Outer depth shadow (no blur spread)
          `0 1px 3px rgba(0, 0, 0, ${EDGE_OPACITY})`,
        ].join(', '),
        // Tint gradient (tint opacity 0.2) - simulates glass surface light variation
        background:
          zone === 'overlay'
            ? `linear-gradient(180deg, rgba(255,255,255,${TINT_OPACITY}) 0%, rgba(255,255,255,${TINT_OPACITY * 0.15}) 50%, rgba(200,200,200,${TINT_OPACITY * 0.5}) 100%)`
            : `linear-gradient(180deg, rgba(255,255,255,${TINT_OPACITY}) 0%, rgba(255,255,255,${TINT_OPACITY * 0.15}) 50%, rgba(180,180,180,${TINT_OPACITY * 0.5}) 100%)`,
      }}
      variants={{
        default: {
          scale: 1,
        },
        pointer: {
          scale: 1.05,
        },
      }}
    />
  )
}

export default function Root({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <GlobalCursor />
    </>
  )
}
