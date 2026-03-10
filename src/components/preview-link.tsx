"use client";

import { buildLocalePathname } from "@/i18n/navigation";
import { useLocale } from "@/i18n/provider";
import {
  buildNoteHref,
  isExternalHref,
  normalizeNoteSlug,
} from "@/lib/note-links";

interface PreviewLinkProps {
  children: React.ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function PreviewLink({ href, children, onClick }: PreviewLinkProps) {
  const locale = useLocale();
  const slug = isExternalHref(href) ? "" : normalizeNoteSlug(href);
  const resolvedHref = slug
    ? buildLocalePathname(buildNoteHref(slug), locale)
    : href;

  return (
    <a href={resolvedHref} onClick={onClick}>
      {children}
    </a>
  );
}
