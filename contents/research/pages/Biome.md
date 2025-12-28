---
lang: 'en'
slug: '/1C434D'
---

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "files": {
    "ignore": [
      "**/node_modules/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/dist/**",
      "**/build/**",
      "**/.cache/**",
      "**/storybook-static/**"
    ],
    "ignoreUnknown": true
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
      "**/.cache/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/public/**",
      "**/*.json",
      "**/*.md",
      "**/.contentlayer/**"
    ]
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noArrayIndexKey": "off"
      }
    },
    "ignore": ["**/node_modules/**", "**/dist/**", "**/build/**", "**/.cache/**", "**/public/**", "**/*.esm.js"]
  },
  "javascript": {
    "formatter": {
      "jsxQuoteStyle": "single",
      "quoteProperties": "asNeeded",
      "trailingCommas": "all",
      "semicolons": "asNeeded",
      "arrowParentheses": "always",
      "bracketSpacing": true,
      "bracketSameLine": false,
      "quoteStyle": "single",
      "attributePosition": "auto"
    }
  },
  "css": {
    "formatter": {
      "quoteStyle": "single"
    }
  },
  "overrides": [
    {
      "include": ["*.ts", "*.tsx"]
    }
  ]
}
```
