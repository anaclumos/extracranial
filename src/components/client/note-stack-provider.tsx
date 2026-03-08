"use client"

import { createContext, type ReactNode, useContext } from "react"
import { useNoteStack } from "@/lib/use-note-stack"

type NoteStackContextValue = ReturnType<typeof useNoteStack>

const NoteStackContext = createContext<NoteStackContextValue | null>(null)

interface NoteStackProviderProps {
  children: ReactNode
  rootSlug: string
}

export function NoteStackProvider({
  children,
  rootSlug,
}: NoteStackProviderProps) {
  const stack = useNoteStack(rootSlug)
  return (
    <NoteStackContext.Provider value={stack}>
      {children}
    </NoteStackContext.Provider>
  )
}

export function useNoteStackContext() {
  const ctx = useContext(NoteStackContext)
  if (!ctx) {
    throw new Error("useNoteStackContext must be used within NoteStackProvider")
  }
  return ctx
}
