/**
 * Server-safe stack string utilities.
 * These functions can be used in both server and client components.
 * For client-side nuqs parser integration, see note-stack-parsers.ts
 */

export function parseStackString(value: string | null | undefined): string[] {
  if (!value) {
    return []
  }
  return value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

export function serializeStackArray(value: string[]): string {
  if (!value || value.length === 0) {
    return ""
  }
  return value.join(",")
}

export function buildFullStack(
  rootSlug: string,
  additionalSlugs: string[]
): string[] {
  return [rootSlug, ...additionalSlugs]
}

export function getFocusIndex(
  focus: number | null,
  stackLength: number
): number {
  if (focus === null) {
    return Math.max(0, stackLength - 1)
  }
  return Math.min(Math.max(0, focus), stackLength - 1)
}

export function pushToStack(
  currentStack: string[],
  newSlug: string,
  fromIndex: number
): string[] {
  if (currentStack.length === 0) {
    return [newSlug]
  }
  const safeIndex = Math.min(Math.max(fromIndex, 0), currentStack.length - 1)
  return [...currentStack.slice(0, safeIndex + 1), newSlug]
}

export function popFromStack(currentStack: string[]): string[] {
  if (currentStack.length <= 1) {
    return currentStack
  }
  return currentStack.slice(0, -1)
}
