---
lang: 'en'
slug: '/A62819'
---

Creating Observable Object in [[SwiftUI]]

```swift
@EnvironmentObject var autocomplete: TopAutocomplete
```

```swift
import Foundation
class TopAutocomplete: ObservableObject {
  @Published var list: [String] = []
  var action: (String) -> Void
  init(action: @escaping (String) -> Void) {
    self.action = action
  }
}
```
