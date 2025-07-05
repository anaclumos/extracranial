---
lang: 'en'
slug: '/CFE8F7'
---

There is a bug in NixOS.

Remove:

```
nixos-hardware.nixosModules.framework-amd-ai-300-series
```

And Add:

```
boot.kernelPackages = pkgs.linuxPackages_latest;
services.fprintd.enable = true;
services.fwupd.enable = true;
```
