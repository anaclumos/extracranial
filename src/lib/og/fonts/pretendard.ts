const PRETENDARD_CDN =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/woff2"

let cachedFont: Promise<ArrayBuffer> | null = null

async function fetchPretendard(): Promise<ArrayBuffer> {
  const response = await fetch(`${PRETENDARD_CDN}/Pretendard-Regular.woff2`, {
    cache: "force-cache",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch Pretendard: ${response.status}`)
  }

  return response.arrayBuffer()
}

export function getPretendard(): Promise<ArrayBuffer> {
  if (!cachedFont) {
    cachedFont = fetchPretendard()
  }
  return cachedFont
}
