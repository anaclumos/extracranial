const PROTOCOL_REGEX = /^[a-z][a-z0-9+.-]*:/i;
const LEADING_SLASH_REGEX = /^(\.\/|\/)+/;
const CONTENT_PREFIX_REGEX = /^(?:manifesto|library|r|w|research|blog|journals|pages)\//;
const MD_EXTENSION_REGEX = /\.md$/;
const TRAILING_SLASH_REGEX = /\/$/;

export function isExternalHref(href: string): boolean {
  return PROTOCOL_REGEX.test(href) || href.startsWith("#");
}

export function normalizeNoteSlug(href: string): string {
  const trimmed = href.trim();
  if (!trimmed) {
    return "";
  }

  const withoutHash = trimmed.split("#")[0]?.split("?")[0] ?? "";
  const withoutLeading = withoutHash.replace(LEADING_SLASH_REGEX, "");
  const withoutPrefix = withoutLeading.replace(CONTENT_PREFIX_REGEX, "");
  const withoutExtension = withoutPrefix.replace(MD_EXTENSION_REGEX, "");
  return withoutExtension.replace(TRAILING_SLASH_REGEX, "");
}

export function buildNoteHref(slug: string): string {
  const normalized = normalizeNoteSlug(slug);
  return `/${normalized}`;
}

export function buildNoteStackHref(stack: string[]): string {
  const normalizedStack = stack
    .map((slug) => normalizeNoteSlug(slug))
    .filter((slug) => slug.length > 0);

  return `/${normalizedStack.join(":")}`;
}
