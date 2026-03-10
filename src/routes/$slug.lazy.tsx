import { createLazyFileRoute } from "@tanstack/react-router";
import { NotesPageClient } from "@/components/client/index";

export const Route = createLazyFileRoute("/$slug")({
  component: NoteRoutePage,
});

function NoteRoutePage() {
  const data = Route.useLoaderData();

  return (
    <NotesPageClient
      noteSummaries={data.noteSummaries}
      paneNotes={data.paneNotes}
      rootSlug={data.rootSlug}
    />
  );
}
