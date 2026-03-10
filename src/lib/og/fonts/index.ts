import { getPretendard } from "./pretendard";
import {
  getPretendardForScript,
  getScriptFontName,
} from "./pretendard-scripts";

export interface OGFont {
  data: ArrayBuffer;
  lang?: string;
  name: string;
  style: "normal" | "italic";
  weight: 400 | 500 | 700;
}

type Script =
  | "latin"
  | "korean"
  | "japanese"
  | "chinese-simplified"
  | "chinese-traditional"
  | "arabic"
  | "devanagari"
  | "bengali"
  | "tamil"
  | "telugu"
  | "thai"
  | "cyrillic";

const LOCALE_SCRIPT_MAP: Record<string, Script> = {
  en: "latin",
  es: "latin",
  fr: "latin",
  de: "latin",
  pt: "latin",
  it: "latin",
  nl: "latin",
  pl: "latin",
  tr: "latin",
  vi: "latin",
  id: "latin",
  ko: "korean",
  ja: "japanese",
  "zh-CN": "chinese-simplified",
  "zh-TW": "chinese-traditional",
  ar: "arabic",
  fa: "arabic",
  ur: "arabic",
  hi: "devanagari",
  bn: "bengali",
  ta: "tamil",
  te: "telugu",
  th: "thai",
  ru: "cyrillic",
  uk: "cyrillic",
};

const SATORI_FONT_LANG_MAP: Partial<Record<string, string>> = {
  ko: "ko-KR",
  ja: "ja-JP",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  ar: "ar-AR",
  fa: "ar-AR",
  ur: "ar-AR",
  hi: "devanagari",
  bn: "bn-IN",
  ta: "ta-IN",
  te: "te-IN",
  th: "th-TH",
};

function getScriptForLocale(locale: string): Script {
  return LOCALE_SCRIPT_MAP[locale] || "latin";
}

async function getLocaleFallbackFont(
  locale: string,
  text?: string
): Promise<OGFont | null> {
  const script = getScriptForLocale(locale);

  if (script === "latin") {
    return null;
  }

  const data = await getPretendardForScript(script, text);

  return {
    name: getScriptFontName(script),
    data,
    weight: 400,
    style: "normal",
    lang: SATORI_FONT_LANG_MAP[locale],
  };
}

export async function getFontsForLocale(
  locale: string,
  text?: string
): Promise<OGFont[]> {
  const fonts: OGFont[] = [];

  const primaryData = await getPretendard();
  fonts.push({
    name: "Pretendard",
    data: primaryData,
    weight: 400,
    style: "normal",
  });

  const fallback = await getLocaleFallbackFont(locale, text);
  if (fallback) {
    fonts.push(fallback);
  }

  return fonts;
}
