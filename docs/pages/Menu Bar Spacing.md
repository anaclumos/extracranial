---
lang: 'en'
slug: '/72AD93'
---

[Lesser Known Trick](./../.././docs/pages/Lesser%20Known%20Trick.md)

```shell
defaults -currentHost write -globalDomain NSStatusItemSpacing -int 6
defaults -currentHost write -globalDomain NSStatusItemSelectionPadding -int 6
```

```shell
defaults -currentHost write -globalDomain NSStatusItemSpacing -int 0
defaults -currentHost write -globalDomain NSStatusItemSelectionPadding -int 0
```

```shell
defaults -currentHost delete -globalDomain NSStatusItemSpacing
defaults -currentHost delete -globalDomain NSStatusItemSelectionPadding
```
