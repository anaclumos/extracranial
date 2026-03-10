---
slug: /C2A337
last_modified: 2025-09-04T00:00:00.000Z
---

```json
{
  "$schema": ".node_modules/@biomejs/biome/configuration_schema.json",
  "plugins": ["./plugins/no-fn-decl.grit", "./plugins/no-fn-expr.grit"],
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "useArrowFunction": "error"
      }
    }
  }
}
```

```
language js;

`$var = function $maybeName?($params) { $body }` where {
  register_diagnostic(
    span = $var,
    message = "Prefer an arrow function over a function expression"
  )
}
```

```
language js;

`function $name($params) { $body }` where {
  register_diagnostic(
    span = $name,
    message = "Use `const $name = ($params) => …` instead of a function declaration"
  )
}
```
