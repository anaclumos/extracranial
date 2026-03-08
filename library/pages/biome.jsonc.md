---
lang: 'ko'
slug: '/FD1704'
---

```
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["ultracite/biome/core"],
  "files": {
    "includes": ["!src/components/ui"]
  },
  "javascript": {
    "formatter": {
      "semicolons": "asNeeded",
      "quoteStyle": "single"
    }
  }
}
```
