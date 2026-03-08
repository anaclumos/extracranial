---
lang: 'en'
slug: '/4A5D10'
last_modified: 2025-04-29
---

```ts
const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const randomDelay = `${Math.random() * 2}s`;
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      style={{ animationDelay: randomDelay }}
      {...props}
    />
  );
};

```
