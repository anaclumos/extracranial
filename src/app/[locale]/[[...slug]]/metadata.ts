import type { Metadata } from "next"
import { hasLocale } from "next-intl"
import { routing } from "@/i18n/routing"
import { getNoteBySlug } from "@/lib/notes"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const rootSlug = slug?.[0] ?? "000000"
  const note = await getNoteBySlug(rootSlug, locale)

  if (!note) {
    return {
      title: "Coscientist",
      description: "cho.sh",
    }
  }

  const title = note.title
  const description = note.description || note.excerpt

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      locale,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description || "")}&locale=${locale}`,
          width: 2400,
          height: 1260,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description || "")}&locale=${locale}`,
      ],
    },
  }
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => [
    { locale, slug: undefined },
    { locale, slug: ["000000"] },
  ])
}
