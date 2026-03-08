import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  const title = t("title")
  const description = t("description")
  const origin =
    process.env.NODE_ENV === "production"
      ? "https://cho.sh"
      : "http://localhost:3000"

  return {
    metadataBase: new URL(origin),
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&locale=${locale}`,
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
        `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&locale=${locale}`,
      ],
    },
  }
}
