---
lang: 'en'
slug: '/C822DB'
aliases: ['Redwood']
---

RedwoodJS is a full-stack, open-source JavaScript framework for building web applications. It was launched in 2020 by Tom Preston-Werner, a GitHub co-founder. Redwood uses a unique combination of established technologies:

- The [[front-end]] is built with **React**, a popular JavaScript library for building user interfaces.
- For the [[back-end]], Redwood uses **[[GraphQL]]**, a query language for APIs that allows you to request specific data and aggregate responses from multiple sources.
- It utilizes **[[Prisma]]** as an Object-Relational Mapping (ORM) solution to manage the [[database]] layer. [[Prisma]] helps developers build performant and safe [[database]] access.
- [[React Router]]. Redwood's router is declarative, built on the idea of "routes as a first-class concept."'
- [[TypeScript]]
- [[Jest]]
- [[Storybook]]

At a high level, RedwoodJS has two main parts:

1. **The [[Back-End]]**. This is a [[GraphQL]] API built with [[Prisma]] and [[Apollo (GraphQL)]] Server. [[Prisma]] is used for [[database]] access, and Apollo Server is used to create the [[GraphQL]] server.
2. **The [[Front-End]]**. This is a React application that's built with several libraries like Apollo Client (for fetching data from the [[GraphQL]] API), [[React Router]] (for routing), and [[Jest]] (for testing).

## Some Discoveries

While I prefer [[PNPM]] over [[Yarn]], due to the workspace support, I like to use Yarn for this.

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

## Using Prisma

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
