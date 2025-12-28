---
lang: 'en'
slug: '/F44F14'
---

[dotfiles/setenv.MOZ_DISABLE_SAFE_MODE_KEY.plist at master · mcandre/dotfiles](https://github.com/mcandre/dotfiles/blob/master/setenv.MOZ_DISABLE_SAFE_MODE_KEY.plist)

`setenv.MOZ_DISABLE_SAFE_MODE_KEY.plist`

```xml
<!-- Install:

    cp setenv.MOZ_DISABLE_SAFE_MODE_KEY.plist "$HOME/Library/LaunchAgents/"
    launchctl load -w "$HOME/Library/LaunchAgents/setenv.MOZ_DISABLE_SAFE_MODE_KEY.plist"

    Uninstall:

    rm "$HOME/Library/LaunchAgents/setenv.MOZ_DISABLE_SAFE_MODE_KEY.plist"
    launchctl unsetenv MOZ_DISABLE_SAFE_MODE_KEY
-->
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>setenv.MOZ_DISABLE_SAFE_MODE_KEY</string>
    <key>ProgramArguments</key>
    <array>
    <string>/bin/launchctl</string>
    <string>setenv</string>
    <string>MOZ_DISABLE_SAFE_MODE_KEY</string>
    <string>1</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>ServiceIPC</key>
    <false/>
  </dict>
</plist>
```
