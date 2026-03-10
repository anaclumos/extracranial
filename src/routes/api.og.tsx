import { createFileRoute } from "@tanstack/react-router";
import { generateOGImage } from "@/lib/og/og-generator";

export const Route = createFileRoute("/api/og")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get("title") || "Coscientist";
        const description = searchParams.get("description") || "";

        const ogResponse = await generateOGImage({
          title,
          description,
        });
        const headers = new Headers(ogResponse.headers);
        headers.set("Cache-Control", "public, max-age=31536000, immutable");

        return new Response(await ogResponse.arrayBuffer(), {
          status: ogResponse.status,
          statusText: ogResponse.statusText,
          headers,
        });
      },
    },
  },
});
