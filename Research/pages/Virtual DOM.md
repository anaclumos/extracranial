---
lang: 'en'
slug: '/DB3227'
aliases: ['가상 돔']
---

### [Virtual DOM is pure overhead](https://svelte.dev/blog/virtual-dom-is-pure-overhead)

- It's essential to understand that virtual DOM isn't a feature. It's a means to an end, the end being declarative, state-driven UI development. Virtual DOM is valuable because it allows you to build apps without thinking about state transitions, with performance that is generally good enough. That means less buggy code, and more time spent on creative tasks instead of tedious ones
- But it turns out that we can achieve a similar programming model without using virtual DOM — and that's where [[Svelte]] comes in
