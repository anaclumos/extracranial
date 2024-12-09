---
lang: 'en'
slug: '/13A8BD'
---

![[37C899.png]]

There's this Next.js Hydration Error. Didn't do anything special:

```tsx
<span className={cn(fontMono.className)}>
```

## Solution

```diff
import { JetBrains_Mono as FontMono } from "next/font/google";

export const fontMono = FontMono({
  variable: "--font-mono",
  subsets: ["latin"],
+ display: "swap",
});

```

The issue occurs because the class names change during hydration, even with the same font. Adding `display: swap` essentially instructs the system, 'Hey, replace this with that when it loads on the client side.'

Display Swap is related initially to CSS font fallback swapping (showing a different font while loading, then switching to the primary font when it is ready).

I'm not entirely clear why this resolves the hydration error issue in `next/font`, but there's some internal handling of replacing components in `next/font` with `display: swap`
