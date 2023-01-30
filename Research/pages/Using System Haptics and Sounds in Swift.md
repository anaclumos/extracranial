---
lang: 'en'
slug: '/3664E7'
---

Using System Haptics and Sounds in [[Swift]]

```swift
//
//  Feedback.swift
//  keyboard
//
//  Created by Sunghyun Cho on 2023-01-21.
//
import AVFoundation
import UIKit

class Feedback {
  static let shared = Feedback()
  var haptics: Bool? = true
  var sounds: Bool? = true
  let generator = UIImpactFeedbackGenerator(style: .light)

  private init() {}

  func playHaptics() {
    if !(haptics ?? false) { return }
    generator.impactOccurred()
  }

  func playTypeSound() {
    if !(sounds ?? false) { return }
    let systemSoundID: SystemSoundID = 1104
    AudioServicesPlaySystemSound(systemSoundID)
  }

  func playDeleteSound() {
    if !(sounds ?? false) { return }
    let systemSoundID: SystemSoundID = 1155
    AudioServicesPlaySystemSound(systemSoundID)
  }
  func playModifierSound() {
    if !(sounds ?? false) { return }
    let systemSoundID: SystemSoundID = 1156
    AudioServicesPlaySystemSound(systemSoundID)
  }
}
```
