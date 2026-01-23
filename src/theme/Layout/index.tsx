import { useColorMode } from '@docusaurus/theme-common'
import Layout from '@theme-original/Layout'
import { Cursor, useCursorState } from 'motion-plus/react'
import type { ComponentProps, CSSProperties } from 'react'
import { useMemo } from 'react'

const EDGE_OPACITY = 0.1
const RIM_OPACITY = 0.5
const TINT_OPACITY = 0.2
const CORNER_BOOST = 0.2

const CURSOR_VARIANTS = {
  default: { scale: 1 },
  pointer: { scale: 1.05 },
} as const

function GlobalCursor() {
  const { zone } = useCursorState()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const cursorStyle = useMemo((): CSSProperties => {
    const edgeColor = isDark ? '255, 255, 255' : '26, 33, 24'
    const tintColor = isDark ? '255, 255, 255' : '26, 33, 24'
    const tintOpacity = isDark ? TINT_OPACITY : 0.35
    const overlayBottom = isDark ? '200, 200, 200' : tintColor
    const normalBottom = isDark ? '180, 180, 180' : tintColor

    return {
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
    }
  }, [isDark, zone])

  return <Cursor magnetic style={cursorStyle} variants={CURSOR_VARIANTS} />
}

export default function LayoutWrapper(props: ComponentProps<typeof Layout>) {
  const { children, ...rest } = props

  return (
    <Layout {...rest}>
      {children}
      <GlobalCursor />
    </Layout>
  )
}
