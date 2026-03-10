---
slug: /89C19F
last_modified: 2023-03-24T00:00:00.000Z
---

[[Lesser Known Trick]]. It's a symlink. [[How does File Alias work]]?

You need to

```
git config --global core.symlink true
ln -s ./pages/index.en.md README.md
```

![[3555AC.png]]

![[E64653.png]]
