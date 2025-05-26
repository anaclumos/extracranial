import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'

import styles from './styles.module.css'

export const KoreaNetherlandsGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const locationToAngles = (lat, long) => {
    return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
  }
  const focusRef = useRef(locationToAngles(37.5665, 126.978))
  useEffect(() => {
    let width = 0
    let currentPhi = 0
    let currentTheta = 0
    const doublePi = Math.PI * 2
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [1, 1, 1],
      glowColor: [1.2, 1.2, 1.2],
      markers: [
        { location: [37.5665, 126.978], size: 0.05 },
        { location: [52.3676, 4.9041], size: 0.05 },
      ],
      onRender: (state) => {
        state.phi = currentPhi
        state.theta = currentTheta
        const [focusPhi, focusTheta] = focusRef.current
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.04
        } else {
          currentPhi -= distNegative * 0.04
        }
        currentTheta = currentTheta * 0.96 + focusTheta * 0.04
        state.width = width * 2
        state.height = width * 2
      },
    })
    setTimeout(() => (canvasRef.current.style.opacity = '1'))
    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles['button-controls']}>
        <button
          className={styles.button}
          onClick={() => {
            focusRef.current = locationToAngles(37.5665, 126.978)
          }}
        >
          Seoul, Korea
        </button>
        <button
          className={styles.button}
          onClick={() => {
            focusRef.current = locationToAngles(52.3676, 4.9041)
          }}
        >
          Amsterdam, Netherlands
        </button>
      </div>
    </div>
  )
}
