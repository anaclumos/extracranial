import type { KeyHandlerContext } from "./key-handlers"
import {
  handleArrowLeft,
  handleArrowRight,
  handleEnd,
  handleEscape,
  handleHome,
} from "./key-handlers"

export type KeyHandler = (ctx: KeyHandlerContext) => void

export const keyboardShortcuts: Record<string, KeyHandler> = {
  ArrowLeft: handleArrowLeft,
  ArrowRight: handleArrowRight,
  Escape: handleEscape,
  Home: handleHome,
  End: handleEnd,
}
