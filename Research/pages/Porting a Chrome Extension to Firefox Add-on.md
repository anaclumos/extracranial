---
date: 2020-04-08
slug: '/440E43'
---

While Chrome and Firefox are two very different [[Web Browser|browsers]], Chrome Extension and Firefox Add-on are now more similar than ever. Therefore, it is possible to transplant a Chrome extension to a Firefox Add-on and publish it to the Mozilla store with minor changes. This post is how I transplanted my YouTube Comment Language Filter to Firefox.

## Checking the Chrome incompatibilities

First of all, Firefox can run commands with `chrome` namespace, such as `chrome.tabs.onUpdated`. However, there are still a few codes that Firefox cannot run. Firefox offers a handy website to check the chrome incompatibilities.

1. On your Chrome [[Web Browser|browser]] (or on any equivalent [[Chromium]] [[Web Browser|browsers]],) visit `chrome://extensions`.
2. Enable **Developer Mode** and Press **Pack Extension**.
3. Select your extension directory and pack your extension. That will create a `.crx` file.
4. Visit the [Firefox Extension Test website](https://www.extensiontest.com/) and upload your .crx file.
5. If it says there is no problem, then you are fine.

If there is any problem, I advise you to visit the [MDN docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities) and see what code caused the problem. I didn't have any problem, so I cannot share any experience here.

## Adding Firefox Manifest ID

Firefox also requires an ID inside the `manifest.json` file. It is like the following.

```json
"browser_specific_settings": {
  "gecko": {
    "id": "addon@example.com",
    "strict_min_version": "42.0"
  }
},
```

As you can see, you can also add a `strict_min_version` here. See original [MDN docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json).

This was a minor hassle since Chrome could not recognize the above code block. So you need to keep two `manifest.json`, [one with the above code block (for Firefox)](https://github.com/anaclumos/youtube-comment-language-filter/blob/master/extension/manifest-firefox.json) and [one without it (for Chrome)](https://github.com/anaclumos/youtube-comment-language-filter/blob/master/extension/manifest-chrome.json). If I find a more straightforward way, I will add it here.

## Uploading it to the Firefox Add-on Store

1. Visit [https://addons.mozilla.org/](https://addons.mozilla.org/).
2. Log in to your developer account (or create a developer account).
3. Visit [Firefox Submit a New Add-on](https://addons.mozilla.org/developers/addon/submit/) page.
4. Follow the guidelines on the screen.

One little tip: make sure you don't include any unnecessary files `.DS_Store` or anything like that. Using macOS's default Finder compressor will sometimes have these files. I recommend using [Keka](https://www.keka.io/).

## Update

- It seems that you don't necessarily need a Firefox manifest ID. Therefore - submit the Chrome version, and 99% will work (If you didn't get any warning on the [Firefox Extension Test website](https://www.extensiontest.com/)).
