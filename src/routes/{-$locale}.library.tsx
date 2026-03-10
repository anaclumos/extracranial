import { createFileRoute } from "@tanstack/react-router";
import { throwCanonicalNoteRedirect } from "@/lib/canonical-note-redirect";

export const Route = createFileRoute("/{-$locale}/library")({
  beforeLoad: ({ params }) => {
    return throwCanonicalNoteRedirect({
      locale: params.locale,
      slug: "000000",
    });
  },
  component: () => null,
});
