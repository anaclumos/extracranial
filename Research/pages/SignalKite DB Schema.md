---
lang: 'en'
slug: '/C542CD'
---

```mermaid
erDiagram
    User ||--o{ Kite : "creates"
    User ||--o{ Schedule : "owns"
    User ||--o{ NotificationChannel : "owns"
    User ||--o{ Subscription : "subscribes"
    User ||--o{ Prompt : "creates"

    Kite ||--o{ Scout : "has"
    Kite ||--o{ Story : "contains"
    Kite }|--|{ Schedule : "runs_on"
    Kite ||--o{ Subscription : "has"
    Kite }o--o{ Prompt : "uses"

    Schedule ||--o{ Run : "triggers"
    Schedule ||--o{ ScheduleKite : "has"

    Scout ||--o{ Story : "discovers"
    Scout }o--|| Run : "part_of"

    Story }o--o{ Prompt : "uses"

    NotificationChannel ||--o{ Subscription : "used_by"

    ScheduleKite }o--|| Kite : "links"
    ScheduleKite }o--|| Schedule : "links"

    User {
        string id PK
        string kindeId
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        datetime lastLogin
    }

    Kite {
        string id PK
        string name
        string description
        enum strategy
        enum status
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        string creatorId FK
        string promptId FK
    }

    Schedule {
        string id PK
        string name
        string cron
        datetime nextRunAt
        datetime lastRunAt
        boolean paused
        string ownerId FK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
    }

    Scout {
        string id PK
        string kiteId FK
        string runId FK
        boolean successful
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
    }

    Story {
        string id PK
        string title
        string url
        string summary
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        string promptId FK
        string scoutId FK
        string kiteId FK
    }

    NotificationChannel {
        string id PK
        string name
        enum type
        json settings
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        string userId FK
    }

    Subscription {
        string id PK
        string userId FK
        string kiteId FK
        string notificationChannelId FK
        datetime createdAt
        datetime updatedAt
    }

    Prompt {
        string id PK
        string description
        string text
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        string creatorId FK
    }

    Run {
        string id PK
        string scheduleId FK
        datetime startedAt
        datetime completedAt
    }

    ScheduleKite {
        string id PK
        string scheduleId FK
        string kiteId FK
    }
```

