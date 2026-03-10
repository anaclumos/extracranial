import type { NextRequest } from "next/server"
import { generateOGImage } from "./og-generator"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get("title") || "Coscientist"
  const description = searchParams.get("description") || ""
  const locale = searchParams.get("locale") || "en"

  const response = await generateOGImage({ title, description, locale })

  response.headers.set(
    "Cache-Control",
    "public, max-age=31536000, immutable"
  )

  return response
}
