import { notFound } from "next/navigation"
import { getNoteBySlug } from "@/lib/notes"
import { buildFullStack, parseStackString } from "@/lib/stores/stack-utils"
import type { BacklinkInfo, NotePaneData, NoteSummary } from "@/lib/types"
import { NotesPageClient } from "./client"

interface ClientWrapperProps {
  noteGraphPromise: Promise<{
    notes: Map<string, NoteSummary>
    backlinks: Map<string, BacklinkInfo[]>
  }>
  rootSlug: string
  locale: string
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function ClientWrapper({
  noteGraphPromise,
  rootSlug,
  locale,
  searchParams,
}: ClientWrapperProps) {
  const stackParam = Array.isArray(searchParams.stack)
    ? searchParams.stack[0]
    : searchParams.stack
  const additionalSlugs = parseStackString(stackParam)
  const fullStack = buildFullStack(rootSlug, additionalSlugs)

  const [graph, stackNotes] = await Promise.all([
    noteGraphPromise,
    Promise.all(fullStack.map((slug) => getNoteBySlug(slug, locale))),
  ])

  const { notes, backlinks } = graph

  const rootNote = notes.get(rootSlug)
  if (!rootNote) {
    notFound()
  }

  const paneNotes = stackNotes.reduce<NotePaneData[]>((acc, note) => {
    if (!note) {
      return acc
    }
    acc.push({
      slug: note.slug,
      title: note.title,
      description: note.description,
      editUrl: note.editUrl,
      serializedContent: note.serializedContent,
      backlinks: backlinks.get(note.slug) || [],
    })
    return acc
  }, [])

  const noteSummaries: NoteSummary[] = Array.from(notes.values()).map(
    (note) => ({
      slug: note.slug,
      title: note.title,
      description: note.description,
      excerpt: note.excerpt,
      date: note.date,
      kind: note.kind,
      lastEditedAt: note.lastEditedAt,
    })
  )
  const collator = new Intl.Collator(locale)
  noteSummaries.sort((a, b) => {
    const editedDelta = (b.lastEditedAt ?? 0) - (a.lastEditedAt ?? 0)
    if (editedDelta !== 0) {
      return editedDelta
    }
    return collator.compare(b.title, a.title)
  })

  return (
    <NotesPageClient
      noteSummaries={noteSummaries}
      paneNotes={paneNotes}
      rootSlug={rootSlug}
    />
  )
}
