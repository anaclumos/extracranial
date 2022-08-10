---
title: 'SwiftUI'
slug: '/F65967'
---

- Declarative Framework made with [[Swift]]

[SwiftUI Overview - Xcode - Apple Developer](https://developer.apple.com/xcode/swiftui/)

- SwiftUI App은 App Protocol을 준수.
- Structure의 Body는 1개 혹은 더 많은 Scene을 Return.
- `@main`으로 진입점을 표시.
- 확실히 declarative하니까 편하다

아래와 같이 시작 가능

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

import WIP from '@site/src/components/WIP'

<WIP />
