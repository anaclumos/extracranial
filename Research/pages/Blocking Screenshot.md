---
lang: 'en'
slug: '/D976F4'
---

- [[Block Screenshots in iOS]]


Browser integration (Encrypted-Media + Content-Protection)

Widevine L1	 uses the TEE/TrustZone to decrypt into secure buffers and then tells the compositor **not** to read those buffers when another process (or the OS screen-shot service) asks. If the device lacks L1 hardware, it falls back to L3, lowers the resolution, or refuses playback.[source](https://news.ycombinator.com/item?id=43223985)

Test at: [https://www.netflix.com/watch/80164785](https://www.netflix.com/watch/80164785)

1. **EME** (Encrypted-Media Extensions) invites a CDM (e.g., Widevine) into the render process.
2. The CDM checks the GPU driver’s “secure overlay” capability.
3. Chrome/Edge/Firefox mark the tab as _copy-protected_. When you hit Print Screen or OBS hooks into `D3D11`, Chromium refuses to composite the protected layer, so you get black while the rest of the tab (controls, subtitles) is still visible. [Stack Overflow](https://stackoverflow.com/questions/63175756/how-does-netflix-prevent-users-from-taking-screenshots-of-chrome-browser?utm_source=chatgpt.com)