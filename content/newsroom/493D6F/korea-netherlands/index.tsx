'use client'

import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

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
      dark: 0,
      diffuse: 1.5,
      mapSamples: 20000,
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
        if (canvasRef.current) canvasRef.current.style.opacity = '1'
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

  const handleCityClick = (lat: number, long: number, city: string) => {
    ;[targetPhi.current, targetTheta.current] = locationToAngles(lat, long)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8 shadow-xl">
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => handlePointerDown(e.clientX, e.clientY)}
          onPointerMove={(e) => handlePointerMove(e.clientX, e.clientY)}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onTouchStart={(e) => e.touches[0] && handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={(e) => e.touches[0] && handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={handlePointerUp}
          className={cn(
            'absolute inset-0 w-full h-full cursor-grab transition-opacity duration-500',
            'hover:scale-[1.02] transition-transform duration-300'
          )}
          style={{
            contain: 'layout style paint',
            opacity: 0,
          }}
        />
      </div>

      <div className="flex gap-4 justify-center mt-8">
        <button
          onClick={() => handleCityClick(52.3676, 4.9041, 'Amsterdam')}
          className={cn(
            'group relative px-6 py-3 rounded-xl',
            'bg-white dark:bg-slate-800',
            'border-2 border-slate-200 dark:border-slate-700',
            'hover:border-blue-500 dark:hover:border-blue-400',
            'transition-all duration-200 ease-out',
            'shadow-md hover:shadow-lg',
            'hover:-translate-y-0.5'
          )}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇳🇱</span>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Netherlands</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Amsterdam</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleCityClick(37.5665, 126.978, 'Seoul')}
          className={cn(
            'group relative px-6 py-3 rounded-xl',
            'bg-white dark:bg-slate-800',
            'border-2 border-slate-200 dark:border-slate-700',
            'hover:border-blue-500 dark:hover:border-blue-400',
            'transition-all duration-200 ease-out',
            'shadow-md hover:shadow-lg',
            'hover:-translate-y-0.5'
          )}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇰🇷</span>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">South Korea</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Seoul</p>
            </div>
          </div>
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">Drag to rotate • Click buttons to navigate</p>
      </div>
    </div>
  )
}
