---
slug: /A62819
last_modified: 2023-01-29T00:00:00.000Z
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
