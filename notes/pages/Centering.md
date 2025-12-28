---
lang: 'en'
slug: '/36CA8C'
---

- [Hardest Problem in Computer Science: Centering Things @ tonsky.me](https://tonsky.me/blog/centering/)

## Layouts and Pages

This is my preferred way because this makes sticky bottom bars much easier

```tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen flex flex-col overflow-y-auto">{children}</div>
}
```

```tsx
export default function Page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center">Lorem Ipsum</h1>
      <p className="text-center text-gray-500">Non aliqua Lorem excepteur ex ad laboris.</p>
    </div>
  )
}
```

## Web

```css
.parent {
  display: grid;
  place-items: center;
}

.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

You can also use `margin: auto;`.

## Android

```xml
android:gravity="center"
```
