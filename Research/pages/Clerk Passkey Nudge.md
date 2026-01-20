---
lang: 'ko'
slug: '/9CC34D'
---

You can create a custom UI component that prompts users to add a passkey. Use the `user.createPasskey()` method from Clerk's SDK:

```tsx
import { useUser } from '@clerk/clerk-react'

export function PasskeyNudge() {
  const { isSignedIn, user } = useUser()

  const createClerkPasskey = async () => {
    if (!isSignedIn) return

    try {
      await user?.createPasskey()
      // Show success message
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }

  // Check if user already has passkeys
  const hasPasskey = user?.passkeys && user.passkeys.length > 0

  if (hasPasskey) return null

  return (
    <div className="passkey-nudge">
      <p>🔐 Set up a passkey for faster, more secure sign-ins!</p>
      <button onClick={createClerkPasskey}>Add Passkey</button>
    </div>
  )
}
```

## Implementation Strategies

Here are some ways to nudge users:

1. **Post-login prompt** — Show a modal or banner after sign-in if the user doesn't have a passkey set up
2. **Settings page highlight** — Add a prominent section in user settings encouraging passkey setup
3. **Conditional prompts** — Show the nudge after a certain number of SMS-based logins
4. **Incentive messaging** — Highlight benefits like "Sign in faster with Face ID/Touch ID"

## Using an Onboarding Flow

For a more structured approach, you can integrate passkey setup into a custom onboarding flow. Clerk has a guide that shows how to use session tokens, public metadata, and Middleware to require users to complete certain steps before accessing your app:

**[Add custom onboarding to your authentication flow](https://clerk.com/docs/guides/development/add-onboarding-flow)**

You could adapt this pattern to prompt users to set up a passkey as part of onboarding, tracking their passkey status in `publicMetadata` and redirecting them to a passkey setup page until they've added one.

## Prerequisites

- Ensure passkeys are enabled in your [Clerk Dashboard](https://dashboard.clerk.com/) under **User & Authentication → Passkeys**
- Note: Passkeys require a [paid plan](https://clerk.com/pricing) for production use (free in development)

You can check `user.passkeys` to determine if a user already has passkeys configured and conditionally show your nudge UI accordingly.
