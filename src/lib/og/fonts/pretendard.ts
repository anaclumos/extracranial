const PRETENDARD_CDN = "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/woff";

export const PRETENDARD_REGULAR_URL = `${PRETENDARD_CDN}/Pretendard-Regular.woff`;

let cachedFont: Promise<ArrayBuffer> | null = null;

async function fetchPretendard(): Promise<ArrayBuffer> {
  const response = await fetch(PRETENDARD_REGULAR_URL, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pretendard: ${response.status}`);
  }

  return response.arrayBuffer();
}

export function getPretendard(): Promise<ArrayBuffer> {
  if (!cachedFont) {
    cachedFont = fetchPretendard();
  }
  return cachedFont;
}
