---
lang: 'en'
slug: '/93024C'
---

## Redirect in Vercel

```json
{
  "redirects": [
    {
      "source": "/research/:path(.*)",
      "destination": "/r/:path",
      "permanent": true
    },
    {
      "source": "/blog/:path(.*)",
      "destination": "/w/:path",
      "permanent": true
    },
    {
      "source": "/ko/research/:path(.*)",
      "destination": "/ko/r/:path",
      "permanent": true
    },
    {
      "source": "/ko/blog/:path(.*)",
      "destination": "/ko/w/:path",
      "permanent": true
    },
    {
      "source": "/research/",
      "destination": "/r/",
      "permanent": true
    },
    {
      "source": "/blog/",
      "destination": "/w/",
      "permanent": true
    },
    {
      "source": "/ko/research/",
      "destination": "/ko/r/",
      "permanent": true
    },
    {
      "source": "/ko/blog/",
      "destination": "/ko/w/",
      "permanent": true
    }
  ]
}
```

## Redirects in Docusaurus

```json
[
  '@docusaurus/plugin-client-redirects',
  {
    createRedirects(existingPath) {
      if (
        existingPath.includes('/blog') ||
        existingPath.includes('/research')
      ) {
        return [
          existingPath.replace('/blog/', '/w/'),
          existingPath.replace('/research/', '/r/'),
        ]
      }
      return undefined
    },
  },
],
```

## Results

```bash
❯ wget -S https://cho.sh/ko/blog/archive
--2022-09-17 12:13:05--  https://cho.sh/ko/blog/archive
Resolving cho.sh (cho.sh)... 76.76.21.9, 76.76.21.93
Connecting to cho.sh (cho.sh)|76.76.21.9|:443... connected.
HTTP request sent, awaiting response...
  HTTP/1.1 308 Permanent Redirect
  Cache-Control: public, max-age=0, must-revalidate
  Connection: keep-alive
  Content-Type: text/plain
  Date: Sat, 17 Sep 2022 19:13:05 GMT
  Location: /ko/w/archive
  Refresh: 0;url=/ko/w/archive
  Server: Vercel
  Strict-Transport-Security: max-age=63072000
  X-Vercel-Cache: MISS
  X-Vercel-Id: sfo1::nz7g7-1663441985783-901c0186d8e5
  Transfer-Encoding: chunked
Location: /ko/w/archive [following]
--2022-09-17 12:13:05--  https://cho.sh/ko/w/archive
Reusing existing connection to cho.sh:443.
HTTP request sent, awaiting response...
  HTTP/1.1 200 OK
  Accept-Ranges: bytes
  Access-Control-Allow-Origin: *
  Age: 0
  Cache-Control: public, max-age=0, must-revalidate
  Connection: keep-alive
  Content-Disposition: inline; filename="archive"
  Content-Length: 11916
  Content-Type: text/html; charset=utf-8
  Date: Sat, 17 Sep 2022 19:13:05 GMT
  Etag: "15abdb39198f68395bfb0d03b455bdbb"
  Server: Vercel
  Strict-Transport-Security: max-age=63072000
  X-Vercel-Cache: MISS
  X-Vercel-Id: sfo1:sfo1::nz7g7-1663441985797-738c480529df
Length: 11916 (12K) [text/html]
Saving to: 'archive'
```

- Note the `HTTP/1.1 308 Permanent Redirect`.
