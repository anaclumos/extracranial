---
lang: 'en'
slug: '/C2A337'
---

```json
{
  "$schema": ".node_modules/@biomejs/biome/configuration_schema.json",
  "plugins": [
    "./plugins/no-fn-decl.grit",
    "./plugins/no-fn-expr.grit"
  ],
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

```grit
language js;

`$var = function $maybeName?($params) { $body }` where {
  register_diagnostic(
    span = $var,
    message = "Prefer an arrow function over a function expression"
  )
}
```

```grit
language js;

`function $name($params) { $body }` where {
  register_diagnostic(
    span = $name,
    message = "Use `const $name = ($params) => …` instead of a function declaration"
  )
}
```