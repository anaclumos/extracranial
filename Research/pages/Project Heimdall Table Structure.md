---
lang: 'en'
slug: '/25C308'
---

```mermaid
erDiagram
  User }o--o{ Subscription : ""
  User ||--o{ CustomNewsletter : ""
  User }o--o{ CuratedNewsletter : ""
  CustomNewsletter ||--o{ Subscription : ""
  CuratedNewsletter ||--o{ Subscription : ""
  CustomNewsletter ||--o{ Content : ""
  CuratedNewsletter ||--o{ Content : ""
  Content ||--o{ ContentLinkSummary : ""
  Content ||--o{ Outbox : ""
  Outbox }o--|| Subscription : ""
  ContentLinkSummary }o--o{ LinkSummary : ""
  User {
    int id PK
    string Username
    string Password
    string Email
    string DisplayName
    boolean IsActive
    boolean EmailVerified
    string Timezone
    datetime CreatedAt
    datetime UpdatedAt
  }
  CuratedNewsletter {
    int id PK
    int UserId FK
    string PublicNewsletterHandle
    string NewsletterName
    string Description
    datetime CreatedAt
    datetime UpdatedAt
  }
  CustomNewsletter {
    int id PK
    int UserId FK
    string PublicNewsletterHandle
    string Keyword
    string TargetRegion
    boolean Active
    datetime CreatedAt
    datetime UpdatedAt
  }
  Subscription {
    int id PK
    int UserId FK
    int CuratedNewsletterId FK
    int CustomNewsletterId FK
    string Frequency
    string Time
    string Length
    string Locale
    boolean Active
    datetime CreatedAt
    datetime UpdatedAt
  }
  Content {
    int id PK
    int CuratedNewsletterId FK
    int CustomNewsletterId FK
    string MarkdownContent
    string Locale
    datetime CreatedAt
    datetime UpdatedAt
  }
  ContentLinkSummary {
    int id PK
    int ContentId FK
    int LinkSummaryId FK
    int Order
    datetime CreatedAt
    datetime UpdatedAt
  }
  Outbox {
    int id PK
    int ContentId FK
    int SubscriptionId FK
    string Status
    string ErrorMessage
    datetime CreatedAt
    datetime UpdatedAt
  }
  LinkSummary {
    int id PK
    string LinkUrl
    string Title
    string LinkSummary
    string Locale
    datetime CreatedAt
    datetime UpdatedAt
  }

```

### User Table

- `UserId` (Primary Key): A unique identifier for each user.
- `Username`: The username of the user.
- `Password`: The user's password (hashed and stored securely).
- `Email`: The user's email address.
- `DisplayName`
- `IsActive`
- `EmailVerified`
- `Timezone`
- `CreatedAt`
- `UpdatedAt`

### Curated Newsletter Table

- `NewsletterId` (Primary Key): A unique identifier for each pre-curated Newsletter.
- `PublicNewsletterHandle`
- `NewsletterName`: The name of the Newsletter.
- `Description`: A brief description of the Newsletter.
- `UserId`: Who created it?
- `CreatedAt`
- `UpdatedAt`

### Custom Newsletter Table

- `CustomNewsletterId` (Primary Key): A unique identifier for each custom Newsletter.
- `PublicNewsletterHandle`
- `Keyword`: The keyword related to the custom Newsletter.
- `Target Region`: The Target Region to search the keyword.
- `UserId` (Foreign Key): The user who created the custom Newsletter.
- `Active`
- `CreatedAt`
- `UpdatedAt`

### Subscription Table

- `SubscriptionId` (Primary Key): A unique identifier for each subscription.
- `UserId` (Foreign Key): The user who owns the subscription.
- `CuratedNewsletterId` (Foreign Key): The curated newsletter being subscribed to (null if it's a custom newsletter).
- `CustomNewsletterId` (Foreign Key): The custom newsletter being subscribed to (null if it's a curated newsletter).
- `Frequency`: How often the Newsletter is sent. (`daily`, `weekly`, `biweekly`, `monthly`)
- `Time`: When to receive the Newsletter in UTC.
- `Length`: The desired length of the Newsletter.
- `Locale`: The BCP-47 language tag represents the user's preferred language for this subscription.
- `Active`: Whether the subscription is active.
- `CreatedAt`
- `UpdatedAt`

### Content Table

- `ContentId` (Primary Key)
- `MarkdownContent` (optional field, a string containing the markdown-formatted Content)
- `Locale` (the BCP-47 language tag representing the language of the Content)
- `CuratedNewsletterId` (Foreign Key): The curated newsletter that the content belongs to (null if it belongs to a custom newsletter).
- `CustomNewsletterId` (Foreign Key): The custom newsletter that the content belongs to (null if it belongs to a curated newsletter).
- `CreatedAt`
- `UpdatedAt`

### ContentLinkSummary Table

- `ContentId` (Foreign Key, links to the Content that this link belongs to)
- `LinkSummaryId` (Foreign Key, links to the LinkSummary that is included in the Content)
- `Order` (An integer representing the order of this link in the Content)
- `CreatedAt`
- `UpdatedAt`

### Outbox Table

- `ContentSubscriptionId` (Primary Key): A unique identifier for each Content-subscription relation.
- `ContentId` (Foreign Key): The Content involved in the relation.
- `SubscriptionId` (Foreign Key): The subscription involved in the relation.
- `Status` field: To track if the newsletter was sent, failed, pending, etc.
- `ErrorMessage` field: If the send failed, store the reason for the failure.
- `CreatedAt`
- `UpdatedAt`

### LinkSummary Table

- `LinkSummaryId` (Primary Key)
- `LinkUrl`: The Normalized URL of the link.
- `Title`: The title of the linked Content.
- `LinkSummary`: The summary generated by the AI.
- `Locale`: The BCP-47 language tag represents the language of the summary.
- `CreatedAt`
- `UpdatedAt`
