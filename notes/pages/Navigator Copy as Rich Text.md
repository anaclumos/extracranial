---
lang: 'en'
slug: '/FD2ABF'
---

```tsx
<Button
  onClick={() => {
    const plainText = 'YOUR TEXT'
    const htmlText = `<pre>${plainText}</pre>`
    const blobHtml = new Blob([htmlText], { type: 'text/html' })
    const blobText = new Blob([plainText], { type: 'text/plain' })
    const data = [
      new ClipboardItem({
        'text/plain': blobText,
        'text/html': blobHtml,
      }),
    ]
    navigator.clipboard.write(data)
  }}
>
  Copy
</Button>
```
