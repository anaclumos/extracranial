---
lang: 'en'
slug: '/C822DB'
aliases: ['Redwood']
---

RedwoodJS is a full-stack, open-source [JavaScript](./../.././docs/pages/JavaScript.md) framework for building web applications. It was launched in 2020 by Tom Preston-Werner, a [GitHub](./../.././docs/pages/GitHub.md) co-founder. Redwood uses a unique combination of established technologies:

- The [front-end](./../.././docs/pages/Front-end.md) is built with **[React](./../.././docs/pages/React.md)**, a popular [JavaScript](./../.././docs/pages/JavaScript.md) library for building user interfaces.
- For the [back-end](./../.././docs/pages/Back-end.md), Redwood uses **[GraphQL](./../.././docs/pages/GraphQL.md)**, a query language for APIs that allows you to request specific data and aggregate responses from multiple sources.
- It utilizes **[Prisma](./../.././docs/pages/Prisma.md)** as an Object-Relational Mapping (ORM) solution to manage the [database](./../.././docs/pages/Database.md) layer. [Prisma](./../.././docs/pages/Prisma.md) helps developers build performant and safe [database](./../.././docs/pages/Database.md) access.
- [React Router](./../.././docs/pages/React%20Router.md). Redwood's router is declarative, built on the idea of "routes as a first-class concept."'
- [TypeScript](./../.././docs/pages/TypeScript.md)
- [Jest](./../.././docs/pages/Jest.md)
- [Storybook](./../.././docs/pages/Storybook.md)

At a high level, RedwoodJS has two main parts:

1. **The [Back-End](./../.././docs/pages/Back-end.md)**. This is a [GraphQL](./../.././docs/pages/GraphQL.md) [API](./../.././docs/pages/API.md) built with [Prisma](./../.././docs/pages/Prisma.md) and [Apollo (GraphQL)](./../.././docs/pages/Apollo%20%28GraphQL%29.md) Server. [Prisma](./../.././docs/pages/Prisma.md) is used for [database](./../.././docs/pages/Database.md) access, and Apollo Server is used to create the [GraphQL](./../.././docs/pages/GraphQL.md) server.
2. **The [Front-End](./../.././docs/pages/Front-end.md)**. This is a React application that's built with several libraries like Apollo Client (for fetching data from the [GraphQL](./../.././docs/pages/GraphQL.md) [API](./../.././docs/pages/API.md)), [React Router](./../.././docs/pages/React%20Router.md) (for routing), and [Jest](./../.././docs/pages/Jest.md) (for testing).

## Some Discoveries

While I prefer [PNPM](./../.././docs/pages/PNPM.md) over [Yarn](./../.././docs/pages/Yarn.md), due to the workspace support, I like to use Yarn for this.

## Getting Started

```
yarn create redwood-app --ts ./redwoodblog
```

```
yarn redwood dev
```

```
yarn redwood generate page home /
```

```
yarn redwood generate page about
```

## Generating Layouts

```
yarn redwood g layout blog
```

## Using [Prisma](./../.././docs/pages/Prisma.md)

### Opening Prisma Studio

```
yarn rw prisma studio
```

### Scaffolding Prisma Simple CRUD

```
yarn rw g scaffold post
```

## Components

```
yarn rw g cell Articles
```

## When having type errors

```
yarn rw g types
```

## Setting up Auth

```
rw setup auth supabase
```

```
The table `...` does not exist in the current database.
```

You need to `yarn rw prisma migrate dev`

## Set up Storybook

```
yarn rw storybook
```

## Set up Jest

```
yarn rw test
```
