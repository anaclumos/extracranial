import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { Suspense } from "react"
import { PageSkeleton } from "@/components/page-skeleton"
import { routing } from "@/i18n/routing"
import { buildNoteGraph } from "@/lib/notes"
import { ClientWrapper } from "./client-wrapper"

export { generateMetadata, generateStaticParams } from "./metadata"

interface PageProps {
  params: Promise<{ locale: string; slug?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
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

  const noteGraphPromise = buildNoteGraph(locale)

  return (
    <Suspense fallback={<PageSkeleton />}>
      <ClientWrapper
        locale={locale}
        noteGraphPromise={noteGraphPromise}
        rootSlug={rootSlug}
        searchParams={resolvedSearchParams}
      />
    </Suspense>
  )
}
