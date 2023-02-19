export type AppleMusicArtwork = {
  width: number
  height: number
  url: string
  bgColor: string
  textColor1: string
  textColor2: string
  textColor3: string
  textColor4: string
}

export type AppleMusicPlayParam = {
  id: string
  kind: string
}

export type AppleMusicPreview = {
  url: string
}

export type AppleMusicAttrribute = {
  albumName: string
  genreNames: string[]
  trackNumber: number
  releaseDate: string
  durationInMillis: number
  isrc: string
  artwork: AppleMusicArtwork
  playParams: AppleMusicPlayParam
  url: string
  discNumber: number
  hasLyrics: boolean
  isAppleDigitalMaster: boolean
  name: string
  previews: AppleMusicPreview[]
  artistName: string
}

export type AppleMusicSong = {
  id: string
  type: string
  href: string
  attributes: AppleMusicAttrribute
}

export type AppleMusicData = {
  next: string
  data: AppleMusicSong[]
}
