---
lang: 'en'
slug: '/5A03F7'
---

- [[Next.js]]

```
yarn add @blazity/next-image-proxy
```

Save the following as `pages/api/imageProxy.ts`

```ts
import { withImageProxy } from '@blazity/next-image-proxy'

export default withImageProxy({
  whitelistedPatterns: [/^https?:\/\/(.*).mydomain.com/],
})
```

And use it as:

```tsx
src={`/api/imageProxy?imageUrl=${actualImageUrl}`}
```
