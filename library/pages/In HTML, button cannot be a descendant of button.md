---
lang: 'en'
slug: '/D75F74'
---

```js
function findNestedButtons(element = document.body) {
  const buttons = element.querySelectorAll('button')
  buttons.forEach((button) => {
    const nestedButtons = button.querySelectorAll('button')
    if (nestedButtons.length > 0) {
      console.log('Found nested button:', button)
      console.log('Nested buttons:', nestedButtons)
    }
  })
}

findNestedButtons()
```
