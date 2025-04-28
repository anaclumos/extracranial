---
slug: '/30CC03'
---

[[2022-04-26]]

## One way that doesn't work: Using environment variables

- If you click the app name from the top bar in [[Xcode]], you can `edit scheme`.

![edit scheme](../assets/78CCD8.png)

- You can try settings values at Run → Arguments → Environment Variables and access them through `ProcessInfo.processInfo.environment["KEY"]`.

![ProcessInfo.processInfo.environment["KEY"]](../assets/9F79FB.png)

- However, this didn't work for me. Refer to this problem on Stack Overflow.

- [ProcessInfo.processInfo.environment variables work in Simulator but not on Device](https://stackoverflow.com/questions/53754682)

## One possible but unsafe way: `xcconfig`

- Create `.xcconfig` and add them to app build settings.
- Is it safe? No!

## Another possible buy unsafe way: `.gitignore`

- I just made a `.gitignore` that ignores all `*Credentials.swift` file.
- Is it safe? No!
- However, I am using LinkedIn [[API]] that makes a network request.
- Anyone who will take the effort to decompile the app and extract the [[API]] key data will attack the network request and extract the key.
- I concluded security beyond not disclosing them through the source control system is meaningless for my use case.

## One possible and safe way: Secure Enclaves.

- [What is a Secure Enclave? (Apple)](https://support.apple.com/guide/security/secure-enclave-sec59b0b31ff/web)
- [Storing Keys in the Secure Enclave (Apple)](https://developer.apple.com/documentation/security/certificate_key_and_trust_services/keys/storing_keys_in_the_secure_enclave)
- Deploy the app without a secret key.
- Access your server, download the information via HTTPS, and save it to the [[iOS]] secure enclave whenever you need the key.
- But do you really want this layer of complexity?

## Another possible (and probably the correct) way

- Just don't store that level of sensitive information on the client.

## Another another possible way that might be worth exploring

- Using Keychain Manager.

  - [Keychain Services API Tutorial for Passwords in Swift](https://www.raywenderlich.com/9240-keychain-services-api-tutorial-for-passwords-in-swift)

- However, these are meant for storing personal sensitive data like usernames and passwords.
- I am unsure if I can store data in Keychain without exposing it to the end-user or application (`.ipa`) file.
- [Apple Docs](https://developer.apple.com/documentation/security/certificate_key_and_trust_services/keys/storing_keys_in_the_keychain)

## Advanced [[Readings]]

- [Secret Management on iOS](https://nshipster.com/secrets/)
