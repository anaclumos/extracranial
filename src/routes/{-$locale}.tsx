import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { defaultLocale, isLocale, type Locale } from "@/i18n/routing";
import {
  parseNoteStackSearch,
  toNoteStackSearchParams,
} from "@/lib/stores/note-stack-parsers";

type LocaleRouteSearch = Record<string, unknown> & {
  stack?: string;
  focus?: number;
};

export const Route = createFileRoute("/{-$locale}")({
  validateSearch: (search): LocaleRouteSearch => {
    const parsed = parseNoteStackSearch(search);
    const normalized = toNoteStackSearchParams(parsed.stack, parsed.focus);
    const next: LocaleRouteSearch = {
      ...search,
      focus: normalized.focus,
      stack: normalized.stack,
    };

    return next;
  },
  beforeLoad: ({ params }) => {
    if (params.locale && !isLocale(params.locale)) {
      throw notFound();
    }

    return {
      locale: (params.locale ?? defaultLocale) as Locale,
    };
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  return <Outlet />;
}
