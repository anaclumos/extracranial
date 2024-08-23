---
lang: 'en'
slug: '/88C7D8'
---

A [[말도 안 되는 버그|stupid bug]] on [[2024-08-09]] something that I expected so naturally that took me hours to find out.

I was expecting:

- First = Second
- Third = Fourth

![[209AF0.png]]

<details>

<summary>
Think you're good at Django? Guess the answer!
</summary>

![[C782E0.png]]

Which is not.

- First = Second
- Third ≠ Fourth

This really made me pull my hair off.

This is because `Order By` is not sorting itself, but rather a query builder.
While I _understand_ the reason behind it, I still think it's counterintuitive.

</details>
