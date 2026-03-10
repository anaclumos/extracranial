import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { Suspense } from "react"
import { PageSkeleton } from "@/components/page-skeleton"
import { routing } from "@/i18n/routing"
import { buildNoteGraph, getLatestJournalSlug } from "@/lib/notes"
import { ClientWrapper } from "./client-wrapper"

export { generateMetadata, generateStaticParams } from "./metadata"

interface PageProps {
  params: Promise<{ locale: string; slug?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function getTodayInSeoul() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return formatter.format(new Date())
}

export default async function Page({ params, searchParams }: PageProps) {
  const [{ locale, slug }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ])

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const rootSlug = slug?.[0] ?? "000000"
  const stackParam = Array.isArray(resolvedSearchParams.stack)
    ? resolvedSearchParams.stack[0]
    : resolvedSearchParams.stack

  let effectiveSearchParams = resolvedSearchParams
  if (!(slug && slug.length > 0) && !stackParam) {
    const latestJournalSlug = await getLatestJournalSlug(
      locale,
      getTodayInSeoul()
    )

    if (latestJournalSlug) {
      effectiveSearchParams = {
        ...resolvedSearchParams,
        stack: latestJournalSlug,
      }
    }
  }

  return (
    <Suspense fallback={<PageSkeleton />}>
      <ClientWrapper
        locale={locale}
        noteGraphPromise={buildNoteGraph(locale)}
        rootSlug={rootSlug}
        searchParams={effectiveSearchParams}
      />
    </Suspense>
  )
}
