import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'
import styles from './styles.module.css'

export const KoreaNetherlandsGlobe = () => {
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

  const locationToAngles = (lat: number, long: number): [number, number] => {
    return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
  }

  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) widthRef.current = canvasRef.current.offsetWidth
    }
    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current as HTMLCanvasElement, {
      devicePixelRatio: 2,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
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
        phiRef.current = phiRef.current * 0.9 + targetPhi.current * 0.1
        thetaRef.current = thetaRef.current * 0.9 + targetTheta.current * 0.1

        state.phi = phiRef.current
        state.theta = thetaRef.current
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
      },
    })

    if (canvasRef.current) canvasRef.current.style.opacity = '1'

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
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
  }

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!pointerDown.current) return
    const dx = clientX - startX.current
    const dy = clientY - startY.current
    const w = widthRef.current || 1
    targetPhi.current = startPhi.current + (dx / w) * Math.PI * 2
    targetTheta.current = clamp(startTheta.current + (dy / w) * Math.PI, -Math.PI / 2, Math.PI / 2)
  }

  const handlePointerUp = () => {
    pointerDown.current = false
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
  }

  const handleCityClick = (lat: number, long: number) => {
    ;[targetPhi.current, targetTheta.current] = locationToAngles(lat, long)
  }

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => handlePointerDown(e.clientX, e.clientY)}
        onPointerMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={(e) => e.touches[0] && handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => e.touches[0] && handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={handlePointerUp}
        className={styles.canvas}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: 0,
          transition: 'opacity 1s ease',
        }}
      />
      <div className={styles.buttonControls}>
        <button className={styles.button} onClick={() => handleCityClick(37.5665, 126.978)}>
          Seoul
        </button>
        <button className={styles.button} onClick={() => handleCityClick(52.3676, 4.9041)}>
          Amsterdam
        </button>
      </div>
    </div>
  )
}
