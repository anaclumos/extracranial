import { Resvg } from "@resvg/resvg-js";
import { createElement } from "react";
import satori from "satori";
import { getFontsForLocale } from "@/lib/og/fonts";
import { OGTemplate } from "./og-template";

const OG_WIDTH = 2400;
const OG_HEIGHT = 1260;

export async function generateOGImage({
  title,
  description,
  locale,
}: {
  title: string;
  description?: string;
  locale: string;
}) {
  const fonts = await getFontsForLocale(locale);
  const fontFamily =
    [...new Set(fonts.map((font) => `"${font.name}"`))].join(", ") ||
    '"Pretendard"';

  const svg = await satori(
    createElement(OGTemplate, {
      title,
      description,
      fontFamily,
    }),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: fonts.map((font) => ({
        name: font.name,
        data: font.data,
        weight: font.weight,
        style: font.style,
        lang: font.lang,
      })),
    }
  );

  const png = new Resvg(svg).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
