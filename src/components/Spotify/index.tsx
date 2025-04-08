import type { JSX } from 'react'

type Props = {
  url: string
}

const SpotifySong = ({ url }: Props) => {
  return (
    <iframe
      title='Spotify'
      style={{ borderRadius: '12' }}
      src={url}
      width='100%'
      height='152'
      allowFullScreen={false}
      allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
      loading='lazy'
    />
  )
}

export default SpotifySong
