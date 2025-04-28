---
lang: 'en'
slug: '/DDE8E8'
---

[iOS Style Toggle in CSS](https://gist.github.com/anaclumos/c12c51fc768f009b1d659d1ab46752d2)

```css
* {
  --ios-style-checkbox-width: 3rem;
  --ios-style-checkbox-height: 1.8rem;
  --ios-style-checkbox-enabled-color: var(--primary-color-500);
  --ifm-toc-padding-vertical: 0.25rem;
  --ifm-toc-padding-horizontal: 0.75rem;
  --ios-style-checkbox-enabled-border-color: var(--primary-color-200);
  --ios-style-checkbox-disabled-color: var(--ifm-menu-color-background);
  --ios-style-checkbox-disabled-color: var(--ifm-menu-color-background-active);
  --ios-style-checkbox-border-width: 0.1rem;
}

.task-list-item {
  display: inline-block !important;
  text-align: left;
  vertical-align: middle;
  margin: 1rem 0;
  width: 100%;
}

input[type='checkbox'] {
  position: relative;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  min-width: var(--ios-style-checkbox-width);
  min-height: var(--ios-style-checkbox-height);
  border: var(--ifm-color-gray-300) solid var(--ios-style-checkbox-border-width);
  background-color: var(--ifm-color-gray-100);
  border-radius: calc(var(--ios-style-checkbox-height) / 2);
  box-shadow: inset -20px 0 0 0 var(--ifm-menu-color-background-active);
  margin: auto 0.5em auto 0;
  vertical-align: middle;
}

input[type='checkbox']:after {
  content: '';
  position: absolute;
  background: transparent;
  background-color: var(--ifm-color-emphasis-100);
  height: calc(var(--ios-style-checkbox-height) - var(--ios-style-checkbox-border-width));
  width: calc(var(--ios-style-checkbox-height) - var(--ios-style-checkbox-border-width));
  top: calc(-0.5 * var(--ios-style-checkbox-border-width));
  left: calc(-0.5 * var(--ios-style-checkbox-border-width));
  border-radius: 50%;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
}

/* dark mode */
@media (prefers-color-scheme: dark) {
  input[type='checkbox'] {
    background-color: var(--ifm-menu-color-background-active);
    border: var(--ifm-color-gray-800) solid var(--ios-style-checkbox-border-width);
  }
  input[type='checkbox']:after {
    background-color: var(--ifm-menu-color);
  }
}

input[type='checkbox']:checked {
  box-shadow: inset var(--ios-style-checkbox-width) 0 0 0 var(--ios-style-checkbox-enabled-color);
  border: var(--ios-style-checkbox-border-width) solid var(--ios-style-checkbox-enabled-border-color);
}

input[type='checkbox']:checked:after {
  left: calc(
    var(--ios-style-checkbox-width) - var(--ios-style-checkbox-height) - var(--ios-style-checkbox-border-width) / 2
  );
}
```
