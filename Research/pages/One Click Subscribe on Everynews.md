---
lang: 'en'
slug: '/385E54'
---

Here's the flow we force on readers today:

1. Navigate to an alert or story page
2. Click "Sign in to subscribe"
3. Complete the authentication process
4. Return to the alert page
5. Click subscribe
6. Select delivery preferences
7. Confirm subscription

It's slow. Users bail.

### The Fix (2 clicks, no drama)

1. Type email, hit **Subscribe**.
2. Tap the **Confirm** link we send.

Done. Account auto created, alert active, subscription started.

## But how

It should...

- reuse our auth stack—no new infra.
- Verification stays at 100 %.
- < 1 s form submit, zero extra page load.
- Cheap to ship—just UI swap + token email.

## Better Auth Framework Limitations

Better Auth's magic link system provides specific interfaces:

```typescript
sendMagicLink: async (
  { email, url, token }: { email: string; url: string; token: string },
  request?: Request
) => Promise<void>

auth.signIn.magicLink(
  options: { email: string; callbackURL?: string },
  fetchOptions?: RequestInit
)
```

Key constraints had:

- Cannot modify token generation
- Cannot pass custom metadata in primary parameters (Important)
- Single sendMagicLink function for all flows, both regular sign-in and one-click-sub
- Limited control over verification process

## Option 1: Custom Authentication Flow

Build a parallel authentication system specifically for subscriptions, bypassing Better Auth entirely.

```typescript
// Custom token generation
const token = crypto.randomUUID()
await redis.set(`sub_token:${token}`, { email, alertId }, { ex: 300 })

// Custom verification endpoint
app.post('/api/verify-subscription/:token', async (req) => {
  const data = await redis.get(`sub_token:${req.params.token}`)
  if (!data) return error('Invalid token')

  // Create user and subscription
  const user = await createUser(data.email)
  await createSubscription(user.id, data.alertId)

  // Create session
  const session = await createSession(user.id)
  return { success: true, session }
})
```

Pros

- **Complete Control** — Full ownership of the subscription flow
- **Custom Metadata** — Pass any data through the verification process
- **Flexible Templates** — Different emails for different scenarios
- **Direct Integration** — No workarounds needed
- **Feature-Rich** — Easy to add subscription-specific features

Cons

- **Security Risk** — Maintaining two authentication systems
- **Complexity** — Duplicate token generation, validation, session management
- **Maintenance Burden** — Two systems to update and monitor
- **Inconsistency** — Different flows for similar actions
- **Testing Overhead** — Double the authentication tests
- **Technical Debt** — Divergent implementations over time

Risk Assessment

- **High Risk** — Security vulnerabilities from custom implementation
- **Medium Risk** — User confusion from inconsistent experiences
- **High Risk** — Maintenance complexity grows exponentially

## Option 2: Database-Backed Intent Storage

Store subscription intent in database, linked to Better Auth tokens.

## 4.2.2 Implementation Design

```typescript
// Database schema
const subscriptionIntents = pgTable('subscription_intents', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  token: text('token').notNull().unique(),
  email: text('email').notNull(),
  alertId: text('alert_id').notNull(),
  alertName: text('alert_name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
})

// Store intent before magic link
const token = generateToken()
await db.insert(subscriptionIntents).values({
  token,
  email,
  alertId,
  alertName,
  expiresAt: new Date(Date.now() + 5 * 60 * 1000),
})

// Retrieve in sendMagicLink
const intent = await db.query.subscriptionIntents.findFirst({
  where: and(eq(subscriptionIntents.token, token), gt(subscriptionIntents.expiresAt, new Date())),
})
```

Pros

- **Persistent Storage** — Survives server restarts
- **Rich Metadata** — Store complex subscription preferences
- **Audit Trail** — Track subscription attempts
- **Distributed Safe** — Works across multiple servers
- **Cleanup Friendly** — Easy to purge expired intents

Cons

- **Database Changes** — Requires new table and migrations
- **Timing Issues** — Token might not exist when sendMagicLink is called
- **Cleanup Required** — Need background job for expired records
- **Additional Queries** — Extra database calls in critical path
- **Complexity** — More moving parts to coordinate

