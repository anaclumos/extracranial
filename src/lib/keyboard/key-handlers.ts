export interface KeyHandlerContext {
  focusIndex: number
  stackLength: number
  maxFocusIndex: number
  onFocusChange: (index: number) => void
  onPopStack: () => void
  onScrollToPane: (index: number) => void
}

export function handleArrowLeft(ctx: KeyHandlerContext) {
  if (ctx.focusIndex > 0) {
    ctx.onFocusChange(ctx.focusIndex - 1)
    ctx.onScrollToPane(ctx.focusIndex - 1)
  }
}

export function handleArrowRight(ctx: KeyHandlerContext) {
  const upperBound = Math.max(0, ctx.maxFocusIndex - 1)
  if (ctx.focusIndex < upperBound) {
    ctx.onFocusChange(ctx.focusIndex + 1)
    ctx.onScrollToPane(ctx.focusIndex + 1)
  }
}

export function handleEscape(ctx: KeyHandlerContext) {
  if (ctx.stackLength > 1) {
    ctx.onPopStack()
  }
}

export function handleHome(ctx: KeyHandlerContext) {
  ctx.onFocusChange(0)
  ctx.onScrollToPane(0)
}

export function handleEnd(ctx: KeyHandlerContext) {
  const upperBound = Math.max(0, ctx.maxFocusIndex - 1)
  ctx.onFocusChange(upperBound)
  ctx.onScrollToPane(upperBound)
}

export function isTextInput(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target.isContentEditable
  )
}
