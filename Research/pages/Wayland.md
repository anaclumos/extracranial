---
lang: 'en'
slug: '/DF10AC'
---

Wayland is the newer stage manager: each actor hands its finished "frame" straight to the manager (the Wayland compositor), who then places those frames on-screen. By cutting out the old middle-man (X11) that used to shuffle pixels around, Wayland gives you smoother graphics, lower input lag, and better security--while an "XWayland" compatibility layer lets older apps still perform without noticing the change.
