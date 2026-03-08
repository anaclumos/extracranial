---
lang: 'en'
slug: '/2D9A7C'
last_modified: 2023-06-06
---

Requesting Review in [[Swift]] [[StoreKit]]

```swift
import StoreKit

if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
  SKStoreReviewController.requestReview(in: windowScene)
}
else {
  UIApplication.shared.open(URL(string: "https://apps.apple.com/app/id/1666355842?action=write-review")!)
}
```
