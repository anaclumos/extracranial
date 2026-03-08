import type { Metadata } from "next"
import { routing } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const rootSlug = slug?.[0] ?? "000000"
  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`
  const url = `${localePrefix}/${rootSlug}`

  return {
    alternates: {
      canonical: url,
    },
    title: "Redirecting to library",
  }
}

export async function generateStaticParams() {
  return []
}
