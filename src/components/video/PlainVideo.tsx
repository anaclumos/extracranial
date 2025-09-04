"use client"

import * as React from 'react'

type Props = React.ComponentProps<'video'> & {
  asset?: any
  onPlaying?: () => void
  onPause?: () => void
}

const PlainVideo = React.forwardRef<HTMLVideoElement, Props>(
  ({ onPlaying, onPause, style, ...rest }, ref) => {
    return (
      <video
        ref={ref}
        controls={rest.controls !== false}
        onPlay={onPlaying}
        onPause={onPause}
        style={{ width: '100%', height: 'auto', display: 'block', ...style }}
        {...rest}
      />
    )
  }
)

PlainVideo.displayName = 'PlainVideo'

export default PlainVideo

