---
lang: 'en'
slug: '/A331BF'
---

> Rapidly build modern websites without ever leaving your [[HTML]]. A utility-first [[CSS]] framework packed with classes like flex, pt-4, text-center, and rotate-90 that can be composed to build any design directly in your markup. [Tailwind CSS](https://tailwindcss.com/)

### [What working with Tailwind CSS every day for two years looks like — Mosaad](https://www.themosaad.com/blog/two-years-of-tailwind-css)

- As of now, with Tailwind CSS v3.2.4 and the ecosystem around it, I consider Tailwind CSS to be one of the [[Boring Technologies|boring]] established CSS solutions that enables me to be the most productive in building and maintaining projects of various sizes
- [[Shopify Analyzes CSS Frameworks]]

### [Don't use Tailwind for your Design System](https://sancho.dev/blog/tailwind-and-design-systems)

- It's error-prone to remove one of the `classNames` from the list; it is a similar situation when you want to remove a new CSS class in an [append only stylesheet](https://css-tricks.com/oh-no-stylesheet-grows-grows-grows-append-stylesheet-problem). They can collide and override other properties
- When reading [[JSX]], I am comfortable imagining a 1-to-1 match with the [[UIUX|UI]]. I can easily navigate through the component tree and [[map]] with the reality
- - [](#fail-at-dynamic-styling)Fail at dynamic styling
- For example, having a `<Link />` component with `color="text-mono-100"`. In the beginning, it would make sense since `text-mono-100` represents the desired color. Maybe later, a need to style the link with a different color on hover. You would add another prop called `hoverColor="text-mono-200"` and call it a day.
- Document-like websites, styling content that is structured as a big chunk. Using [Tailwind Typography](https://blog.tailwindcss.com/tailwindcss-typography), it does come with reasonable defaults for raw content like a blog or a [[newsletter]]
