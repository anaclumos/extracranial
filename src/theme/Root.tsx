import { Cursor, useCursorState } from 'motion-plus/react'
import type { ReactNode } from 'react'

function GlobalCursor() {
  const { zone } = useCursorState()

  return (
    <Cursor
      magnetic
      style={{
        borderRadius: 10,
        mixBlendMode: zone === 'overlay' ? 'difference' : 'multiply',
        pointerEvents: 'none',
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
