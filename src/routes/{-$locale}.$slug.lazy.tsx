import { createLazyFileRoute } from "@tanstack/react-router";
import { NotesPageClient } from "@/components/client/index";
import { IndexComponent } from "./{-$locale}.index";

export const Route = createLazyFileRoute("/{-$locale}/$slug")({
  component: NoteRoutePage,
});

function NoteRoutePage() {
  const data = Route.useLoaderData();

  if (data.isLocaleIndex) {
    return <IndexComponent />;
  }

  return (
    <NotesPageClient
      noteSummaries={data.noteSummaries}
      paneNotes={data.paneNotes}
      rootSlug={data.rootSlug}
    />
  );
}
