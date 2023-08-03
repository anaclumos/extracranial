---
slug: '/D1B35D'
---

[[2020-05-29]]

The goal is to...

1. Send notifications on Installation and Updates of a given [[Chrome]] [[WebExtension|Extension]] (with different content, of course)
2. Open specific links when notifications are clicked.

## Sending Notifications

```js
var extensionPage = 'https://chosunghyun.com/youtube-comment-language-filter'
var updateLogPage = 'https://chosunghyun.com/youtube-comment-language-filter/updates'

chrome.runtime.onInstalled.addListener(function (object) {
  if (object.reason === 'install') {
    chrome.notifications.create(extensionPage, {
      title: 'YCLF is now installed 😎',
      message: 'Click here to learn more about the extension!',
      iconUrl: './images/min-icon128.png',
      type: 'basic',
    })
  } else if (object.reason === 'update') {
    chrome.notifications.create(updateLogPage, {
      title: 'YCLF updated to v' + chrome.runtime.getManifest().version + ' 🚀',
      message: "Click here to check out what's new!",
      iconUrl: './images/min-icon128.png',
      type: 'basic',
    })
  }
})
```

Also available on [GitHub](https://github.com/anaclumos/youtube-comment-language-filter/blob/master/extension/scripts/background.js)

- Note that `iconUrl` should be the path from `manifest.json` to the image file, **not from the background script**.
- You can use `chrome.runtime.getManifest().version` it to get the version of the [[WebExtension|extension]].
- If you want to send notifications from anywhere else than the background script, you must have a communication module between the notification sender and the background script to pass the notification details. Create a notification at `background.js` with that given detail. Sending notifications directly from `content.js` seems restricted. Check this [post](https://medium.com/@moshfeu/notifications-in-chrome-extension-50aac17b3b7d) for more information.

## Opening Links when notifications are clicked

Generally, you would need an event listener for each notification. However, there is a neat way to reduce duplicate codes.

    chrome.notifications.onClicked.addListener(function (notificationId) {
      chrome.tabs.create({ url: notificationId });
    });

The trick is to store the link in `notificationId` field and attach an event listener to the notifications. This way, you can only use one event listener to open multiple types of links.

## Additional [[Readings]]

- [`chrome.notifications` section on Google Chrome Developer Docs](https://developer.chrome.com/extensions/notifications)
- [Open URLs in Chrome Notifications on Stack Overflow](https://stackoverflow.com/questions/25956441/open-urls-in-chrome-notifications/25958876)

### Note: Added June 19, 2020

It doesn't seem that this is the ultimate answer. While the notification opens up the intended page when the user clicks the notification right after it pops up, the notification does not open up the page on click if the notification is sent to the notification center. This post will be updated if I find a better solution.
