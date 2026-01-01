---
lang: 'en'
slug: '/8B3C7F'
---

## General

- [Swift Macro](./../.././docs/pages/Swift%20Macro.md)
- [SwiftData](./../.././docs/pages/SwiftData.md)
- [WidgetKit](./../.././docs/pages/WidgetKit.md) → Interactivity. Also possible to trigger some code when the button is clicked. Can it be used as a "refresh" button?
- [App Intents](./../.././docs/pages/App%20Intents.md) → Can be used as [Shortcuts](./../.././docs/pages/Shortcuts.md) and Siri commands
- [TipKit](./../.././docs/pages/TipKit.md) → Displays some Tooltips
- [AirDrop](./../.././docs/pages/AirDrop.md) improvements for in-app contents
- [Game Porting Toolkit](./../.././docs/pages/Game%20Porting%20Toolkit.md) → automatic HLSL conversion
- [AVCapture](./../.././docs/pages/AVCapture.md) is faster and better → volume button availability. Hinting iPhone action button?
- Video Conferencing → [ScreenCaptureKit](./../.././docs/pages/ScreenCaptureKit.md)

## watchOS

- [NavigationStack](./../.././docs/pages/NavigationStack.md) → [NavigationSplitView](./../.././docs/pages/NavigationSplitView.md). a renewed focus on pagination, using the digital crown
- [containerBackground](./../.././docs/pages/containerBackground.md) modifier using gradient fills, giving spatial cognition
- [ToolbarItem](./../.././docs/pages/ToolbarItem.md) → Using corners of Apple Watch
- using app intent will push a widget to the top of the new [Smart Stack](./../.././docs/pages/Smart%20Stack.md).
- [Custom Workout API](./../.././docs/pages/Custom%20Workout%20API.md) → Will show up on the Workouts app
- [CoreMotion API](./../.././docs/pages/CoreMotion%20API.md) → higher fidelity data

## [Accessibility](./../.././docs/pages/Accessibility.md)

- [Paused Animated Images](./../.././docs/pages/Reduced%20Motion.md) → Stop motions in animated GIFs by user settings.
- [Dim Flashing Lights](./../.././docs/pages/Dim%20Flashing%20Lights.md) for Photosensitive users (AVFoundation includes by default, but there are also APIs for everything)

## Privacy

- Calendar Permissions: Calendar Add-only permission.
- [Limit Access for Photos](./../.././docs/pages/Limit%20Access%20for%20Photos.md). New photo picker component
- [Privacy Manifest](./../.././docs/pages/Privacy%20Manifest.md) that automatically aggregates third-party analytics SDKs privacy manifests
- [Privacy Supply Chains](./../.././docs/pages/Privacy%20Supply%20Chains.md). Signature for third-party SDKs.
- [Sensitive Content Analysis Framework](./../.././docs/pages/Sensitive%20Content%20Analysis%20Framework.md). On-device nudity detection & Sensitive Content Warning Blurring

## [App Store](./../.././docs/pages/App%20Store.md)

- [StoreKit](./../.././docs/pages/StoreKit.md) → Now provides a general Interface for In-app purchases for merchandising experience.
  - `ProductView`, `SubscriptionStoreView`
  - Across all devices
  - [a11y](./../.././docs/pages/Accessibility.md), and [i18n](./../.././docs/pages/Internationalization.md) built-in
  - Auto-detect user eligibility (no "Re-validate")
- [SKAdNetwork](./../.././docs/pages/SKAdNetwork.md). [App Store](./../.././docs/pages/App%20Store.md)'s more in-depth analytics: Re-engagement detection.

## [Xcode](./../.././docs/pages/Xcode.md)

- Source Editor: Better code suggestion
- `PreviewProvider` is now [Swift Macro](./../.././docs/pages/Swift%20Macro.md), one-word `#Preview`.
- Git Staging now supported in-line, with a better source change view
- Testing: Test Report Result Overview page (Error Heat Map)
  - Test Live Replay (Timeline)
- [Accessibility](./../.././docs/pages/Accessibility.md) Frames (HTML-like component descriptions within app scene)
- [Xcode Cloud](./../.././docs/pages/Xcode%20Cloud.md). 2x faster workflows. Share Tester Notes. [macOS](./../.././docs/pages/macOS.md) notarization (check malicious components)
- Speed & Size improvements on [Xcode](./../.././docs/pages/Xcode.md) Binaries

## [visionOS](./../.././docs/pages/visionOS.md)
