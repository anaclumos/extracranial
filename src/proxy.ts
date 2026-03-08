import { NextResponse, type NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "@/i18n/routing"

const handleI18nRouting = createMiddleware(routing)

const DIRECT_NOTE_SLUG_REGEX = /^(?:[A-F0-9]{6}|\d{4}-\d{2}-\d{2})$/i
const LEGACY_NOTE_PREFIXES = new Set([
  "blog",
  "journals",
  "pages",
  "r",
  "research",
  "w",
])

function isLocaleSegment(segment: string) {
  return routing.locales.includes(segment as (typeof routing.locales)[number])
}

function getVisibleNotePath(slug: string, locale?: string) {
  const normalizedLocalePrefix =
    locale && locale !== routing.defaultLocale ? `/${locale}` : ""
  return `${normalizedLocalePrefix}/${slug}`
}

function getInternalLibraryPath(slug: string, locale?: string) {
  const normalizedLocale = locale ?? routing.defaultLocale
  return `/${normalizedLocale}/library/${slug}`
}

function isDirectNoteSlugPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length !== 1) {
    return false
  }

  const [segment] = segments
  if (!segment) {
    return false
  }

  if (isLocaleSegment(segment)) {
    return false
  }

  return DIRECT_NOTE_SLUG_REGEX.test(segment)
}

function getCanonicalNoteRedirectPath(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean)

  let locale: string | undefined
  let prefix: string | undefined
  let slug: string | undefined

  if (segments.length === 1) {
    const [segment] = segments
    if (segment === "library") {
      return getVisibleNotePath("000000")
    }
    return null
  }

  if (segments.length === 2) {
    const [first, second] = segments

    if (isLocaleSegment(first)) {
      locale = first
      if (second === "library") {
        return getVisibleNotePath("000000", locale)
      }
      if (locale === routing.defaultLocale && DIRECT_NOTE_SLUG_REGEX.test(second)) {
        return getVisibleNotePath(second)
      }
      return null
    }

    ;[prefix, slug] = segments
  } else if (segments.length === 3) {
    const [maybeLocale, maybePrefix, maybeSlug] = segments
    if (!isLocaleSegment(maybeLocale)) {
      return null
    }
    locale = maybeLocale
    prefix = maybePrefix
    slug = maybeSlug
  } else {
    return null
  }

  if (!(prefix && slug)) {
    return null
  }

  if (prefix === "library") {
    return getVisibleNotePath(slug, locale)
  }

  if (!LEGACY_NOTE_PREFIXES.has(prefix)) {
    return null
  }

  if (!DIRECT_NOTE_SLUG_REGEX.test(slug)) {
    return null
  }

  return getVisibleNotePath(slug, locale)
}

function getDirectNoteRewritePath(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 1) {
    const [slug] = segments
    if (!(slug && !isLocaleSegment(slug) && DIRECT_NOTE_SLUG_REGEX.test(slug))) {
      return null
    }
    return getInternalLibraryPath(slug)
  }

  if (segments.length === 2) {
    const [locale, slug] = segments
    if (!(locale && slug && isLocaleSegment(locale) && DIRECT_NOTE_SLUG_REGEX.test(slug))) {
      return null
    }
    return getInternalLibraryPath(slug, locale)
  }

  return null
}

export default function proxy(request: NextRequest) {
  const canonicalRedirectPath = getCanonicalNoteRedirectPath(
    request.nextUrl.pathname
  )
  if (canonicalRedirectPath) {
    const url = request.nextUrl.clone()
    url.pathname = canonicalRedirectPath
    return NextResponse.redirect(url)
  }

  const directNoteRewritePath = getDirectNoteRewritePath(request.nextUrl.pathname)
  if (directNoteRewritePath) {
    const url = request.nextUrl.clone()
    url.pathname = directNoteRewritePath
    return NextResponse.rewrite(url)
  }

  return handleI18nRouting(request)
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|ingest|monitoring|.*\\..*).*)",
  ],
}