Risk Assessment

- **Low Risk** — Well-understood database patterns
- **Medium Risk** — Performance impact from additional queries
- **Low Risk** — Easy to rollback if needed

## Option 3: URL Parameter Passing

Encode subscription intent in callback URLs.

```typescript
// Encode intent in URL
const params = new URLSearchParams({
  type: 'subscription',
  alertId: alert.id,
  alertName: alert.name,
})

await auth.signIn.magicLink({
  email,
  callbackURL: `/verify?${params.toString()}`,
})

// Parse in sendMagicLink
const url = new URL(magicLinkUrl)
const isSubscription = url.searchParams.get('type') === 'subscription'
const alertName = url.searchParams.get('alertName')
```

Pros

- **Stateless** — No storage required
- **Simple** — Direct parameter passing
- **Transparent** — Visible in logs for debugging
- **Standard** — Uses web platform APIs

Cons

- **URL Length** — Long URLs in emails
- **Encoding Issues** — Special characters need encoding
- **Security Concerns** — Parameters visible to users
- **Email Client Issues** — Some clients truncate long URLs
- **Tampering Risk** — Users could modify parameters

Risk Assessment

- **Medium Risk** — URL manipulation possible
- **Low Risk** — Standard URL encoding well-supported
- **Medium Risk** — User experience degradation

## Option 4: HTTP Headers via Fetch Options (Selected)

Utilize Better Auth's fetch options parameter to pass custom headers.

```typescript
// Client-side implementation
await auth.signIn.magicLink(
  {
    email,
    callbackURL: `/subscriptions/success?alertId=${alert.id}`,
  },
  {
    headers: {
      'X-Subscription-Flow': 'true',
      'X-Alert-Id': alert.id,
      'X-Alert-Name': encodeURIComponent(alert.name),
    },
  }
)

// Server-side handling
sendMagicLink: async ({ email, url }, request) => {
  const isSubscription = request?.headers.get('x-subscription-flow') === 'true'
  const alertName = request?.headers.get('x-alert-name')

  if (isSubscription && alertName) {
    // Send subscription email
  } else {
    // Send regular email
  }
}
```

Pros

- **Clean Integration** — Works within Better Auth's design
- **No Storage** — Stateless approach
- **Standards-Based** — Uses HTTP headers properly
- **Invisible** — Hidden from end users
- **Secure** — Headers only visible server-side
- **Simple** — Minimal code changes

Cons

- **ASCII Limitation** — Headers must be ASCII-encoded
- **Size Limits** — Header size restrictions
- **Less Flexible** — Can't pass complex objects
- **Debugging** — Headers not visible in browser

Risk Assessment

- **Low Risk** — Standard HTTP header usage
- **Low Risk** — Encoding handles edge cases
- **Low Risk** — Graceful fallback possible

## Selected Solution

### Decision Matrix

| Criteria        | Custom Auth | DB Storage | URL Params | Headers |
| --------------- | ----------- | ---------- | ---------- | ------- |
| Security        | ❌❌        | ✅         | ❌         | ✅      |
| Simplicity      | ❌          | ❌         | ✅         | ✅      |
| Maintainability | ❌❌        | ❌         | ✅         | ✅      |
| Performance     | ✅          | ❌         | ✅         | ✅      |
| User Experience | ✅          | ✅         | ❌         | ✅      |
| **Total Score** | 2           | 2          | 3          | 5       |

## Rationale

The HTTP headers approach was selected because:

1. **Minimal Complexity** — No database changes or custom authentication
2. **Security** — Headers are server-side only, preventing tampering
3. **Performance** — No additional storage or queries
4. **Compatibility** — Works within Better Auth's constraints
5. **Maintainability** — Simple, standard approach

## Trade-offs Accepted

- **ASCII Encoding** — Must encode special characters in alert names
- **Limited Metadata** — Can't pass complex subscription preferences
- **Single Flow** — All subscriptions use same basic flow
