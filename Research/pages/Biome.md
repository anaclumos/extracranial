---
lang: 'en'
slug: '/1C434D'
---

```json
{
  "$schema": "https://biomejs.dev/schemas/1.8.3/schema.json",
  "files": {
    "ignore": ["**/.next/**", "**/node_modules/**", "**/.turbo/**", "**/dist/**", "**/storybook-static/**"]
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineEnding": "lf",
    "lineWidth": 80,
    "attributePosition": "auto",
    "ignore": [
      "**/cache",
      "**/.cache",
      "**/package.json",
      "**/package-lock.json",
      "**/public",
      "**/CHANGELOG.md",
      "**/.yarn",
      "**/dist",
      "**/node_modules",
      "**/.next",
      "**/build",
      "**/.contentlayer"
    ]
  },
  "organizeImports": { "enabled": true },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    },
    "ignore": ["dist/*", "**/.cache", "**/public", "**/node_modules", "**/*.esm.js"]
  },
  "javascript": {
    "formatter": {
      "jsxQuoteStyle": "double",
      "quoteProperties": "asNeeded",
      "trailingCommas": "all",
      "semicolons": "asNeeded",
      "arrowParentheses": "always",
      "bracketSpacing": true,
      "bracketSameLine": false,
      "quoteStyle": "double",
      "attributePosition": "auto"
    }
  },
  "overrides": [{ "include": ["*.ts", "*.tsx"] }]
}
```
