---
date: 2021-01-16
slug: '/ACB2F1'
---

## TLDR

- If you have this error, double-check if your `rootDir` is consistent.
- I got this error from TSC, auto-flattening the folder structure.

On my TypeScript Node Server, I suddenly got the following error on the `tsc` command for production settings.

```bash
internal/modules/cjs/loader.js:{number}
  throw err;

Error: Cannot find module '{project}/dist'
  at ... {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
```

Then I stashed my works and started traveling back in time with `git checkout HASH`. Comes out, the error started when I added MongoDB Models at `src/models`.

It seemed **strange** since it had nothing to do with adding new modules or dependencies. Reinstalling `node_modules` did not do the job for me ([Relevant Stack Overflow Question here](https://stackoverflow.com/questions/53545800)). Please take a look at my folder structure.

```bash
.
├── LICENSE
├── README.md
├── dist
├── package-lock.json
├── package.json
├── src
│   ├── models (Newly added. Started to cause error.)
│   │   └── user.ts (Newly added. Started to cause error.)
│   └── server
│       ├── config
│       │   ├── config.ts
│       │   ├── dev.env
│       │   ├── dev.env.sample
│       │   ├── prod.env
│       │   └── prod.env.sample
│       └── index.ts
└── tsconfig.json
```

Long story short, it was the problem in my `tsconfig`. I have previously declared the following statement on my `tsconfig`.

```json
{
  ...
  "include": ["src/**/*"]
}
```

However, since there was only `/server` folder before creating the model, it seems that TSC has automatically set the root directory to `src/server`. Therefore the `dist` output seemed like the following.

```bash
dist
├── config
│   ├── config.js
│   └── prod.env
└── index.js
```

But after `models/user.ts` was added, `src` contained both `models` and `server` directories, recognizing the root directory as `src`. So it now became:

```bash
dist
├── models
│   └── user.js
└── server
    ├── config
    │   ├── config.js
    │   └── prod.env
    └── index.js
```

Notice the directory structure has changed. My entire `npm commands` were based as if `src/server` was a root directory (as if the index was at `dist/index.js`), so that began to cause the error. Therefore I updated the `npm commands`. Note that I changed `dist`s to `dist/server`s.

```diff
rm -rf dist
&& tsc
- && cp ./src/server/config/prod.env ./dist/config/prod.env
&& export NODE_ENV=prod
- && node dist

rm -rf dist
&& tsc
+ && cp ./src/server/config/prod.env ./dist/server/config/prod.env
&& export NODE_ENV=prod
+ && node dist/server
```

To prevent TSC from guessing the root directory, you can add the following line on your `tsconfig.json`.

```json
{
  "compilerOptions": {
    ...
    "rootDir": "src",
  }
}
```

This line will retain the absolute folder structure from `src`.
