import { motion } from 'motion/react'
import { Cursor, useCursorState, useMagneticPull } from 'motion-plus/react'
import { useEffect, useId, useRef } from 'react'
import styles from './styles.module.css'

export default function MagneticPointer() {
  const ref = useRef<HTMLButtonElement>(null)
  const glassRef = useRef<HTMLDivElement>(null)
  const filterId = `liquid-glass-${useId().replace(/:/g, '')}`
  const pull = useMagneticPull(ref, 0.1)

  const { zone } = useCursorState()

  return (
    <div className={styles.container}>
      <LiquidGlassFilter filterId={filterId} targetRef={glassRef} />
      <div
        className={styles.glass}
        ref={glassRef}
        style={{
          backdropFilter: `url(#${filterId}) blur(8px) brightness(1.1) saturate(1.2)`,
          WebkitBackdropFilter: `url(#${filterId}) blur(8px) brightness(1.1) saturate(1.2)`,
        }}
      >
        <motion.button className={styles.button} ref={ref} whileTap="pressed">
          <motion.span style={pull} variants={{ pressed: { scale: 0.95 } }}>
            <Chevron />
            Appearance
          </motion.span>
        </motion.button>
      </div>

      <Cursor
        className={styles.cursor}
        magnetic
        style={{
          borderRadius: 10,
          mixBlendMode: zone === 'overlay' ? 'difference' : 'multiply',
        }}
        variants={{
          default: {
            backgroundColor: zone === 'overlay' ? '#eee' : '#7e7e7e',
          },
          pointer: {
            backgroundColor: zone === 'overlay' ? '#fff' : '#ddd',
          },
        }}
      />
    </div>
  )
}

interface LiquidGlassFilterProps {
  filterId: string
  targetRef: React.RefObject<HTMLElement | null>
}

function LiquidGlassFilter({ filterId, targetRef }: LiquidGlassFilterProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const filterRef = useRef<SVGFilterElement>(null)
  const feImageRef = useRef<SVGFEImageElement>(null)
  const feDisplacementRef = useRef<SVGFEDisplacementMapElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const element = targetRef.current
    if (!element) {
      return
    }

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    canvasRef.current = canvas

    const smoothStep = (a: number, b: number, t: number) => {
      const clamped = Math.max(0, Math.min(1, (t - a) / (b - a)))
      return clamped * clamped * (3 - 2 * clamped)
    }

    const length = (x: number, y: number) => Math.sqrt(x * x + y * y)

    const roundedRectSDF = (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) => {
      const qx = Math.abs(x) - width + radius
      const qy = Math.abs(y) - height + radius
      return (
        Math.min(Math.max(qx, qy), 0) +
        length(Math.max(qx, 0), Math.max(qy, 0)) -
        radius
      )
    }

    const updateShader = () => {
      const rect = element.getBoundingClientRect()
      const width = Math.max(1, Math.round(rect.width))
      const height = Math.max(1, Math.round(rect.height))
      const dpi = 0.75
      const w = Math.max(32, Math.round(width * dpi))
      const h = Math.max(32, Math.round(height * dpi))

      canvas.width = w
      canvas.height = h

      if (svgRef.current) {
        svgRef.current.setAttribute('width', width.toString())
        svgRef.current.setAttribute('height', height.toString())
      }

      if (filterRef.current) {
        filterRef.current.setAttribute('x', '0')
        filterRef.current.setAttribute('y', '0')
        filterRef.current.setAttribute('width', width.toString())
        filterRef.current.setAttribute('height', height.toString())
      }

      const data = new Uint8ClampedArray(w * h * 4)
      const rawValues: number[] = []
      let maxScale = 0

      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % w
        const y = Math.floor(i / 4 / w)
        const uvx = x / w
        const uvy = y / h
        const ix = uvx - 0.5
        const iy = uvy - 0.5
        const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6)
        const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15)
        const scaled = smoothStep(0, 1, displacement)
        const targetX = ix * scaled + 0.5
        const targetY = iy * scaled + 0.5
        const dx = targetX * w - x
        const dy = targetY * h - y
        maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy))
        rawValues.push(dx, dy)
      }

      maxScale = Math.max(0.001, maxScale * 0.5)

      let index = 0
      for (let i = 0; i < data.length; i += 4) {
        const r = rawValues[index++] / maxScale + 0.5
        const g = rawValues[index++] / maxScale + 0.5
        data[i] = r * 255
        data[i + 1] = g * 255
        data[i + 2] = 0
        data[i + 3] = 255
      }

      context.putImageData(new ImageData(data, w, h), 0, 0)

      if (feImageRef.current) {
        feImageRef.current.setAttribute('href', canvas.toDataURL('image/png'))
        feImageRef.current.setAttribute('width', width.toString())
        feImageRef.current.setAttribute('height', height.toString())
      }

      if (feDisplacementRef.current) {
        feDisplacementRef.current.setAttribute(
          'scale',
          (maxScale / dpi).toString()
        )
      }
    }

    updateShader()
    const observer = new ResizeObserver(updateShader)
    observer.observe(element)

    return () => {
      observer.disconnect()
      canvas.remove()
    }
  }, [targetRef])

  return (
    <svg
      aria-hidden="true"
      className={styles.filter}
      focusable="false"
      ref={svgRef}
    >
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          id={filterId}
          ref={filterRef}
        >
          <feImage ref={feImageRef} result="map" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            ref={feDisplacementRef}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="20"
      viewBox="0 0 12 20"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2L2 10L10 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}
