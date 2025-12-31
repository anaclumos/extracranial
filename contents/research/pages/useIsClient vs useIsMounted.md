---
lang: 'en'
slug: '/D8248C'
---

:::tip

`useIsClient` is primarily for handling SSR scenarios, while `useIsMounted` is for managing component lifecycle and preventing memory leaks or updates after unmounting.

:::

## Timing and Purpose

- `useIsClient` specifically tells you if the code is running in a browser vs server environment
- `useIsMounted` tells you if a component is currently mounted in the DOM

## Implementation

- `useIsClient` uses `useState` directly and only sets to `true` once
- `useIsMounted` uses `useRef` and returns a callback function that checks the ref

Return Value

- `useIsClient` returns a boolean directly
- `useIsMounted` returns a function that returns a boolean

Here are scenarios where they would differ:

```tsx
function Example() {
  const isClient = useIsClient()
  const isMounted = useIsMounted()

  // Scenario 1: Initial Server-Side Rendering
  console.log(isClient) // false during SSR, true after hydration
  console.log(isMounted()) // true in both cases

  // Scenario 2: Component Unmounting
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(isClient) // true (doesn't change)
      console.log(isMounted()) // false (component unmounted)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return null
}
```

## Server-Side Rendering

- `useIsClient` will be `false` during SSR and initial render, then `true` after hydration
- `useIsMounted` will be `true` as soon as the component mounts, regardless of SSR

## Component Lifecycle

- `useIsClient` stays `true` once set, even if the component unmounts
- `useIsMounted` becomes `false` when the component unmounts

## Race Conditions

- `useIsClient` is better for conditional rendering based on client/server environment
- `useIsMounted` is better for preventing state updates after unmounting

```tsx
// Example where `useIsMounted` is more appropriate
function DataFetcher() {
  const isMounted = useIsMounted()

  useEffect(() => {
    fetchData().then((data) => {
      // Prevents memory leak and updates after unmount
      if (isMounted()) {
        setData(data)
      }
    })
  }, [])
}
```

```tsx
// Example where `useIsClient` is more appropriate
function BrowserFeature() {
  const isClient = useIsClient()

  // Only renders browser-specific features after hydration
  return isClient ? <WindowSizeDisplay /> : null
}
```
