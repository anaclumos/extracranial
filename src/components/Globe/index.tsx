import createGlobe, { Marker } from 'cobe'
import React from 'react'
import { useEffect, useRef } from 'react'
import styles from './index.module.css'
import { useSpring } from 'react-spring'
import { coordinates, travels } from '@site/src/util/travels'

const markers: Marker[] = coordinates()
const markersHistory: {
  from: Marker
  to: Marker
}[] = travels

const locationToAngles = (lat, long) => {
  return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
}

export const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  if (!canvasRef) {
    return null
  }
  useSpring(() => ({
    r: 0,
    config: {
      mass: 0.1,
      tension: 100,
      friction: 40,
      precision: 0.001,
    },
  }))
  const focusRef = useRef([0, 0])
  useEffect(() => {
    let currentPhi = 0
    let currentTheta = 0
    let width = 0
    const doublePi = Math.PI * 2
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: (23.5 * Math.PI) / 180,
      dark: 1,
      diffuse: 0.2,
      mapSamples: 24000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [121 / 256, 181 / 256, 242 / 256],
      glowColor: [0.5, 0.5, 0.5],
      markers: markers,
      onRender: (state) => {
        state.phi = currentPhi
        state.theta = currentTheta
        const [focusPhi, focusTheta] = focusRef.current
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi
        // Control the speed
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08
        } else {
          currentPhi -= distNegative * 0.08
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08
        state.width = width * 2
        state.height = width * 2
      },
    })
    setTimeout(() => (canvasRef.current.style.opacity = '1'))
    const interval = setInterval(() => {
      const { from, to } = markersHistory[0]
      const [phiFrom, thetaFrom] = locationToAngles(from.location[0], from.location[1])
      focusRef.current = [phiFrom, thetaFrom]
      markersHistory.shift()
      markersHistory.push({ from, to })
    }, 1000)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', onResize)
      globe.destroy()
    }
  }, [])

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.globe} />
    </div>
  )
}
