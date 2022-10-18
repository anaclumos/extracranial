---
lang: 'en'
slug: '/BA4019'
---

The general process of a graphics engine follows:

- Initialize
  - Create a [[Graphic Window]]
  - Create a [[Graphic Renderer]]
- Run Loop
  - Process Input
    - Save state for current inputs
  - Update Game State
    - Calculate [[delta time]]
    - Limit Updating Frequency to 16ms, which yields 60 [[fps]].
      - If [[delta time]] is less than 16ms, wait for a while.
    - If [[delta time]] is bigger than Max [[delta time]], usually twice the [[delta time]], cap the [[delta time]] to Max [[delta time]]
    - Game logic goes here.
  - Generate Output
    - [[back buffer]] is filled in Update Game State.
    - Clear the [[back buffer]]
    - Present the [[back buffer]]
- Shutdown
  - Destroy the renderer
  - Destroy the window
  - End Game
