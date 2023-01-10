---
lang: 'en'
slug: '/47A158'
---

- A [[Front-end]]
- Implementation itself is [[JavaScript]]
  - [htmx/htmx.js · bigskysoftware/htmx](https://github.com/bigskysoftware/htmx/blob/master/src/htmx.js)

```html
<button hx-post="/clicked" hx-trigger="click" hx-target="#parent-div" hx-swap="outerHTML">Click Me!</button>
```

> This tells HTMX: "When a user clicks on this button, issue an HTTP POST request to '/clicked' and use the content from the response to replace the element with the id `parent-div` in the [[DOM]]." [htmx - Documentation](https://htmx.org/docs/)
