import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

const HEX_SLUG_RE = /^[A-F0-9]{6}$/i;

function extractSlug(splat: string): string | null {
  const segments = splat.split("/").filter(Boolean);

  for (let i = segments.length - 1; i >= 0; i--) {
    const segment = segments[i];
    if (segment && HEX_SLUG_RE.test(segment)) {
      return segment;
    }
  }

  return null;
}

export const Route = createFileRoute("/$")({
  beforeLoad: ({ params }) => {
    const splat = params._splat;
    if (!splat) {
      throw notFound();
    }

    const slug = extractSlug(splat);
    if (slug) {
      throw redirect({
        params: { slug },
        replace: true,
        to: "/$slug",
      });
    }

    throw notFound();
  },
  component: () => null,
});
