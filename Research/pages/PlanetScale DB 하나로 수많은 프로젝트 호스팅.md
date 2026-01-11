---
lang: 'ko'
slug: '/1BAE48'
---

이미 [[Neon|인수된 기업]]의 제품을 쓰는 것을 안 좋아하기도 해서, 최근 대부분의 프로젝트 및 앞으로 프로젝트를 PlanetScale DB로 옮기려고 했다. [영속적인 기업을 만들고자 하는 철학](https://planetscale.com/blog/planetscale-forever)이 마음에 들기도 했고. 아무튼 다음은 PlanetScale DB 하나로 많은 프로젝트를 호스팅하는 방법이다.

```typescript
// src/db/schema.ts
import { pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core'

// 프로젝트 전용 스키마 정의 ("public" 아님)
export const myProject = pgSchema('my_project')

// 모든 테이블은 이 스키마 아래에 생성
export const users = myProject.table('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type User = typeof users.$inferSelect
```

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // 중요: 해당 프로젝트의 스키마만 대상으로 격리
  schemaFilter: ['my_project'],
  // 중요: 마이그레이션을 공유 "drizzle" 스키마가 아닌 프로젝트 스키마에 저장
  migrations: {
    schema: 'my_project',
    table: '__drizzle_migrations',
  },
})
```

```typescript
// src/db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

export const db = drizzle(process.env.DATABASE_URL!, { schema })
```

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```
