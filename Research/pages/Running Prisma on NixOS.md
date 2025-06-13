---
lang: 'en'
slug: '/0DC6D9'
---

```sh
nix-shell -p nodejs pnpm --run '
  PRISMA_QUERY_ENGINE_LIBRARY=$(nix-build "<nixpkgs>" -A prisma-engines --no-out-link)/lib/libquery_engine.node \
  PRISMA_QUERY_ENGINE_BINARY=$(nix-build "<nixpkgs>" -A prisma-engines --no-out-link)/bin/query-engine \
  PRISMA_SCHEMA_ENGINE_BINARY=$(nix-build "<nixpkgs>" -A prisma-engines --no-out-link)/bin/schema-engine \
  pnpm prisma generate
'
```

```sh
nix-shell -p nodejs pnpm --run '
  PRISMA_QUERY_ENGINE_LIBRARY=$(nix-build "<nixpkgs>" -A prisma-engines --no-out-link)/lib/libquery_engine.node \
  PRISMA_QUERY_ENGINE_BINARY=$(nix-build "<nixpkgs>" -A prisma-engines --no-out-link)/bin/query-engine \
  PRISMA_SCHEMA_ENGINE_BINARY=$(nix-build "<nixpkgs>" -A prisma-engines --no-out-link)/bin/schema-engine \
  pnpm run build
'
```

yuck
