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
  | "cyrillic"

const PRETENDARD_JP_CDN =
  "https://cdn.jsdelivr.net/gh/niceplugin/pretendard-jp@1.0.0/dist/web/static/woff2"

const SCRIPT_FONT_MAP: Record<Script, { name: string; url: string }> = {
  korean: {
    name: "Pretendard",
    url: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/woff2/Pretendard-Regular.woff2",
  },
  japanese: {
    name: "Pretendard JP",
    url: `${PRETENDARD_JP_CDN}/PretendardJP-Regular.woff2`,
  },
  "chinese-simplified": {
    name: "Noto Sans SC",
    url: "https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYg.woff2",
  },
  "chinese-traditional": {
    name: "Noto Sans TC",
    url: "https://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz76Cy_CpOtma3uNQ.woff2",
  },
  arabic: {
    name: "Noto Sans Arabic",
    url: "https://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyGyvu3CBFQLaig.woff2",
  },
  devanagari: {
    name: "Noto Sans Devanagari",
    url: "https://fonts.gstatic.com/s/notosansdevanagari/v25/TuGOUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b6w.woff2",
  },
  bengali: {
    name: "Noto Sans Bengali",
    url: "https://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsolKudCk8izI0lc.woff2",
  },
  tamil: {
    name: "Noto Sans Tamil",
    url: "https://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7vGo70SI5g.woff2",
  },
  telugu: {
    name: "Noto Sans Telugu",
    url: "https://fonts.gstatic.com/s/notosanstelugu/v25/0FlxVOGZlE2Rrtr-HmgkMWJNjJ5_RyT8o8c7fHkeg-esVC5dzHkHIJQqrEntezbqQUbf-3v37w.woff2",
  },
  thai: {
    name: "Noto Sans Thai",
    url: "https://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU5RspzF-QRvzzXg.woff2",
  },
  cyrillic: {
    name: "Noto Sans",
    url: "https://fonts.gstatic.com/s/notosans/v36/o-0NIpQlx3QUlC5A4PNjXhFVZNyB.woff2",
  },
}

const fontCache = new Map<Script, Promise<ArrayBuffer>>()

async function fetchFont(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url, { cache: "force-cache" })
  if (!response.ok) {
    throw new Error(`Failed to fetch font: ${response.status}`)
  }
  return response.arrayBuffer()
}

export function getPretendardForScript(
  script: Script,
  _text?: string
): Promise<ArrayBuffer> {
  const cached = fontCache.get(script)
  if (cached) {
    return cached
  }

  const fontConfig = SCRIPT_FONT_MAP[script]
  const promise = fetchFont(fontConfig.url)
  fontCache.set(script, promise)
  return promise
}

export function getScriptFontName(script: Script): string {
  return SCRIPT_FONT_MAP[script].name
}