generator client {
provider = "prisma-client-js"
previewFeatures = ["driverAdapters"]
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

/// Represents different strategies that a Kite can use to gather or discover stories.
enum KiteStrategyType {
/// Use EXA_SEARCH as the data fetching strategy.
EXA_SEARCH
/// Use WHOIS_LOOKUP as the data fetching strategy.
WHOIS_LOOKUP
/// Use HN_BEST_STORIES (Hacker News best stories feed) as the data fetching strategy.
HN_BEST_STORIES
}

/// Represents the type of notification channel through which a user can receive notifications.
enum NotificationChannelType {
/// Notifications via Email.
EMAIL
/// Notifications via SMS.
SMS
/// Notifications via Slack.
SLACK
}

/// Represents the possible statuses of a Kite.
enum KiteStatus {
/// The Kite is actively scanning or ready to be scanned.
ACTIVE
/// The Kite is paused and not currently running scans, but visible at the marketplace.
PAUSED
/// The Kite is archived and not visible or active, but still exists in the database, and only visible to the owner.
ARCHIVED
}

/// A User represents a person who uses the application.
/// This model contains user-related fields and the relationships
/// the user has with other models.
model User {
/// The unique identifier for the user.
id String @id @default(ulid())
/// The unique identifier from the Kinde auth provider.
kindeId String @unique
/// Timestamp when the user record was created.
createdAt DateTime @default(now()) @db.Timestamptz()
/// Timestamp when the user record was last updated.
updatedAt DateTime @default(now()) @updatedAt @db.Timestamptz()
/// Soft-delete timestamp; if set, the user is considered deleted but may be recoverable.
deletedAt DateTime?
/// The timestamp of the user's last login.
lastLogin DateTime?

/// The list of Kites created by this user.
Kites Kite[]
/// The list of Schedules owned by this user.
Schedules Schedule[]
/// The list of NotificationChannels created/owned by this user.
Channels NotificationChannel[]
/// The list of Subscriptions this user has made to other users' Kites.
Subscriptions Subscription[]
Prompt Prompt[]
}

/// A Prompt is a reusable entity that can store text used for post-processing
/// titles and descriptions of Stories or other content. Multiple Kites or Stories
/// can reference the same Prompt, making it reusable across the system.
model Prompt {
/// The unique identifier for the Prompt.
id String @id @default(ulid())
/// A short description or name for the prompt.
description String?
/// The actual text/content of the prompt used for post-processing.
text String?
/// Timestamp when the Prompt was created.
createdAt DateTime @default(now()) @db.Timestamptz()
/// Timestamp when the Prompt was last updated.
updatedAt DateTime @default(now()) @updatedAt @db.Timestamptz()
/// Soft-delete timestamp; if set, the Prompt is considered deleted.
deletedAt DateTime?

/// The user who created this Prompt (its owner).
creator User @relation(fields: [creatorId], references: [id])
/// Foreign key referencing the creator of this Prompt.
creatorId String

/// The Kites that reference this Prompt for post-processing.
Kites Kite[]
/// The Stories that reference this Prompt for post-processing.
Stories Story[]
}

/// A Kite represents a "data stream" or a monitored topic/keyword set that the user wants to track.
/// Each Kite uses a specific strategy to discover stories and can have multiple stories and scouts.
model Kite {
/// The unique identifier for the Kite.
id String @id @default(ulid())
/// The human-readable name of the Kite.
name String @db.VarChar(100)
/// An optional description of what the Kite is monitoring.
description String? @db.Text()
/// The strategy this Kite uses to fetch or discover data.
strategy KiteStrategyType @default(EXA_SEARCH)
/// The current operational status of the Kite.
status KiteStatus @default(ACTIVE)
/// Timestamp when the Kite record was created.
createdAt DateTime @default(now()) @db.Timestamptz()
/// Timestamp when the Kite record was last updated.
updatedAt DateTime @default(now()) @updatedAt @db.Timestamptz()
/// Soft-delete timestamp; if set, the Kite is considered deleted or archived.
deletedAt DateTime?
/// Foreign key referencing the Prompt used by this Kite for post-processing.
promptId String?

/// The user who created this Kite (its owner).
creator User @relation(fields: [creatorId], references: [id])
/// Foreign key referencing the creator of this Kite.
creatorId String

/// The Prompt referenced by this Kite for post-processing.
Prompt Prompt? @relation(fields: [promptId], references: [id])

/// The list of Scouts (scans) that have been performed for this Kite.
Scouts Scout[]
/// The list of Stories discovered for this Kite.
Stories Story[]
/// The join model that associates Kites with Schedules (many-to-many relation).
ScheduleKites ScheduleKite[]
/// Subscriptions from other users who are interested in updates from this Kite.
Subscriptions Subscription[]

@@index([creatorId])
}

/// A Story is a piece of content discovered by a Scout for a specific Kite.
/// It holds the data about the discovered URL, title, summary, and other meta fields.
model Story {
/// The unique identifier for the Story.
id String @id @default(ulid())
/// The title of the Story (possibly processed with prompts).
title String
/// The URL where the Story content can be found.
url String @db.VarChar(2048)
/// A summary or snippet of the content of the Story.
summary String?
/// Timestamp when the Story was created.
createdAt DateTime @default(now()) @db.Timestamptz()
/// Timestamp when the Story was last updated.
updatedAt DateTime @default(now()) @updatedAt @db.Timestamptz()
/// Soft-delete timestamp; if set, the Story is considered deleted.
deletedAt DateTime?
/// Foreign key referencing the Prompt used by this Story for post-processing.
promptId String?
/// The ID of the Scout that discovered this Story.
scoutId String
/// Foreign key referencing the Kite this Story belongs to (optional).
kiteId String?

/// The Prompt referenced by this Story for post-processing.
Prompt Prompt? @relation(fields: [promptId], references: [id])
/// The Scout that discovered this Story.
Scout Scout @relation(fields: [scoutId], references: [id])
/// The Kite this Story belongs to (if applicable).
Kite Kite? @relation(fields: [kiteId], references: [id])

@@index([scoutId, createdAt])
}

/// A Scout represents a single run or scan performed by a Kite at a given moment in time.
/// It stores whether the scan was successful and references all discovered Stories.
model Scout {
/// The unique identifier for the Scout.
id String @id @default(ulid())
/// Foreign key referencing the Kite that was scanned.
kiteId String
/// Optional foreign key referencing the Run that triggered this Scout.
runId String?
/// Whether the scan was successful or not.
successful Boolean @default(true)

/// Timestamp when the Scout was created.
createdAt DateTime @default(now()) @db.Timestamptz()
/// Timestamp when the Scout was last updated.
updatedAt DateTime @default(now()) @updatedAt @db.Timestamptz()
/// Soft-delete timestamp; if set, the Scout is considered deleted.
deletedAt DateTime?

/// The Kite that was scanned.
Kite Kite @relation(fields: [kiteId], references: [id])
/// The Run that triggered this Scout (if any).
Run Run? @relation(fields: [runId], references: [id])
/// The Stories discovered by this Scout.
Stories Story[]

@@index([kiteId])
}

/// A Schedule defines when (at what cron interval) certain Kites should be scanned.
/// Schedules are owned by a User and can be linked to multiple Kites via ScheduleKite.
model Schedule {
/// The unique identifier for the Schedule.
id String @id @default(ulid())
/// A human-readable name for the Schedule.
name String @db.VarChar(100)
/// The cron expression defining when the Schedule runs.
cron String @db.VarChar(100)
/// Timestamp indicating when the schedule is next due to run.
nextRunAt DateTime?
/// Timestamp of the last time this schedule ran.
lastRunAt DateTime?
/// Whether the schedule is currently paused.
paused Boolean @default(false)
/// The owner (User) of this schedule.
owner User @relation(fields: [ownerId], references: [id])
/// Foreign key referencing the User who owns this schedule.
ownerId String
/// Timestamp when the Schedule was created.
createdAt DateTime @default(now()) @db.Timestamptz()
/// Timestamp when the Schedule was last updated.
updatedAt DateTime @default(now()) @updatedAt @db.Timestamptz()
/// Soft-delete timestamp; if set, the Schedule is considered deleted.
deletedAt DateTime?
/// The join records linking this Schedule with Kites that should be run on this schedule.
ScheduleKites ScheduleKite[]
/// The Runs that have been executed by this Schedule.
Run Run[]
}

/// A ScheduleKite model acts as a join model for the many-to-many relationship between Schedules and Kites.
/// This allows multiple Kites to be associated with a single Schedule and vice versa.
model ScheduleKite {
/// The unique identifier for the ScheduleKite record.
id String @id @default(ulid())
/// Foreign key referencing the Schedule.
scheduleId String
/// Foreign key referencing the Kite.
kiteId String

/// The Schedule in the relationship.
schedule Schedule @relation(fields: [scheduleId], references: [id])
/// The Kite in the relationship.
kite Kite @relation(fields: [kiteId], references: [id])

@@unique([scheduleId, kiteId])
}

/// A Run represents a batch execution triggered by a Schedule.
/// When a Schedule runs at its specified cron time, it creates a Run that can trigger multiple Scouts (for multiple Kites).
model Run {
/// The unique identifier for the Run.
id String @id @default(ulid())
/// Foreign key referencing the Schedule that triggered this Run.
scheduleId String?
/// Timestamp when the Run started.
startedAt DateTime @default(now()) @db.Timestamptz()
/// Timestamp when the Run completed.
completedAt DateTime?

/// The Schedule that triggered this Run.
schedule Schedule? @relation(fields: [scheduleId], references: [id])

/// The Scouts (Kite scans) initiated by this Run.
Scouts Scout[]
}

/// A NotificationChannel represents a means of delivering notifications (Email, SMS, Slack).
/// It also stores any necessary configuration in the `settings` field.
model NotificationChannel {
/// The unique identifier for the NotificationChannel.
id String @id @default(ulid())
/// A human-readable name for this notification channel.
name String @db.VarChar(100)
/// The type of channel: EMAIL, SMS, or SLACK.
type NotificationChannelType
/// A JSON field to store configuration or credentials for this channel.
settings Json
/// Timestamp when the NotificationChannel was created.
createdAt DateTime @default(now()) @db.Timestamptz()
/// Timestamp when the NotificationChannel was last updated.
updatedAt DateTime @default(now()) @updatedAt @db.Timestamptz()
/// Soft-delete timestamp; if set, the channel is considered deleted.
deletedAt DateTime?
/// Foreign key referencing the User who owns this NotificationChannel.
userId String?
/// The User who owns this NotificationChannel.
user User? @relation(fields: [userId], references: [id])
/// The subscriptions that use this NotificationChannel for notifications.
Subscription Subscription[]
}

/// A Subscription allows a User (subscriber) to subscribe to a Kite owned by another User.
/// Subscriptions may optionally reference a specific NotificationChannel for delivering updates.
model Subscription {
/// The unique identifier for the Subscription.
id String @id @default(ulid())
/// Foreign key referencing the User who is subscribing.
userId String
/// Foreign key referencing the Kite being subscribed to.
kiteId String
/// Optional foreign key referencing the NotificationChannel used for this subscription.
notificationChannelId String?

/// Timestamp when the Subscription was created.
createdAt DateTime @default(now()) @db.Timestamptz()
/// Timestamp when the Subscription was last updated.
updatedAt DateTime @default(now()) @updatedAt @db.Timestamptz()

/// The User who is subscribing to the Kite.
user User @relation(fields: [userId], references: [id])
/// The Kite being subscribed to by the user.
kite Kite @relation(fields: [kiteId], references: [id])
/// The NotificationChannel (if any) that this subscription uses to send notifications.
notificationChannel NotificationChannel? @relation(fields: [notificationChannelId], references: [id])

@@unique([userId, kiteId]) // Ensures a user cannot subscribe to the same Kite more than once.
@@index([userId])
@@index([kiteId])
}
