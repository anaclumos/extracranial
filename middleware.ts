const defined = <T>(v: T | undefined): v is T => v !== undefined

const PATH_PATTERN =
  /^(\/(en|ko))?(\/(?:r|w|research|blog|journals|pages))\/(.+)$/

export const config = {
  matcher: ['/(en|ko)?/(r|w|research|blog|journals|pages)/:path*'],
}

export default function middleware(request: Request) {
  const url = new URL(request.url)
  const { pathname } = url

  const match = pathname.match(PATH_PATTERN)
  if (!match) {
    return
  }

  const localePrefix = match[1] ?? ''
  const locale = match[2]
  const routePath = match[3]
  const rest = match[4]

  if (!(defined(routePath) && defined(rest))) {
    return
  }

  let needsRedirect = false
  let newLocalePrefix = localePrefix
  let newRoutePath = routePath
  let newRest = rest

  if (locale === 'en') {
    newLocalePrefix = ''
    needsRedirect = true
  }

  if (
    routePath === '/research' ||
    routePath === '/journals' ||
    routePath === '/pages'
  ) {
    newRoutePath = '/r'
    needsRedirect = true
  } else if (routePath === '/blog') {
    newRoutePath = '/w'
    needsRedirect = true
  }

  const parts = newRest.split('/')
  if (parts[0]) {
    const slug = parts[0]
    const uppercased = slug.toUpperCase()
    if (slug !== uppercased) {
      parts[0] = uppercased
      newRest = parts.join('/')
      needsRedirect = true
    }
  }

  if (needsRedirect) {
    url.pathname = `${newLocalePrefix}${newRoutePath}/${newRest}`
    return Response.redirect(url.toString(), 308)
  }
}
