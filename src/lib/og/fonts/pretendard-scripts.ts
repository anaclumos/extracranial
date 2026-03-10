import { PRETENDARD_REGULAR_URL } from "./pretendard";

type Script =
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

const NOTO_CJK_CDN =
  "https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/OTF";
const NOTO_FONT_CDN =
  "https://cdn.jsdelivr.net/gh/notofonts/noto-fonts@main/unhinted/otf";
const NOTO_TTF_CDN =
  "https://cdn.jsdelivr.net/gh/notofonts/noto-fonts@main/hinted/ttf";

const SCRIPT_FONT_MAP: Record<Script, { name: string; url: string }> = {
  korean: {
    name: "Pretendard",
    url: PRETENDARD_REGULAR_URL,
  },
  japanese: {
    name: "Noto Sans CJK JP",
    url: `${NOTO_CJK_CDN}/Japanese/NotoSansCJKjp-Regular.otf`,
  },
  "chinese-simplified": {
    name: "Noto Sans CJK SC",
    url: `${NOTO_CJK_CDN}/SimplifiedChinese/NotoSansCJKsc-Regular.otf`,
  },
  "chinese-traditional": {
    name: "Noto Sans CJK TC",
    url: `${NOTO_CJK_CDN}/TraditionalChinese/NotoSansCJKtc-Regular.otf`,
  },
  arabic: {
    name: "Noto Sans Arabic",
    url: `${NOTO_FONT_CDN}/NotoSansArabic/NotoSansArabic-Regular.otf`,
  },
  devanagari: {
    name: "Noto Sans Devanagari",
    url: `${NOTO_FONT_CDN}/NotoSansDevanagari/NotoSansDevanagari-Regular.otf`,
  },
  bengali: {
    name: "Noto Sans Bengali",
    url: `${NOTO_FONT_CDN}/NotoSansBengali/NotoSansBengali-Regular.otf`,
  },
  tamil: {
    name: "Noto Sans Tamil",
    url: `${NOTO_FONT_CDN}/NotoSansTamil/NotoSansTamil-Regular.otf`,
  },
  telugu: {
    name: "Noto Sans Telugu",
    url: `${NOTO_FONT_CDN}/NotoSansTelugu/NotoSansTelugu-Regular.otf`,
  },
  thai: {
    name: "Noto Sans Thai",
    url: `${NOTO_FONT_CDN}/NotoSansThai/NotoSansThai-Regular.otf`,
  },
  cyrillic: {
    name: "Noto Sans",
    url: `${NOTO_TTF_CDN}/NotoSans/NotoSans-Regular.ttf`,
  },
};

const fontCache = new Map<Script, Promise<ArrayBuffer>>();

async function fetchFont(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`Failed to fetch font ${url}: ${response.status}`);
  }
  return response.arrayBuffer();
}

export function getPretendardForScript(script: Script): Promise<ArrayBuffer> {
  const cached = fontCache.get(script);
  if (cached) {
    return cached;
  }

  const fontConfig = SCRIPT_FONT_MAP[script];
  const promise = fetchFont(fontConfig.url);
  fontCache.set(script, promise);
  return promise;
}

export function getScriptFontName(script: Script): string {
  return SCRIPT_FONT_MAP[script].name;
}
