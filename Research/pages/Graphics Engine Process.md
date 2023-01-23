---
lang: 'en'
slug: '/BA4019'
---

The general process of a [[graphics]] engine follows:

- Initialize
  - Create a [[Graphic Window]]
  - Create a [[Graphic Renderer]]
- Run Loop
  - Process Input
    - Save state for current inputs
  - Update Game State
    - Calculate [[Delta Time]]
    - Limit Updating Frequency to 16ms, which yields 60 [[Frames Per Second]].
      - If [[Delta Time]] is less than 16ms, wait for a while.
    - If [[Delta Time]] is bigger than Max [[Delta Time]], usually twice the [[Delta Time]], cap the [[Delta Time]] to Max [[Delta Time]]
    - Game logic goes here.
  - Generate Output
    - [[Back Buffer]] is filled in Update Game State.
    - Clear the [[Back Buffer]]
    - Present the [[Back Buffer]]
- Shutdown
  - Destroy the renderer
  - Destroy the window
  - End Game
