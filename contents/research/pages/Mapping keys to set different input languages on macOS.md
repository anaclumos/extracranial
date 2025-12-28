---
slug: '/903D31'
---

[[2021-08-15]]

## Prerequisite

- You need [Karabiner](https://karabiner-elements.pqrs.org/) installed.

## Final Goal

- Press `Left Command` to set Mac's input method to English.
- Press `Right Command` to set Mac's input method to [[한국어|Korean]].
- Any other shortcut combinations would perform as usual.

## Instructions

- Go to `~/.config/karabiner/assets/complex_modifications`. You can click `Command+Shift+G` within Finder to open a `goto` window.
- Create a [[JSON]] file like the following here (open any text editor and save it as `filename.json`).
- Go to `Karabiner-Elements.app` → Complex Modifications and press add rules.
- Click the rules that you want to enable. The above text file will show under `Multilingual Input Methods`.

```json
{
  "title": "Multilingual Input Methods",
  "rules": [
    {
      "description": "R Command to 한글",
      "manipulators": [
        {
          "type": "basic",
          "from": {
            "key_code": "right_command",
            "modifiers": { "optional": ["any"] }
          },
          "to": [{ "key_code": "right_command", "lazy": true }],
          "to_if_alone": [
            {
              "select_input_source": { "language": "^ko$" }
            }
          ]
        }
      ]
    },
    {
      "description": "L Command to English",
      "manipulators": [
        {
          "type": "basic",
          "from": {
            "key_code": "left_command",
            "modifiers": { "optional": ["any"] }
          },
          "to": [{ "key_code": "left_command", "lazy": true }],
          "to_if_alone": [
            {
              "select_input_source": { "language": "^en$" }
            }
          ]
        }
      ]
    }
  ]
}
```

## Configuring more languages

- Add a [[JSON]] Property with your language of choice. The language identifier is likely some combination of [ISO 639](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/select-input-source/) and [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166) (i.e., [[BCP 47]]).
- [https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/select-input-source/](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/select-input-source/)

## Update Mar 7th, 2022

- If you're bilingual, try looking into [Eikana](https://ei-kana.appspot.com/).
- I switched to Eikana + [Gureum](https://gureum.io/) configuration; there's a notorious [자소 분리 bug](https://www.google.com/search?q=%EB%A7%A5%EB%B6%81+%ED%82%A4%EB%B3%B4%EB%93%9C+%EC%9E%90%EC%86%8C+%EB%B6%84%EB%A6%AC) in [[macOS]] [[한국어|Korean]] Keyboard.
