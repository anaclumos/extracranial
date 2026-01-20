import { useColorMode } from '@docusaurus/theme-common'
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
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const edgeColor = isDark ? '255, 255, 255' : '26, 33, 24'
  const tintColor = isDark ? '255, 255, 255' : '26, 33, 24'
  const tintOpacity = isDark ? TINT_OPACITY : 0.35
  const overlayBottom = isDark ? '200, 200, 200' : tintColor
  const normalBottom = isDark ? '180, 180, 180' : tintColor

  return (
    <Cursor
      magnetic
      style={{
        borderRadius: 10,
        mixBlendMode: zone === 'overlay' ? 'difference' : 'normal',
        pointerEvents: 'none',
        border: `1px solid rgba(${edgeColor}, ${EDGE_OPACITY})`,
        boxShadow: [
          `inset 0 1px 0 rgba(255, 255, 255, ${RIM_OPACITY})`,
          `inset 0 -1px 0 rgba(0, 0, 0, ${EDGE_OPACITY})`,
          `inset 1px 1px 2px rgba(255, 255, 255, ${CORNER_BOOST})`,
          `inset -1px -1px 2px rgba(0, 0, 0, ${CORNER_BOOST * 0.5})`,
          `0 1px 3px rgba(0, 0, 0, ${EDGE_OPACITY})`,
        ].join(', '),
        background:
          zone === 'overlay'
            ? `linear-gradient(180deg, rgba(${tintColor}, ${tintOpacity}) 0%, rgba(${tintColor}, ${tintOpacity * 0.15}) 50%, rgba(${overlayBottom}, ${tintOpacity * 0.5}) 100%)`
            : `linear-gradient(180deg, rgba(${tintColor}, ${tintOpacity}) 0%, rgba(${tintColor}, ${tintOpacity * 0.15}) 50%, rgba(${normalBottom}, ${tintOpacity * 0.5}) 100%)`,
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
