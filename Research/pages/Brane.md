---
lang: 'en'
slug: '/8C41D2'
---

- [GitHub](https://github.com/braneproject)

Brane is an experimental [[project]] that aims to build a secure, convenient third-party app environment based on web technologies.
Brane's idea loosely follows the Progressive Web App and MiniApp Standardization White Paper.

## Distributed dev model that third parties participate

- No distributed development model correctly executes third-party code even if they use WebView.
- PWAs possess critical weakness compared to Native Apps; it fails to deliver a coherent experience on a native platform.
- Therefore Brane works as building blocks for web-based third-party app stores, creating new markets and lowering the bar for new developers.
- It may be worthwhile to implement the [[Mini App]] white paper. However, the white paper compromised the security model and diverged from the web standard. The [[Mini App]] white paper aims at significantly different goals.
- Parties that create [[Web Browser|browsers]] do not own these limitations; Brane aims to democratize these privileges from mega-corporates creating [[Web Browser|browsers]] to [[Super App]] developers, who are much smaller in scale.

## Brane MVP

- Forced Shutdown
  - Prerequisite: [[Sandbox]] Environment.
  - Demonstrate preloading with Web-view-based [[Mini App]].
  - Demonstrate Forced Shutdown even when [[Mini App]] does not respond.
- Basic Multitasking and Preloading.
- Intercept Geolocation API and present a custom permission modal.
- Employ Cross-Origin Isolation where needed.

## Demo Plan

### Terminology

- **Host**. The main thread app
- **Guest**. Untrusted, third-party app that should be containerized.

### Primary goals in Demo

- Non-blocking (Guests' operation cannot affect the normal execution of the Host.)
- Isolated (Guests can never unauthorizedly affect the Host)
- Submissive (the Host can forcefully shut down guests)
