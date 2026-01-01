---
lang: 'en'
slug: '/BC2ADE'
---

# NixOS: Certificate Verify Failed. Unable to Get Local Issuer Certificate

## Why the same error shows up on NixOS

On "plain" NixOS the CA bundle is already on-disk ( `/etc/ssl/certs/ca-bundle.crt` , from **pkgs.cacert**) and `nixos-rebuild` writes two environment variables that most software respects:

| variable            | who sets it                                      | example value                                        |
| ------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| `NIX_SSL_CERT_FILE` | `/etc/profile` & systemd units                   | `/run/current-system/sw/etc/ssl/certs/ca-bundle.crt` |
| `SSL_CERT_FILE`     | `cacert` _setup-hook_ inside nix-shell/devShells | same path                                            |

If you run a Python that **came from nixpkgs** (e.g. `pkgs.python3` or a `withPackages` environment) the OpenSSL in that interpreter is patched to look at `$NIX_SSL_CERT_FILE`, so downloads work out of the box ([nix.conf - Nix Reference Manual - nix.dev](https://nixos.org/manual/nix/stable/command-ref/conf-file)).

This traceback comes from a **binary CPython that _uv_ downloaded into  
`~/.local/share/uv/python/…`**.  
That interpreter was built for a generic Linux distro, so:

- it does **not** inherit NixOS' env-vars, and
- its OpenSSL looks in the usual FHS paths (`/etc/ssl/certs/ca-certificates.crt`, etc.) which don't exist inside Nix' read-only store.

Hence: _unable to get local issuer certificate_.

## Fix

```nix
{ config, pkgs, ... }:

{
  environment.systemPackages = with pkgs; [
    cacert          # make sure cacert is installed
    uv              # or wrap it as shown above
  ];

  # Expose the bundle to everything (user shells, systemd units, uv, etc.)
  environment.variables = {
    SSL_CERT_FILE     = "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt";
    NIX_SSL_CERT_FILE = "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt";
  };
}
```

In **Home-Manager** you'd do the same under `home.sessionVariables`, e.g.:

```nix
{
  home.sessionVariables.SSL_CERT_FILE =
    "/etc/ssl/certs/ca-bundle.crt";   # or the full store path
}
```

This is exactly what many people end up doing when 3rd-party tools need the bundle ([Nix CA Certificate Handling](https://gist.github.com/CMCDragonkai/1ae4f4b5edeb021ca7bb1d271caca999), [scottwillmoore/cloudflare-workers-with-nix](https://github.com/scottwillmoore/cloudflare-workers-with-nix)).
