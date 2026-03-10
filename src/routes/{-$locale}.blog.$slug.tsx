import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  isDirectNoteSlug,
  throwCanonicalNoteRedirect,
} from "@/lib/canonical-note-redirect";

export const Route = createFileRoute("/{-$locale}/blog/$slug")({
  beforeLoad: ({ params }) => {
    if (!isDirectNoteSlug(params.slug)) {
      throw notFound();
    }

    return throwCanonicalNoteRedirect({
      locale: params.locale,
      slug: params.slug,
    });
  },
  component: () => null,
});
