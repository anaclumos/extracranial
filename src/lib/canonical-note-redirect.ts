import { redirect } from "@tanstack/react-router";
import { resolveLocale, toLocaleParam } from "@/i18n/routing";

export const DIRECT_NOTE_SLUG_REGEX = /^(?:[A-F0-9]{6}|\d{4}-\d{2}-\d{2})$/i;

export function isDirectNoteSlug(slug: string) {
  return DIRECT_NOTE_SLUG_REGEX.test(slug);
}

export function throwCanonicalNoteRedirect({
  locale,
  slug,
}: {
  locale?: string;
  slug: string;
}): never {
  throw redirect({
    to: "/{-$locale}/$slug",
    params: {
      locale: toLocaleParam(resolveLocale(locale)),
      slug,
    },
    search: (prev) => prev,
    replace: true,
    statusCode: 308,
  });
}
