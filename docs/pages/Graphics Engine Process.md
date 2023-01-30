---
lang: 'en'
slug: '/BA4019'
---

The general process of a [graphics](./../.././docs/pages/Graphics.md) engine follows:

- Initialize
  - Create a Graphic Window
  - Create a [Graphic Renderer](./../.././docs/pages/Graphic%20Renderer.md)
- Run Loop
  - Process Input
    - Save state for current inputs
  - Update Game State
    - Calculate [Delta Time](./../.././docs/pages/Delta%20Time.md)
    - Limit Updating Frequency to 16ms, which yields 60 [Frames Per Second](./../.././docs/pages/Frames%20Per%20Second.md).
      - If [Delta Time](./../.././docs/pages/Delta%20Time.md) is less than 16ms, wait for a while.
    - If [Delta Time](./../.././docs/pages/Delta%20Time.md) is bigger than Max [Delta Time](./../.././docs/pages/Delta%20Time.md), usually twice the [Delta Time](./../.././docs/pages/Delta%20Time.md), cap the [Delta Time](./../.././docs/pages/Delta%20Time.md) to Max [Delta Time](./../.././docs/pages/Delta%20Time.md)
    - Game logic goes here.
  - Generate Output
    - [Back Buffer](./../.././docs/pages/Back%20Buffer.md) is filled in Update Game State.
    - Clear the [Back Buffer](./../.././docs/pages/Back%20Buffer.md)
    - Present the [Back Buffer](./../.././docs/pages/Back%20Buffer.md)
- Shutdown
  - Destroy the renderer
  - Destroy the window
  - End Game

<head>
  <html lang="en-US"/>
</head>
