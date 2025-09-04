"use client"

import { forwardRef } from 'react'
import DefaultPlayer from 'next-video/player'

type AnyProps = Record<string, any>

const AbsolutePathPlayer = forwardRef<HTMLVideoElement, AnyProps>(
  ({ src, ...rest }, ref) => {
    let fixedSrc = src
    if (typeof fixedSrc === 'string') {
      // Ensure absolute path so nested routes don't 404
      if (fixedSrc.startsWith('_next-video/')) {
        fixedSrc = `/${fixedSrc}`
      }
      // In case a content/ path ever sneaks through, map it as well
      if (fixedSrc.startsWith('content/')) {
        fixedSrc = `/${fixedSrc.replace(/^content\//, '_next-video/')}`
      }
    }
    return <DefaultPlayer ref={ref} src={fixedSrc} {...rest} />
  }
)

AbsolutePathPlayer.displayName = 'AbsolutePathPlayer'

export default AbsolutePathPlayer

