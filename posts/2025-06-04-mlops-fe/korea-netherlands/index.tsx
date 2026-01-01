'use client'

import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'
import styles from './index.module.css'

interface Props {
  lang?: 'ko' | 'en'
}

export const KoreaNetherlandsGlobe = ({ lang = 'en' }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const pointerDown = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const startPhi = useRef(0)
  const startTheta = useRef(0)

  const phiRef = useRef(0)
  const thetaRef = useRef(0)
  const targetPhi = useRef(0)
  const targetTheta = useRef(0)
  const widthRef = useRef(0)

  const toAngles = (lat: number, lng: number): [number, number] => [
    Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ]

  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max)

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }
    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current as HTMLCanvasElement, {
      devicePixelRatio: 2,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.5,
      mapSamples: 20_000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.1, 0.1, 0.1],
      markers: [
        { location: [37.5665, 126.978], size: 0.08 },
        { location: [52.3676, 4.9041], size: 0.08 },
      ],
      onRender: (state) => {
        phiRef.current = phiRef.current * 0.9 + targetPhi.current * 0.1
        thetaRef.current = thetaRef.current * 0.9 + targetTheta.current * 0.1

        state.phi = phiRef.current
        state.theta = thetaRef.current
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
      },
    })

    if (canvasRef.current) {
      canvasRef.current.style.opacity = '0'
      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = '1'
        }
      }, 100)
    }

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const handlePointerDown = (clientX: number, clientY: number) => {
    pointerDown.current = true
    startX.current = clientX
    startY.current = clientY
    startPhi.current = targetPhi.current
    startTheta.current = targetTheta.current
  }

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!pointerDown.current) {
      return
    }
    const dx = clientX - startX.current
    const dy = clientY - startY.current
    const w = widthRef.current || 1
    targetPhi.current = startPhi.current + (dx / w) * Math.PI * 2
    targetTheta.current = clamp(
      startTheta.current + (dy / w) * Math.PI,
      -Math.PI / 2,
      Math.PI / 2
    )
  }

  const handlePointerUp = () => {
    pointerDown.current = false
  }

  const handleCityClick = (lat: number, lng: number) => {
    ;[targetPhi.current, targetTheta.current] = toAngles(lat, lng)
  }

  const labels = {
    netherlands:
      lang === 'ko' ? '네덜란드 · 암스테르담' : 'Netherlands · Amsterdam',
    korea: lang === 'ko' ? '대한민국 · 서울' : 'South Korea · Seoul',
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.canvasWrapper}>
            <canvas
              className={styles.canvas}
              onPointerDown={(e) => handlePointerDown(e.clientX, e.clientY)}
              onPointerLeave={handlePointerUp}
              onPointerMove={(e) => handlePointerMove(e.clientX, e.clientY)}
              onPointerUp={handlePointerUp}
              ref={canvasRef}
              style={{ opacity: 0 }}
            />
          </div>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={() => handleCityClick(52.3676, 4.9041)}
          type="button"
        >
          <span className={styles.emoji}>&#x1F1F3;&#x1F1F1;</span>
          <span className={styles.label}>{labels.netherlands}</span>
        </button>
        <button
          className={styles.button}
          onClick={() => handleCityClick(37.5665, 126.978)}
          type="button"
        >
          <span className={styles.emoji}>&#x1F1F0;&#x1F1F7;</span>
          <span className={styles.label}>{labels.korea}</span>
        </button>
      </div>
    </div>
  )
}
