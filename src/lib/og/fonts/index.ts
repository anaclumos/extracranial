import { getPretendard } from "./pretendard";

export interface OGFont {
  data: ArrayBuffer;
  lang?: string;
  name: string;
  style: "normal" | "italic";
  weight: 400 | 500 | 700;
}

export async function getFonts(): Promise<OGFont[]> {
  const primaryData = await getPretendard();
  return [
    {
      name: "Pretendard",
      data: primaryData,
      weight: 400,
      style: "normal",
    },
  ];
}
