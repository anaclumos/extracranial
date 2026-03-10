import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/")({
  beforeLoad: ({ params, search }) => {
    const locale = params.locale;
    const to = locale ? `/${locale}/000000` : "/000000";
    throw redirect({
      to,
      search,
      replace: true,
    });
  },
  component: IndexComponent,
});

export function IndexComponent() {
  // This component is never rendered because beforeLoad redirects
  // It exists as a fallback for the locale-root route
  return null;
}
