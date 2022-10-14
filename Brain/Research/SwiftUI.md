---
lang: 'en'
slug: '/F65967'
---

- Declarative Framework made with [[Swift]]

[SwiftUI Overview - Xcode - Apple Developer](https://developer.apple.com/xcode/swiftui/)

- SwiftUI App abides the App Protocol.
- Structure의 Body returns 1 or more scenes.
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

아래와 같이 Frame 가능.

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
