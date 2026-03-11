import { createElement } from "react";
import satori from "satori";
import { getFonts } from "@/lib/og/fonts";
import { OGTemplate } from "./og-template";

const OG_WIDTH = 2400;
const OG_HEIGHT = 1260;

export async function generateOGImage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  // Native bindings from @resvg/resvg-js must stay out of the client/dev graph.
  const { Resvg } = await import("@resvg/resvg-js");
  const fonts = await getFonts();
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
