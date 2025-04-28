---
lang: 'en'
slug: '/2EAC56'
---

- Programming Language for [[Apple]] platforms

## Notes

```bash
brew reinstall --cask swiftformat-for-xcode
```

:::info
It should be `Format File`, not `SwiftFormat > Format File`.
:::

![[F9FC1A.png]]

### [Apple Announces Full Swift Rewrite of the Foundation Framework](https://www.infoq.com/news/2022/12/apple-swift-foundation-rewrite/)

- The Swift team has [started to work on a new open-source implementation of the Foundation framework](https://www.swift.org/blog/future-of-foundation/). To be written entirely in Swift, the new Foundation aims to improve performance by getting rid of conversion costs between Objective-C and Swift as well as to provide the opportunity for modularizing and cleaning it up
- With a native Swift implementation of Foundation, the framework no longer pays conversion costs between C and Swift, resulting in faster performance
- A reimplementation of Calendar in Swift is 1.5x to 18x as fast as the C one (calling from Swift in various synthetic benchmarks like creation and date calculation).
