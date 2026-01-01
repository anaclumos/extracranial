---
lang: 'en'
slug: '/19902C'
---

Potential [Project](./../.././docs/pages/Project.md) of [USC](./../.././docs/pages/University%20of%20Southern%20California.md) CSCI 576 Multimedia Systems Design

> [Proof of Concept](./../.././docs/pages/Proof%20of%20Concept.md) for a High-Performance, Fully-Fledged, and Universal Web Player using [WebAssembly](./../.././docs/pages/WebAssembly.md)

## Background

In an era where the web continues to dominate technological and software advancements, Atwood's Law has never been more relevant. [Google](./../.././docs/pages/Google.md) Workspace has exemplified this shift, replacing traditional desktop applications like [MS](./../.././docs/pages/Microsoft.md) Word, PowerPoint, and Excel with web-based [alternatives](./../.././docs/pages/Alternative.md) such as [Google](./../.././docs/pages/Google.md) Docs, Slides, and Sheets. [Figma](./../.././docs/pages/Figma.md) took this step even further, replacing graphically intense design applications like Adobe XD and Sketch. These web applications offer performance comparable to their desktop counterparts without the hassle of manual installation or updates; users visit a URL to access up-to-date, full-featured applications.

Despite these advancements, video players and editors have remained mainly an exception to the web transition, primarily due to the complexity of video codecs and encodings. [WebAssembly](./../.././docs/pages/WebAssembly.md) ([WASM](./../.././docs/pages/WebAssembly.md)) emerged as a potential solution, offering near-native performance on the web and enabling the execution of lower-level executables online. Notably, in 2019, [FFMpeg](./../.././docs/pages/FFMpeg.md), a comprehensive, cross-platform solution for recording, converting, and streaming audio and video, was ported to the web. However, the [WASM](./../.././docs/pages/WebAssembly.md) ecosystem experienced a temporary setback following the [Spectre](./../.././docs/pages/Spectre.md) vulnerability, leading to the disabling of shared memory and high-resolution timers at the beginning of 2018. By 2020, a new secure approach had been standardized, re-enabling shared memory and revitalizing the potential for high-performance web-based video applications.

**In light of this, we propose PIRI: a "[Google](./../.././docs/pages/Google.md) Docs" of Video Players -- High-Performance, Fully-Fledged, and Universal Web Player.**

PIRI consists of three parts:

- A [WASM](./../.././docs/pages/WebAssembly.md)-based Video Player (Consumer-facing product)
- A [WASM](./../.././docs/pages/WebAssembly.md)-based [Video Editor](./../.././docs/pages/Video%20Editor.md) (Prosumer-facing product)
- A [WASM](./../.././docs/pages/WebAssembly.md)-based Video Streaming SDK solution for companies (Business-facing product)

While we have plans to expand PIRI into these three realms, we want to start with a simple proof-of-concept web player.

## Connections to CSCI 576: Multimedia Systems Design

PIRI handles and represents various media types (images, video, audio, [graphics](./../.././docs/pages/Graphics.md), etc.) to create multimedia content. This directly correlates with the course's focus on media capture and [assembly](./../.././docs/pages/Assembly.md) methods to produce multimedia content, emphasizing the practical application of these concepts in a modern, web-based environment.

### Compression and Storage

PIRI's development will require an understanding of generic and specific algorithms for media compression, including well-known ITU/ISO standards such as JPEG, MPEG1/2/4, H.261/263/264, HEVC, mp3, AAC, and Dolby Atmos. This aligns with the course's exploration of compression and storage techniques, offering a hands-on opportunity to apply these standards in optimizing video content for efficient web playback and storage.

### [Distribution](./../.././docs/pages/Distribution.md)

PIRI is centered around the [distribution](./../.././docs/pages/Distribution.md) of multimedia content via networked systems to a variety of end clients, incorporating aspects of wired and wireless network [distribution](./../.././docs/pages/Distribution.md), Quality of Service (QoS), priority queuing, and streaming protocols such as MPEG-DASH, [Apple](./../.././docs/pages/Apple.md)'s HLS, and Adobe HDS. This directly relates to the course's examination of [distribution](./../.././docs/pages/Distribution.md) mechanisms and the challenges of delivering high-quality multimedia content over diverse network conditions.

### Digital Rights Management

Incorporating [WebAssembly](./../.././docs/pages/WebAssembly.md)'s secure execution environment, PIRI addresses the need for digital rights management ([DRM](./../.././docs/pages/DRM.md)) through watermarking and encryption. This component is relevant to the course's discussion on protecting and managing distributed multimedia content, emphasizing the importance of security in modern multimedia systems.

### End-to-End Multimedia Systems Design

