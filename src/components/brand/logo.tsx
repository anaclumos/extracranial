import type { CSSProperties } from "react"

interface LogoProps {
  className?: string
  size?: number
  style?: CSSProperties
}

/**
 * Coscientist Logo - The Monolith
 *
 * 3 vertical bars with decreasing opacity — stacked monoliths receding into depth.
 * Inspired by Kubrick's Monolith from 2001: A Space Odyssey.
 */
export function Logo({ className, size = 20, style }: LogoProps) {
  return (
    <svg
      aria-label="Coscientist logo"
      className={className}
      fill="none"
      height={size}
      role="img"
      style={style}
      viewBox="0 0 32 32"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#000" height="32" width="32" />
      <rect
        fill="var(--logo-bar-color, #fff)"
        fillOpacity="1"
        height="20"
        width="6"
        x="5"
        y="6"
      />
      <rect
        fill="var(--logo-bar-color, #fff)"
        fillOpacity="0.5"
        height="20"
        width="6"
        x="13"
        y="6"
      />
      <rect
        fill="var(--logo-bar-color, #fff)"
        fillOpacity="0.2"
        height="20"
        width="6"
        x="21"
        y="6"
      />
    </svg>
  )
}
