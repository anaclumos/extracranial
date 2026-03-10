---
slug: /72AD93
last_modified: 2025-12-31T00:00:00.000Z
---

[[Lesser Known Trick]]

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
