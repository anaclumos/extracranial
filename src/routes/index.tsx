import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ search }) => {
    throw redirect({
      params: { slug: "000000" },
      replace: true,
      search,
      to: "/$slug",
    });
  },
  component: IndexComponent,
});

function IndexComponent() {
  return null;
}
