---
slug: /5DE846
last_modified: 2023-01-29T00:00:00.000Z
---

Reading Files in [[Swift]]

```swift
func loadJsonAsync() {
  DispatchQueue.global(qos: .background).async {
    if let path = Bundle.main.path(forResource: "한글.min", ofType: "json") {
      do {
        let data = try Data(contentsOf: URL(fileURLWithPath: path), options: .mappedIfSafe)
        let jsonResult = try JSONSerialization.jsonObject(with: data, options: .mutableLeaves)
        if let jsonResult = jsonResult as? [String: Any], let 데이터 = jsonResult as? [String: [String: String]] {
          self.한글 = 데이터
        }
      } catch {
        exit(1)
      }
    }
  }
}
```
