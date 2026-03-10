"use client"

import { buildNoteHref, isExternalHref, normalizeNoteSlug } from "@/lib/note-links"

interface PreviewLinkProps {
  href: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

export function PreviewLink({ href, children, onClick }: PreviewLinkProps) {
  const slug = isExternalHref(href) ? "" : normalizeNoteSlug(href)
  const resolvedHref = slug ? buildNoteHref(slug) : href

  return (
    <a href={resolvedHref} onClick={onClick}>
      {children}
    </a>
  )
}
