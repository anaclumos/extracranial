import createGlobe from 'cobe'
import React from 'react'
import { useEffect, useRef } from 'react'
import { Coordinate } from '../../util/coordinate'
import { globePathDrawer } from '../../util/globePathDrawer'
import styles from './index.module.css'
const seoul: Coordinate = { location: [37.5665, 126.978], size: 0.05 }
const losangeles: Coordinate = { location: [34.0522, 241.7563], size: 0.05 }

export const Globe = () => {
  const canvasRef = useRef()
  useEffect(() => {
    let rotation = 0
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1200,
      height: 1200,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 0.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [85 / 256, 151 / 256, 236 / 256],
      glowColor: [0.5, 0.5, 0.5],
      scale: 1,
      offset: [0, 0],
      markers: globePathDrawer(seoul, losangeles, 64, 0.01),
      onRender: (state) => {
        state.phi = rotation
        rotation += 0.005
      },
    })
    return () => {
      globe.destroy()
    }
  }, [])
  return <canvas ref={canvasRef} className={styles.globe} />
}
