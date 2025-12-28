---
lang: 'en'
slug: '/27B944'
---

## `pip install .`

- Builds a wheel from the project, then copies the resulting files into `site-packages`.
- Source directory and installed copy are independent; edits in the source tree are **not** seen by the interpreter until you run `pip install .` again.
- Generates a standard, version-pinned install exactly like one fetched from PyPI.

## `pip install -e .` (editable mode)

- Writes an `.egg-link` or PEP 660 `direct_url.json` entry in `site-packages` that points back to the project directory.

- Adds that directory to `easy-install.pth`/`pip-editable-pth`, so `import` statements resolve to live source files.

- Any modification saved in the project tree is immediately importable without reinstallation.

- Intended for development; packaging metadata is still recorded, and dependencies are installed, but the code itself stays in place.

## Practical consequences

- On Prod use `pip install .`
- On Dev use `pip install -e .`
