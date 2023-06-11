import React, { useEffect, useState } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './neo.module.css'
import WidgetItem from '../components/WidgetItem'

import emptyAlbumCover from '../AppleMusic/empty.png'

import musicIcon from '../AppleMusic/music.png'

import githubIcon from '../../static/img/github-mark-white.png'

import profile from '../../static/img/profile.jpg'

import { AppleMusicAttrribute, AppleMusicData } from '../AppleMusic/type'

export const NowPlaying = async (): Promise<AppleMusicData> => {
  const data = await fetch('https://raw.githubusercontent.com/anaclumos/now-playing/main/now-playing.json').then(
    (res) => res.json()
  )
  return data
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  const [song, setSong] = useState<AppleMusicAttrribute>()
  useEffect(() => {
    const fetchSong = async () => {
      NowPlaying().then((data: AppleMusicData) => {
        setSong(data.data[0]?.attributes)
      })
    }
    fetchSong().catch(console.error)
  }, [])

  let imageUrl = song?.artwork?.url?.replace('{w}', '500').replace('{h}', '500') ?? ''
  const [imgSrc, setImgSrc] = useState<string>()
  useEffect(() => {
    imageUrl = song?.artwork?.url?.replace('{w}', '500').replace('{h}', '500') ?? ''
    setImgSrc(imageUrl.length > 0 && !imageUrl.includes('apple.com') ? imageUrl : emptyAlbumCover)
  }, [song])

  return (
    <Layout title={`${siteConfig.title}`} description={siteConfig.tagline}>
      <main className={styles.mainContainer}>
        <div className={styles.grid}>
          <WidgetItem
            title="Sunghyun"
            description="Hey There!"
            image={profile}
            icon={githubIcon}
            gradientStart="#020304"
            gradientEnd="#010204"
          />
          <WidgetItem
            title={song?.name}
            description={song?.artistName}
            image={imgSrc}
            icon={musicIcon}
            gradientStart="#FB5C74"
            gradientEnd="#FA233D"
            link={song?.url}
          />
          <WidgetItem
            title={song?.name}
            description={song?.artistName}
            image={imgSrc}
            icon={musicIcon}
            gradientStart="#FB5C74"
            gradientEnd="#FA233D"
            link={song?.url}
          />
          <WidgetItem
            title={song?.name}
            description={song?.artistName}
            image={imgSrc}
            icon={musicIcon}
            gradientStart="#FB5C74"
            gradientEnd="#FA233D"
            link={song?.url}
          />
          <WidgetItem
            title={song?.name}
            description={song?.artistName}
            image={imgSrc}
            icon={musicIcon}
            gradientStart="#FB5C74"
            gradientEnd="#FA233D"
            link={song?.url}
          />
          <WidgetItem
            title={song?.name}
            description={song?.artistName}
            image={imgSrc}
            icon={musicIcon}
            gradientStart="#FB5C74"
            gradientEnd="#FA233D"
            link={song?.url}
          />
          <WidgetItem
            title={song?.name}
            description={song?.artistName}
            image={imgSrc}
            icon={musicIcon}
            gradientStart="#FB5C74"
            gradientEnd="#FA233D"
            link={song?.url}
          />
          <WidgetItem
            title={song?.name}
            description={song?.artistName}
            image={imgSrc}
            icon={musicIcon}
            gradientStart="#FB5C74"
            gradientEnd="#FA233D"
            link={song?.url}
          />
          <WidgetItem
            title={song?.name}
            description={song?.artistName}
            image={imgSrc}
            icon={musicIcon}
            gradientStart="#FB5C74"
            gradientEnd="#FA233D"
            link={song?.url}
          />
          <WidgetItem
            title={song?.name}
            description={song?.artistName}
            image={imgSrc}
            icon={musicIcon}
            gradientStart="#FB5C74"
            gradientEnd="#FA233D"
            link={song?.url}
          />
        </div>
      </main>
    </Layout>
  )
}
