"use client"

import { createContext, type ReactNode, useContext, useMemo } from "react"
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/components/ui/preview-card"
import {
  buildNoteHref,
  isExternalHref,
  normalizeNoteSlug,
} from "@/lib/note-links"
import type { NoteSummary } from "@/lib/types"

interface NotePreviewContextValue {
  summariesMap: Map<string, NoteSummary>
}

const NotePreviewContext = createContext<NotePreviewContextValue>({
  summariesMap: new Map(),
})

export function NotePreviewProvider({
  children,
  summariesMap,
}: {
  children: ReactNode
  summariesMap: Map<string, NoteSummary>
}) {
  const value = useMemo(() => ({ summariesMap }), [summariesMap])

  return (
    <NotePreviewContext.Provider value={value}>
      {children}
    </NotePreviewContext.Provider>
  )
}

export function useNotePreview() {
  return useContext(NotePreviewContext)
}

interface PreviewLinkProps {
  href: string
  children: ReactNode
  onClick?: (e: React.MouseEvent) => void
}

export function PreviewLink({ href, children, onClick }: PreviewLinkProps) {
  const { summariesMap } = useNotePreview()

  const slug = isExternalHref(href) ? "" : normalizeNoteSlug(href)
  const summary = slug ? summariesMap.get(slug) : undefined
  const resolvedHref = slug ? buildNoteHref(slug) : href

  if (!summary) {
    return (
      <a href={resolvedHref} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <PreviewCard>
      <PreviewCardTrigger
        render={
          <a href={resolvedHref} onClick={onClick}>
            {children}
          </a>
        }
      />
      <PreviewCardPopup align="start" side="bottom" sideOffset={8}>
        <p className="line-clamp-4 text-muted-foreground text-xs leading-5">
          {summary.excerpt ?? summary.description}
        </p>
      </PreviewCardPopup>
    </PreviewCard>
  )
}
