import { Cursor, useCursorState } from 'motion-plus/react'
import type { ReactNode } from 'react'

function GlobalCursor() {
  const { zone } = useCursorState()

  return (
    <Cursor
      magnetic
      style={{
        borderRadius: 10,
        mixBlendMode: zone === 'overlay' ? 'difference' : 'normal',
        pointerEvents: 'none',
        backdropFilter: 'blur(8px) saturate(1.2) brightness(1.05)',
        WebkitBackdropFilter: 'blur(8px) saturate(1.2) brightness(1.05)',
        boxShadow:
          '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
      }}
      variants={{
        default: {
          backgroundColor:
            zone === 'overlay'
              ? 'rgba(238, 238, 238, 0.15)'
              : 'rgba(126, 126, 126, 0.15)',
        },
        pointer: {
          backgroundColor:
            zone === 'overlay'
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(221, 221, 221, 0.2)',
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
