---
lang: 'en'
slug: '/F9F706'
---

What if we could make a human-readable file that declines machine learning (a.k.a. [[Copilot]] use)?
Just like robots.txt, but for [[Copilot]]

```yaml
sourcemap: /source.map.js
robots.txt: /robots.txt
license: MIT
ai:
  - copilot:
      allow: null
      disallow: '*'
  - tabnine:
      allow: null
      disallow: '*'
  - default:
      allow: '*'
# SOME LONG LEGAL STATEMENTS HERE
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
# to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
# and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
# IN THE SOFTWARE.
```

### Equivalent JSON

```json
{
  "ai": [
    {
      "copilot": {
        "allow": null,
        "disallow": "*"
      }
    },
    {
      "tabnine": {
        "allow": null,
        "disallow": "*"
      }
    },
    {
      "default": {
        "allow": "*"
      }
    }
  ],
  "sourcemap": "/source.map.js",
  "license": "MIT",
  "robots.txt": "/robots.txt"
}
```

## References

- [Create and submit a robots.txt file | Google Search Central  |  Documentation  |  Google Developers](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt)
