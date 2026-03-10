import fs from "node:fs/promises";
import path from "node:path";
import { createFileRoute } from "@tanstack/react-router";
import { resolveAssetPathForNote } from "@/lib/notes/content-index";

const CONTENT_TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

export const Route = createFileRoute("/api/content-assets/$id/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        if (!params._splat) {
          return new Response("Not Found", { status: 404 });
        }

        const requestedPath = params._splat
          .split("/")
          .filter((segment) => segment.length > 0);

        if (requestedPath.length === 0) {
          return new Response("Not Found", { status: 404 });
        }

        const assetPath = await resolveAssetPathForNote(
          params.id,
          requestedPath
        );

        if (!assetPath) {
          return new Response("Not Found", { status: 404 });
        }

        const fileBuffer = await fs.readFile(assetPath);
        const extension = path.extname(assetPath).toLowerCase();

        return new Response(fileBuffer, {
          headers: {
            "Cache-Control": "public, max-age=31536000, immutable",
            "Content-Type":
              CONTENT_TYPES[extension] ?? "application/octet-stream",
          },
        });
      },
    },
  },
});
