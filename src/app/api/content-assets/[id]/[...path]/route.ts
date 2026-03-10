import fs from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"
import { resolveAssetPathForNote } from "@/lib/notes/content-index"

const CONTENT_TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
}

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string; path: string[] }> }
) {
  const { id, path: requestedPath } = await context.params
  const assetPath = await resolveAssetPathForNote(id, requestedPath)

  if (!assetPath) {
    return new NextResponse("Not Found", { status: 404 })
  }

  const fileBuffer = await fs.readFile(assetPath)
  const extension = path.extname(assetPath).toLowerCase()

  return new NextResponse(fileBuffer, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": CONTENT_TYPES[extension] ?? "application/octet-stream",
    },
  })
}
