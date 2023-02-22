---
lang: 'en'
slug: '/407AD6'
---

- Each line of the HTTP header should end in `\r\n` (`<CR><LF>`)
  - Therefore, an empty line should be two characters long.
  - If the line starts with a space, it continues the previous line. Must remove the `\r\n` from the previous line.
- First line of HTTP Request → Request Line.
  - Has `METHOD URI VERSION` format.
- First line of HTTP Response → Status Line
  - Has `VERSION STATUS REASON`
- Other lines have `KEY:VALUE`
- Stateless. HTTP Server does not remember previous client requests
- Takes two round trips + File transmission time
  - One round trip to initiate TCP connection
  - One round trip for HTTP request and response

## Status Codes

- 200 OK
- 301 Moved Permanently → [[Redirect]]
- 400 Bad Request
- 404 Not Found
- 451 Legal Problems
- 505 HTTP Version Not Supported

## Conditional Get

- HTTP request
  - If-modified-since: date
- HTTP response
  - HTTP/1.0 304 Not Modified
  - HTTP/1.0 200 OK Last-Modified: date
- For updating caches
