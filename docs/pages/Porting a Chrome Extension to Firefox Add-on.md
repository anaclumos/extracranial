---
slug: '/440E43'
---

[2020-04-08](./../.././docs/journals/2020-04-08.md)

While [Chrome](./../.././docs/pages/Chrome.md) and [Firefox](./../.././docs/pages/Firefox.md) are two very different [browsers](./../.././docs/pages/Web%20Browser.md), [Chrome](./../.././docs/pages/Chrome.md) [Extension](./../.././docs/pages/WebExtension.md) and [Firefox](./../.././docs/pages/Firefox.md) Add-on are now more similar than ever. Therefore, it is possible to transplant a [Chrome](./../.././docs/pages/Chrome.md) [extension](./../.././docs/pages/WebExtension.md) to a [Firefox](./../.././docs/pages/Firefox.md) Add-on and publish it to the Mozilla store with minor changes. This post is about how I transplanted my YouTube Comment Language Filter to [Firefox](./../.././docs/pages/Firefox.md).

## Checking the [Chrome](./../.././docs/pages/Chrome.md) incompatibilities

First, [Firefox](./../.././docs/pages/Firefox.md) can run commands with the `chrome` namespace, such as `chrome.tabs.onUpdated`. However, a few codes still exist that [Firefox](./../.././docs/pages/Firefox.md) cannot run. [Firefox](./../.././docs/pages/Firefox.md) offers a handy website to check the [chrome](./../.././docs/pages/Chrome.md) incompatibilities.

1. On your [Chrome](./../.././docs/pages/Chrome.md) [browser](./../.././docs/pages/Web%20Browser.md) (or on any equivalent [Chromium](./../.././docs/pages/Chromium.md) [browsers](./../.././docs/pages/Web%20Browser.md),) visit `chrome://extensions`.
2. Enable **Developer Mode** and Press **Pack [Extension](./../.././docs/pages/WebExtension.md)**.
3. Select your [extension](./../.././docs/pages/WebExtension.md) directory and pack your [extension](./../.././docs/pages/WebExtension.md). That will create a `.crx` file.
4. Visit the [Firefox Extension Test website](https://www.extensiontest.com/) and upload your .crx file.
5. You are fine if it says there is no problem.

If there is any problem, I advise you to visit the [MDN docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities) and see what code caused the problem. Unfortunately, I had no problem, so I cannot share any experience here.

## Adding [Firefox](./../.././docs/pages/Firefox.md) Manifest ID

[Firefox](./../.././docs/pages/Firefox.md) also requires an ID inside the `manifest.json` file. It is like the following.

```json
"browser_specific_settings": {
  "gecko": {
    "id": "addon@example.com",
    "strict_min_version": "42.0"
  }
},
```

As you can see, you can also add a `strict_min_version` here. See original [MDN docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json).

This was a minor hassle since [Chrome](./../.././docs/pages/Chrome.md) could not recognize the above code block. So you need to keep two `manifest.json`, [one with the above code block (for Firefox)](https://github.com/anaclumos/youtube-comment-language-filter/blob/master/extension/manifest-firefox.json) and [one without it (for Chrome)](https://github.com/anaclumos/youtube-comment-language-filter/blob/master/extension/manifest-chrome.json). If I find a more straightforward way, I will add it here.

## Uploading it to the [Firefox](./../.././docs/pages/Firefox.md) Add-on Store

1. Visit [https://addons.mozilla.org/](https://addons.mozilla.org/).
2. Log in to your developer account (or create a developer account).
3. Visit [Firefox Submit a New Add-on](https://addons.mozilla.org/developers/addon/submit/) page.
4. Follow the guidelines on the screen.

One little tip: make sure you don't include any unnecessary files `.DS_Store` or anything like that. Using [macOS](./../.././docs/pages/macOS.md)'s default Finder compressor will sometimes have these files. I recommend using [Keka](https://www.keka.io/).

## Update

- It seems that you don't necessarily need a [Firefox](./../.././docs/pages/Firefox.md) manifest ID. Therefore - submit the [Chrome](./../.././docs/pages/Chrome.md) version, and 99% will work (If you didn't get any warning on the [Firefox Extension Test website](https://www.extensiontest.com/)).
