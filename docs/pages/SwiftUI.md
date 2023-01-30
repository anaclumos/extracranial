---
lang: 'en'
slug: '/F65967'
---

- Declarative Framework made with [Swift](./../.././docs/pages/Swift.md)
- [SwiftUI is convenient but slow — Alin Panaitiu](https://notes.alinpanaitiu.com/SwiftUI%20is%20convenient,%20but%20slow)

[SwiftUI Overview - Xcode - Apple Developer](https://developer.apple.com/xcode/swiftui/)

- SwiftUI App abides by the App Protocol.
- Structure Body returns 1 or more scenes.
- `@main` marks the entry point of the app.
- I like how it is declarative

```swift
import SwiftUI

struct LandmarkDetail: View {
    var body: some View {
        Text("Hello, World!")
    }
}

struct LandmarkDetail_Previews: PreviewProvider {
    static var previews: some View {
        LandmarkDetail()
    }
}
```

```swift
struct LandmarkRow_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            LandmarkRow(landmark: landmarks[0])
            LandmarkRow(landmark: landmarks[1])
        }.previewLayout(.fixed(width: 300, height: 70))
    }
}
```

```swift
Text("Turtle Rock").font(.title)
```

<head>
  <html lang="en-US"/>
</head>
