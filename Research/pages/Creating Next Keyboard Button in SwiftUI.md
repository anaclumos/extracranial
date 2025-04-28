---
lang: 'en'
slug: '/5B4DDF'
---

Creating Next Keyboard Button in [[SwiftUI]]

```swift
import SwiftUI
import UIKit

struct NextKeyboardButton: View {
  let systemName: String
  let action: Selector
  let primary: Bool
  var body: some View {
    Image(systemName: systemName)
      .overlay {
        NextKeyboardButtonOverlay(action: action)
      }
      .frame(maxWidth: .infinity, minHeight: 60, alignment: .center)
      .font(.system(size: 24))
      .foregroundColor(Color(uiColor: UIColor.label))
      .background(
        primary ? Color("PrimaryKeyboardButton") : Color("SecondaryKeyboardButton")
      )
      .cornerRadius(5)
  }
}

struct NextKeyboardButtonOverlay: UIViewRepresentable {
  let action: Selector
  func makeUIView(context _: Context) -> UIButton {
    let button = UIButton()
    button.addTarget(nil, action: action, for: .allTouchEvents)
    return button
  }

  func updateUIView(_: UIButton, context _: Context) {}
}
```
