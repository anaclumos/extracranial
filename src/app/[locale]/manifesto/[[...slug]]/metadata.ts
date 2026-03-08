import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const rootSlug = slug?.[0] ?? "000000"
  const url = `/${locale}/library${rootSlug === "000000" ? "" : `/${rootSlug}`}`

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
