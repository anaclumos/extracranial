---
lang: 'en'
slug: '/5FD5B2'
---

[[Someday]] [[Project]]. A higher wrapper of the following feature.

[chantastic — chan.dev on X: "A rare update to my zsh package manager function https://t.co/mECFnzshIk" / X](https://twitter.com/chantastic/status/1700234017554235460)

```bash
p() {
	if [[ -f bun.lockb ]]; then
		command bun "$@"
	elif [[ -f pnpm-lock.yaml ]]; then
		command pmpm "$@"
	elif [[ -f yarn.lock ]]; then
		command yarn "$@"
	elif [[ -f package-lock. json ]]; then
		command npm "$@"
	else
		command pnpm "$@"
	fi
}
```
