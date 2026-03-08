import { notFound } from "next/navigation"
import { redirect } from "next/navigation"
import { buildNoteHref } from "@/lib/note-links"

interface PageProps {
  params: Promise<{ locale: string; slug?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params
  const rootSlug = slug?.[0] ?? "000000"
  redirect(`/${locale}${buildNoteHref(rootSlug)}`)
}
