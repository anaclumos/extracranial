---
lang: 'en'
slug: '/70E791'
---

> YAML is a human-readable data-serialization language. It is commonly used for configuration files and in applications storing or transmitting data. [YAML](https://en.wikipedia.org/wiki/YAML)

### [The yaml document from hell](https://ruudvanasseldonk.com/2023/01/11/the-yaml-document-from-hell)

- As it turns out, numbers from 0 to 59 separated by colons are [sexagesimal (base 60) number literals](https://yaml.org/spec/1.1/#id858600). This arcane feature was present in yaml 1.1 but silently removed from yaml 1.2, so the list element will parse as `1342` or `"22:22"` depending on which version your parser uses
- Yaml allows you to create an anchor by adding an `&` and a name in front of a value, and then you can later reference that value with an alias: a `*` followed by the name. In this case, no anchors are defined, so the handles are invalid
- This pitfall is so infamous that it became known as “[the Norway problem](https://hitchdev.com/strictyaml/why/implicit-typing-removed/)
- What is that `false` doing there? The literals `off`, `no`, and `n`, in various capitalizations ([but not any capitalization](https://yaml.org/type/bool.html)!), are all `false` in yaml 1.1, while `on`, `yes`, and `y` are true
- Combined with the previous feature of interpreting `on` as a boolean, this leads to a dictionary with `true` as one of the keys. It depends on the language and how that maps to JSON, if at all. In Python, it becomes the string `"True"`. The key `on` is expected in the wild because [it is used in GitHub Actions](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on). I would be interested to know whether the GitHub Actions parser looks at `"on"` or `true` under the hood
