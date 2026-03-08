export function clamp(min: number, value: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export interface PaneTransform {
  x: number
  rotateY: number
  scale: number
  opacity: number
  zIndex: number
}

export function calculatePaneTransform(
  index: number,
  progress: number,
  prefersReducedMotion: boolean
): PaneTransform {
  const offset = (index - progress) * 200
  const absOffset = Math.abs(offset)

  return {
    x: (index - progress) * 260,
    rotateY: prefersReducedMotion ? 0 : clamp(-20, offset * 0.1, 20),
    scale: prefersReducedMotion ? 1 : clamp(0.8, 1 - absOffset * 0.001, 1),
    opacity: clamp(0.3, 1 - absOffset * 0.0015, 1),
    zIndex: Math.max(0, Math.round(100 - absOffset)),
  }
}

export function calculateDragTarget(
  currentIndex: number,
  velocity: number,
  offsetX: number,
  cardWidth: number,
  maxIndex: number
): number {
  let targetIndex: number

  if (Math.abs(velocity) > 400) {
    targetIndex =
      velocity < 0 ? Math.ceil(currentIndex) : Math.floor(currentIndex)
  } else if (Math.abs(offsetX) > cardWidth * 0.15) {
    targetIndex =
      offsetX < 0 ? Math.ceil(currentIndex) : Math.floor(currentIndex)
  } else {
    targetIndex = Math.round(currentIndex)
  }

  return Math.max(0, Math.min(targetIndex, maxIndex))
}
