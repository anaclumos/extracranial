import React from 'react'

type Props = {
  url: string
}

const SpotifySong = ({ url }: Props) => {
  return (
    <iframe
      style={{ borderRadius: '12' }}
      src={url}
      width="100%"
      height="152"
      allowFullScreen={false}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  )
}

export default SpotifySong
