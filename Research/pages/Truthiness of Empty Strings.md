---
lang: 'en'
slug: '/C18AE1'
---

On [[2023-06-27]], our team at [[Grammarly]] found a bug where a lot of React components started not working. After investigating for a while, we figured that it came from the recent change where we checked an error with

```tsx
error && <Error message={error} />
```

Sometimes, an error message can be `''`. When the error message is empty, we mean the **error does not exist**. So the program **should** execute normally.

But after we implemented [[ESLint]] in our framework, it started to complain that `Unexpected any value in conditional. An explicit comparison or type cast is required.` So we changed it to convert it to null loosely.

```tsx
error != null && <Error message={error} />
```

However, the `'' != null` comparison will regard that as the error exists. This will prevent React from performing any actions because it thinks an error occurred, but it is not visible on the client side because it renders an empty string. We haven't caught this because sometimes the `error` is `String` and sometimes `React.ReactNode`.

```bash
Welcome to Node.js v18.16.0.
Type ".help" for more information.
> '' != null
true
```

So

```tsx
(error != null) && <Error message={error}/>`
```

will become

```tsx
true && <Error message={''} />
```

and cause the error when the error is an empty string merely from `useState("")`, representing no error.

In the end, we had to create an error-checking function that explicitly handles `React.ReactNode` and `String`.
