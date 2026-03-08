import type { NextRequest } from "next/server"
import { generateOGImage } from "./og-generator"

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get("title") || "Coscientist"
  const description = searchParams.get("description") || ""
  const locale = searchParams.get("locale") || "en"

  return generateOGImage({ title, description, locale })
}
