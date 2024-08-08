---
lang: 'en'
slug: '/7764B0'
---

`.ssh/allowed_signers`

```
YOUR@EMAIL.COM ssh-YOURSSHSTRATEGY YOURPUBKEY
```

`.gitconfig`

```ini
[user]
	email = YOUR@EMAIL.COM
	name = YOURNAME
	signingkey = /root/.ssh/YOURPUB.pub
[credential "https://github.com"]
	helper =
	helper = !/usr/bin/gh auth git-credential
[credential "https://gist.github.com"]
	helper =
	helper = !/usr/bin/gh auth git-credential
[gpg]
	format = ssh
[commit]
	gpgsign = true
[gpg "ssh"]
	allowedSignersFile = /root/.ssh/allowed_signers
```
