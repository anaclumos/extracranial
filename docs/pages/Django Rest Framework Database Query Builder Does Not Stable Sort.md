---
lang: 'en'
slug: '/88C7D8'
---

A [stupid bug](./../.././docs/pages/%EB%A7%90%EB%8F%84%20%EC%95%88%20%EB%90%98%EB%8A%94%20%EB%B2%84%EA%B7%B8.md) on [2024-08-09](./../.././docs/journals/2024-08-09.md) something that I expected so naturally that took me hours to find out.

I was expecting:

- First = Second
- Third = Fourth

<figure>

![209AF0.png](./../.././docs/assets/209AF0.png)

</figure>

<Accordions>
<Accordion title="Think you're good at Django? Guess the answer!">

<figure>

![C782E0.png](./../.././docs/assets/C782E0.png)

</figure>

Which is not.

- First = Second
- Third ≠ Fourth

This really made me pull my hair off.

This is because `Order By` is not sorting itself, but rather a query builder.
While I _understand_ the reason behind it, I still think it's counterintuitive.

</Accordion>
</Accordions>
