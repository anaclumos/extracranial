---
lang: 'en'
slug: '/C02643'
---

In [[Android]] development, the `<intent-filter>` element in the AndroidManifest.xml file is used to specify the types of intents that a particular activity, service, or broadcast receiver can respond to. An `Intent` in [[Android]] is a messaging object that requests an action from another component. Intents can be explicit, specifying the part to start by name, or implicit, specifying the type of action to perform (and allowing the system to find an appropriate component to handle that action).

Here's a breakdown of the specific elements in the given `<intent-filter>` example:

- `<action android:name="android.intent.action.MAIN" />`: This specifies that the activity is the entry point for the application; in other words, the activity should be launched when the application starts. This is the main action to be performed, and it specifies that the activity should be the first thing the user sees when they launch your app.
- `<category android:name="android.intent.category.LAUNCHER" />`: This specifies that the activity should be listed in the system's application launcher (i.e., the list of available apps on the device). This allows users to launch the action directly from the app launcher.

Here's an example AndroidManifest.xml snippet to illustrate how it might look in context:

```xml
<activity android:name=".MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

In this example, `MainActivity` is the entry point for the application and will appear in the system's app launcher. When the user taps on the app icon, `MainActivity` will be launched because it is specified as the `MAIN` action and is in the `LAUNCHER` category.