PIRI exemplifies the design of distributed end-to-end multimedia systems, integrating content creation, compression, storage, and [distribution](./../.././docs/pages/Distribution.md) components. This holistic approach to system design mirrors the course's goal to explain the architecture of modern multimedia applications, offering a practical [case study](./../.././docs/pages/Case%20Study.md) that encompasses the theoretical and technical aspects covered in the curriculum.

### Recent Protocols and Technologies

By leveraging recent protocols like MPEG-DASH, [Apple](./../.././docs/pages/Apple.md)'s HLS, and Adobe HDS and exploring cutting-[edge](./../.././docs/pages/Edge.md) technologies such as stereoscopic and holographic displays, PIRI provides a platform for students to engage with the latest advancements in multimedia systems design. This aligns with the course's emphasis on showcasing recent industry progress and innovations through examples and guest lectures.

### Multimodal Media Analysis

PIRI's potential for enabling direct [video editing](./../.././docs/pages/Video%20Editor.md) and analysis in [web browsers](./../.././docs/pages/Web%20Browser.md) touches on aspects of multimodal media analysis, a topic of interest in the course, offering a practical application for theories and techniques related to multimedia data classification and [natural language](./../.././docs/pages/Natural%20Language.md) queries for multimedia analysis.

## Commercial Values

### Universal Video Playback Solution

PIRI seeks to overcome the limitations of existing video players, such as VLC Media Player's requirement for installation and IINA's [macOS](./../.././docs/pages/macOS.md)-only support. Developing a universal web player will provide a consistent, accessible, and versatile solution for video playback across various platforms and codecs, eliminating the need for multiple platform-specific solutions and enhancing user experience by supporting a wide range of file formats, including MKV.

### Enhanced [Accessibility](./../.././docs/pages/Accessibility.md) and User Engagement

By enabling seamless video viewing and editing directly in [web browsers](./../.././docs/pages/Web%20Browser.md), PIRI aims to improve [accessibility](./../.././docs/pages/Accessibility.md) and user engagement significantly. Removing the need for specialized installations makes digital content universally accessible, potentially increasing platform engagement and user satisfaction, especially for video-centric social media and content [distribution](./../.././docs/pages/Distribution.md) platforms.

### Video Streaming Infrastructure

PIRI proposes a new approach to video streaming infrastructure by offering a comprehensive software development kit (SDK) that simplifies the process of encoding and streaming video files. This eliminates the need for video codec preprocessing that can degrade the video quality, a significant challenge that primary video services face. The direct streaming and playback of video content without initial preprocessing opens up new possibilities for smaller teams to compete with major players, avoiding the path dependency and vendor lock-ins associated with products like [AWS](./../.././docs/pages/AWS.md) Elemental MediaLive. Thus, introducing an SDK for video encoding and streaming presents significant cost savings for organizations. Moreover, integrating the technology with Content Delivery Networks (CDNs) promises to revolutionize video streaming efficiency, reducing latency and enhancing the quality of service for live streams and high-definition content.

### Security and Sustainability

Leveraging [WebAssembly](./../.././docs/pages/WebAssembly.md)'s secure execution environment, PIRI offers robust protection against security threats, safeguarding sensitive and copyrighted content. It also contributes to environmental sustainability by optimizing server-side video processing, potentially reducing energy consumption and carbon footprint.

## Delivery Plans

By the end of the semester, we aim to deliver:

### A [Proof of Concept](./../.././docs/pages/Proof%20of%20Concept.md) [WASM](./../.././docs/pages/WebAssembly.md) Video Player

This will demonstrate [FFMpeg](./../.././docs/pages/FFMpeg.md)'s capabilities in video playback on the web, showcasing the potential for a high-performance, fully-fledged web player.

### A [Proof of Concept](./../.././docs/pages/Proof%20of%20Concept.md) [WASM](./../.././docs/pages/WebAssembly.md) Video Trimmer

This will highlight [FFMpeg](./../.././docs/pages/FFMpeg.md)'s editing capabilities, illustrating the feasibility of web-based [video editing](./../.././docs/pages/Video%20Editor.md) tools that leverage [WASM](./../.././docs/pages/WebAssembly.md) for near-native performance.

## Conclusion

PIRI aims to bridge a significant gap in the current digital landscape by developing a universal web player and editor that leverages [WebAssembly](./../.././docs/pages/WebAssembly.md) and [FFMpeg](./../.././docs/pages/FFMpeg.md). By addressing the limitations of existing video playback and editing solutions, PIRI has the potential to revolutionize how video content is accessed, viewed, and edited across various platforms, eliminating the need for separate installations and providing a seamless, high-quality user experience.
