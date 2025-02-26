---
lang: 'en'
slug: '/C64F8E'
---

```bash
ffmpeg -i input.m4a -c:a libopus -b:a 32k -ar 16000 -ac 1 -application voip output.opus
```
