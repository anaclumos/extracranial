---
lang: 'en'
slug: '/1C1B7E'
---

```diff
name: CI
on: push
jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository code
        uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
      - name: Setup pnpm
        run: npm install -g pnpm
      - name: Test Server
        run: cd server && pnpm install && pnpm run test
  deploy:
+   needs: test
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Check out repository code
        uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
      - name: Setup pnpm
        run: npm install -g pnpm
      - name: Deploy
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          workingDirectory: "server"


```
