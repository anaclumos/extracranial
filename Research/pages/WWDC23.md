---
lang: 'en'
slug: '/8B3C7F'
---

## General

- [[Swift Macro]]
- [[SwiftData]]
- [[WidgetKit]] → Interactivity. Also possible to trigger some code when the button is clicked. Can it be used as a "refresh" button?
- [[App Intents]] → Can be used as Shortcuts and Siri commands
- [[TipKit]] → Displays some Tooltips
- [[AirDrop]] improvements for in-app contents
- [[Game Porting Toolkit]] → automatic HLSL conversion
- [[AVCapture]] is faster and better → volume button availability. Hinting iPhone action button?
- Video Conferencing → [[ScreenCaptureKit]]

## watchOS

- [[NavigationStack]] → [[NavigationSplitView]]. a renewed focus on pagination, using the digital crown
- [[containerBackground]] modifier using gradient fills, giving spatial cognition
- [[ToolbarItem]] → Using corners of Apple Watch
- using app intent will push a widget to the top of the new [[Smart Stack]].
- [[Custom Workout API]] → Will show up on the Workouts app
- [[CoreMotion API]] → higher fidelity data

## [[Accessibility]]

- [[Reduced Motion|Paused Animated Images]] → Stop motions in animated GIFs by user settings.
- [[Dim Flashing Lights]] for Photosensitive users (AVFoundation includes by default, but there are also APIs for everything)

## Privacy

- Calendar Permissions: Calendar Add-only permission.
- [[Limit Access for Photos]]. New photo picker component
- [[Privacy Manifest]] that automatically aggregates third-party analytics SDKs privacy manifests
- [[Privacy Supply Chains]]. Signature for third-party SDKs.
- [[Sensitive Content Analysis Framework]]. On-device nudity detection & Sensitive Content Warning Blurring

## [[App Store]]

- [[StoreKit]] → Now provides a general Interface for In-app purchases for merchandising experience.
  - `ProductView`, `SubscriptionStoreView`
  - Across all devices
  - [[Accessibility|a11y]], and [[Internationalization|i18n]] built-in
  - Auto-detect user eligibility (no "Re-validate")
- [[SKAdNetwork]]. [[App Store]]'s more in-depth analytics: Re-engagement detection.

## [[Xcode]]

- Source Editor: Better code suggestion
- `PreviewProvider` is now [[Swift Macro]], one-word `#Preview`.
- Git Staging now supported in-line, with a better source change view
- Testing: Test Report Result Overview page (Error Heat Map)
  - Test Live Replay (Timeline)
- [[Accessibility]] Frames (HTML-like component descriptions within app scene)
- [[Xcode Cloud]]. 2x faster workflows. Share Tester Notes. [[macOS]] notarization (check malicious components)
- Speed & Size improvements on [[Xcode]] Binaries

## [[visionOS]]
