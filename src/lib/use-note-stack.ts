"use client"

import { useQueryStates } from "nuqs"
import { useCallback, useMemo, useRef } from "react"
import { useRouter } from "@/i18n/navigation"
import {
  buildFullStack,
  getFocusIndex,
  noteStackParsers,
  popFromStack,
  pushToStack,
} from "./stores/note-stack-parsers"

export function useNoteStack(rootSlug: string) {
  const buildNotePath = useCallback((slug: string) => {
    return `/${slug}`
  }, [])

  const router = useRouter()
  const [urlState, setUrlState] = useQueryStates(noteStackParsers, {
    history: "replace",
    shallow: false,
    clearOnDefault: true,
  })

  const stack = useMemo(
    () => buildFullStack(rootSlug, urlState.stack),
    [rootSlug, urlState.stack]
  )

  const focusIndex = useMemo(
    () => getFocusIndex(urlState.focus, stack.length),
    [urlState.focus, stack.length]
  )

  const stackRef = useRef(stack)
  stackRef.current = stack

  const pushNote = useCallback(
    (slug: string, fromPaneIndex: number) => {
      const currentStack = stackRef.current
      const newStack = pushToStack(currentStack, slug, fromPaneIndex)

      if (newStack.length === 1) {
        const newRootSlug = newStack[0]
        router.push(buildNotePath(newRootSlug))
      } else {
        const newRootSlug = newStack[0]
        const additionalSlugs = newStack.slice(1)

        if (newRootSlug !== rootSlug) {
          const basePath = buildNotePath(newRootSlug)
          router.push(`${basePath}?stack=${additionalSlugs.join(",")}`)
        } else {
          setUrlState({ stack: additionalSlugs, focus: null })
        }
      }
    },
    [buildNotePath, router, rootSlug, setUrlState]
  )

  const popNote = useCallback(() => {
    const currentStack = stackRef.current
    const newStack = popFromStack(currentStack)

    if (newStack.length <= 1) {
      setUrlState({ stack: [], focus: null })
    } else {
      const additionalSlugs = newStack.slice(1)
      setUrlState({ stack: additionalSlugs, focus: null })
    }
  }, [setUrlState])

  const focusPane = useCallback(
    (index: number) => {
      const currentStack = stackRef.current
      if (index < 0 || index >= currentStack.length) {
        return
      }
      const currentFocusIndex = getFocusIndex(
        urlState.focus,
        currentStack.length
      )
      if (index === currentFocusIndex) {
        return
      }
      const newFocus = index === currentStack.length - 1 ? null : index
      setUrlState({ focus: newFocus }, { scroll: false, shallow: true })
    },
    [urlState.focus, setUrlState]
  )

  const setStack = useCallback(
    (newStack: string[], focusIdx?: number) => {
      if (newStack.length === 0) {
        router.push("/000000")
        return
      }

      const newRootSlug = newStack[0]
      const additionalSlugs = newStack.slice(1)
      const newFocus =
        focusIdx !== undefined && focusIdx !== newStack.length - 1
          ? focusIdx
          : null

      if (newRootSlug !== rootSlug) {
        const basePath = buildNotePath(newRootSlug)
        const params: string[] = []
        if (additionalSlugs.length > 0) {
          params.push(`stack=${additionalSlugs.join(",")}`)
        }
        if (newFocus !== null) {
          params.push(`focus=${newFocus}`)
        }
        router.push(
          params.length > 0 ? `${basePath}?${params.join("&")}` : basePath
        )
      } else {
        setUrlState({ stack: additionalSlugs, focus: newFocus })
      }
    },
    [buildNotePath, router, rootSlug, setUrlState]
  )

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return useMemo(
    () => ({
      stack,
      focusIndex,
      pushNote,
      popNote,
      focusPane,
      setStack,
      goBack,
    }),
    [stack, focusIndex, pushNote, popNote, focusPane, setStack, goBack]
  )
}
