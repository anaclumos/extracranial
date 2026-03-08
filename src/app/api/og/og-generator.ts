import { ImageResponse } from "next/og"
import { createElement } from "react"
import { getFontsForLocale } from "@/lib/og/fonts"
import { OGTemplate } from "./og-template"

const OG_WIDTH = 2400
const OG_HEIGHT = 1260

export async function generateOGImage({
  title,
  description,
  locale,
}: {
  title: string
  description?: string
  locale: string
}) {
  const textToRender = `${title}${description}Coscientistcoscientist.app`
  const fonts = await getFontsForLocale(locale, textToRender)
  const primaryFontName = fonts[0]?.name || "Pretendard"

  return new ImageResponse(
    createElement(OGTemplate, {
      title,
      description,
      fontFamily: primaryFontName,
    }),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: fonts.map((font) => ({
        name: font.name,
        data: font.data,
        weight: font.weight,
        style: font.style,
      })),
    }
  )
}
