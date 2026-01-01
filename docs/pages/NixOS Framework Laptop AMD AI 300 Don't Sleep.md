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

or

```
boot.loader.systemd-boot.enable = true;
boot.loader.efi.canTouchEfiVariables = true;
boot.loader.systemd-boot.configurationLimit = 10;

hardware.cpu.amd.updateMicrocode = true;

powerManagement.cpuFreqGovernor = "schedutil";
services.power-profiles-daemon.enable = true;

services.fwupd.enable = true;
```
