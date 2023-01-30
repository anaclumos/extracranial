---
lang: 'en'
slug: '/ADB1EA'
---

> _Try removing something but don't freak out if you cannot._

## Terminal freaked out

Suppress with `-f` or `--force`.

```
rm -f
```

## Then ZSH freak out

But ZSH will still freak out if you do something like `rm -f *.config.js`.
This is because of the error message coming from the ZSH Glob search, not the `rm` part itself.

```
setopt +o nomatch
```

This will prevent ZSH from complaining when no match is found.

- [zsh - How to get rid of "No match found" when running "rm \*" - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/310540/how-to-get-rid-of-no-match-found-when-running-rm)

## Then finally Yarn will freak out

```js
{
	"clear": "rm -f *.config.js",
}
```

But still, this time, Yarn will complain when you run the `rm` command
You need to explicitly quote it to avoid glob expansion.
This is because Yarn will try to expand the blob instead of delegating it to the terminal (which we want.)

```js
{
	"clear": "rm -f '*.config.js'",
}
```

- [[Bug] Yarn shell throws errors about Glob patterns · Issue #1731 · yarnpkg/berry](https://github.com/yarnpkg/berry/issues/1731)

<head>
  <html lang="en-US"/>
</head>
