---
lang: 'en'
slug: '/FBA8E3'
---

- Side startup [[project]] that never made it to the market.
- Aimed for `ask.fm` but with modern features like the **Share to [[Instagram]]** feature.
- Officially confirmed dead on [[2022-10-27]] due to [NGL](https://ngl.link/). Has the same feature set.
- A demo version is still live on [goongoom.vercel.app](https://goongoom.vercel.app)

Service concept (what it is)
This UI describes a lightweight social Q&A product centered on "asking people questions" and reading their answers. Each user has a public profile page (e.g., `/@junhoyeo`) where other people can leave a question. The profile owner answers; the question + answer pair is displayed publicly in a chat-bubble format and also appears in a global/home feed. The product supports asking either anonymously ("익명") or with a real identity ("실명").

The brand/theme is strongly "Orange" (orange gradients, orange answer bubbles, orange active navigation). The layout is a consistent 3-column desktop layout: left global navigation, center main content, right contextual sidebar.

Primary user roles

1. Visitor (not necessarily logged in)

- Can browse Home feed and user profiles.
- Can open a user profile and (depending on auth rules) submit a new question.

2. Authenticated user

- Has "내 프로필" (My Profile) entry in left navigation.
- Can ask questions as anonymous or real name (identity selection UI implies this).
- Receives notifications ("알림") about new questions/answers.
- Can answer questions directed to them (the answering UI isn't shown in these screenshots, but it is functionally required for the product to work).

Information architecture (routes/pages)
Left navigation contains four top-level sections, always visible:

- 홈 (Home) → `/`
- 내 프로필 (My Profile) → typically your own profile route, likely `@{myHandle}` or a fixed `/me` redirect
- 알림 (Notifications) → `/notifications` (name inferred from label; route can vary)
- 더보기 (More) → `/more`

Observed pages
A) Home feed (`/`)

- Center column: a large hero/banner card at the top with branding text:
  - "Orange is the new Question™"
  - "Just another good day."

- Below banner: a feed of Q&A pairs displayed as chat bubbles (question on the left, answer on the right).
- Right sidebar: user discovery lists
  - "최근에 본 사람" (Recently viewed people)
  - "나랑 관련된 사람" (People related to me)
    Each entry shows avatar, display name, and handle; clicking should navigate to that profile.

B) Profile page (`/@handle`)

- Center column header:
  - Large circular avatar with orange ring
  - Display name (e.g., "주노")
  - Handle (e.g., `@junhoyeo`)
  - Short bio/tagline (e.g., "Creating INEVITABLE™ Services")
  - Social links row (Instagram / Facebook / GitHub icons with Korean labels)

- Below header: a timeline/feed of Q&A pairs related to this profile (the same bubble format as Home).
- Right sidebar: "Ask a new question" composer targeted to this profile owner:
  - Title: "{name} 님에게 새 질문을 남겨보세요." (Leave a new question to {name}.)
  - A multiline text area for the question content.
  - Identity selection: "누구로 질문할까요?" (Who will you ask as?)
    - Radio-card option 1: "익명" (Anonymous) + a secondary line (shown as "테스트" in the mock; likely the current user name or a placeholder)
    - Radio-card option 2: "실명" (Real name) + secondary line (same)

  - Submit button: "익명으로 질문하기" (Ask anonymously) with a lock icon.
    - In the screenshot it is disabled/greyed out (very likely because the text area is empty).
    - The label should change depending on the selected identity (e.g., "실명으로 질문하기" when real-name is selected).

  - Consent copy: "질문하기 버튼을 탭하면 사용 약관에 동의하는 것입니다." (By tapping Ask, you agree to the Terms of Use.) with "사용 약관" as a link.

C) More page (`/more`)

- Center column title: "더보기" (More)
- List of utility/support sections, each with an icon and label:
  - 공지사항 (Announcements/Notices)
  - 이벤트 (Events)
  - 문의하기 (Contact/Inquiry)
  - 환경설정 (Settings)

Core interaction model (what the product _does_)

1. Asking a question

- User visits a target profile (`/@handle`).
- User enters question text in the right sidebar text area.
- User chooses identity mode:
  - Anonymous: receiver and public viewers see the asker as "익명".
  - Real name: receiver and public viewers see the asker's display name (or chosen profile identity).

- User submits.
- Expected system behavior:
  - Create a Question record (status: "pending/unanswered" initially).
  - Notify the recipient user (shows up in 알림).
  - The question may or may not appear publicly before being answered (product decision). The screenshots show only answered pairs in feeds, so a reasonable default is:
    - Public feeds show only answered questions.
    - The recipient sees unanswered questions privately in Notifications or an inbox.

2. Answering a question (required even if UI not shown here)

- Recipient opens their incoming questions list (likely under 알림).
- Recipient writes an answer.
- System saves Answer linked to Question; Question status becomes "answered".
- The pair becomes visible in:
  - Recipient's profile Q&A timeline.
  - Home feed (either global or personalized).

3. Browsing / discovery

- Home feed shows answered Q&A pairs, with a prominent brand banner.
- Right sidebar "Recently viewed people" is populated when you visit profiles.
- "People related to me" is a recommendation list (definition is a product decision; see recommendation logic below).

UI presentation rules (important for faithfully rebuilding the screens)
Global layout

- Left fixed navigation rail:
  - Icon + label for each section.
  - Active item has a rounded "pill" highlight with light orange background and orange icon/text.
  - Inactive items are grey.

- Center main content:
  - Neutral background (very light grey/white).
  - Large whitespace; content is in a centered column.

- Right sidebar:
  - Context-specific modules (ask composer on profile; people lists on home).

Q&A feed item layout (chat-bubble style)
Each "item" is essentially a two-message conversation:

- Question message (left aligned)
  - Small circular avatar (asker)
  - White rounded rectangle bubble with black text
  - Metadata below bubble: "{askerNameOr익명} · 약 N년 질문"

- Answer message (right aligned)
  - Small circular avatar (profile owner)
  - Orange rounded rectangle bubble with white text
  - Metadata below bubble, aligned to the right: "{ownerName} · 약 N년 답변"

- Items are separated by subtle horizontal dividers and generous vertical spacing.

Profile header

- Large avatar with orange ring/border.
- Name and handle stacked, bio beneath.
- Social icons are large, in a row, each with a Korean label underneath.

Functional requirements a developer needs (backend + frontend)
Data entities (minimum viable schema)

1. User

- id (UUID/Int)
- handle (string, unique; used in `/@handle`)
- displayName (string)
- bio (string, optional)
- avatarUrl (string, optional) or avatarType for generated avatars
- createdAt, updatedAt
- socialLinks (separate table or JSON)
- settings (separate table or JSON)

2. SocialLink

- id
- userId (FK)
- platform (enum: instagram, facebook, github, …)
- url (string)
- order (int)

3. Question

- id
- recipientUserId (FK → User)
- askerUserId (nullable FK → User) (nullable supports true-guest anonymous)
- askIdentityMode (enum: anonymous, realname)
- askerDisplayNameSnapshot (string)
  - Important: store snapshot so past questions remain stable even if asker changes name.

- body (text)
- createdAt
- status (enum: pending, answered, hidden, deleted)
- visibility (enum: public_when_answered, public_immediately, private) (product decision)

4. Answer

- id
- questionId (FK → Question, unique if only one answer allowed)
- responderUserId (FK → User; should match Question.recipientUserId)
- body (text)
- createdAt, updatedAt

5. Notification

- id
- userId (FK → User) (receiver)
- type (enum: new_question, question_answered, system_announcement, …)
- entityType/entityId (polymorphic reference)
- isRead (bool)
- createdAt

6. ProfileView (for "Recently viewed people")

- viewerUserId (FK → User)
- viewedUserId (FK → User)
- lastViewedAt
- viewCount
- (viewerUserId, viewedUserId) unique

7. RelationshipSuggestion (optional, for "People related to me")

- viewerUserId
- relatedUserId
- reason (enum: mutual_views, mutual_interactions, imported_contacts, follow_graph, etc.)
- score (float)
- updatedAt

Key API endpoints (example)
Public

- GET `/api/feed` → list of answered Q&A items (pagination: cursor/limit)
- GET `/api/users/:handle` → profile header data + social links
- GET `/api/users/:handle/qna?answered=true` → Q&A list for profile (pagination)
- GET `/api/users/suggestions` → for home right sidebar (recent + related)

Authenticated actions

- POST `/api/questions`
  - body: `{ recipientHandle | recipientUserId, text, identityMode }`
  - server derives asker info and stores snapshots
  - creates notification to recipient

- POST `/api/questions/:id/answer`
  - body: `{ text }`
  - authz: only recipient can answer
  - updates question status → answered
  - fanout: add to feed indexes, notify asker if identifiable

- GET `/api/notifications`
- POST `/api/notifications/:id/read`

Access control rules (must be explicit)

- Only the recipient user can answer, hide, delete, or moderate questions addressed to them.
- If identityMode=anonymous, public displayName is "익명" regardless of askerUserId.
- If identityMode=realname, displayName is askerDisplayNameSnapshot (typically asker's current name at the time of asking).
- Home feed likely includes only answered Q&A (matches what is shown).
- Profile Q&A list likely shows only answered Q&A publicly; unanswered questions are visible only to the profile owner via notifications/inbox.

Client-side state rules (to match screenshots)

- Ask button disabled until:
  - Text area is non-empty (and passes min/max length constraints)
  - An identity option is selected (default can be Anonymous)

- Ask button label and icon:
  - If anonymous selected: lock icon + "익명으로 질문하기"
  - If real name selected: (either no lock icon or different icon) + "실명으로 질문하기"

- Time formatting:
  - The UI shows relative time in Korean with an approximation marker: "약 5년"
  - Implement a relative time formatter that outputs minutes/hours/days/months/years in Korean, and uses "약" for coarse units (months/years).

Recommendation logic (right sidebar on Home)

- "최근에 본 사람" (Recently viewed)
  - Sorted by lastViewedAt desc, limit (e.g., 4–10).
  - Populated on profile page visits (record profile view event).

- "나랑 관련된 사람" (Related)
  Practical MVP options:
  1. Interaction-based: users you asked questions to, users who asked you questions, users whose content you viewed frequently.
  2. Similarity-based: "people also viewed" from ProfileView co-visitation.
  3. Follow-based (if you add following later).
     The screenshot shows the same list in both sections; that can happen in early MVP if both modules share the same source while you build real logic later.

More page subfeatures (what each likely contains)
Even though not shown, developers need a definition to implement:

- Announcements (공지사항): list of system notices; likely admin-managed; can also generate notifications.
- Events (이벤트): promotional events; could be static pages or a list with banners.
- Contact (문의하기): support form or email/contact details.
- Settings (환경설정): account preferences (privacy, who can ask, notification prefs, profile edit, language/theme).

Non-functional requirements (strongly recommended for this product type)

- Abuse/spam controls (especially because anonymous questions exist):
  - Rate limiting per IP/user (questions per minute/day).
  - Basic profanity/abuse filtering (server-side).
  - Recipient controls: block users, auto-hide anonymous, report, delete/hide Q&A.

- Privacy:
  - If you store askerUserId even for anonymous questions, keep it private and visible only to admins/moderation tools (or only to recipient if you explicitly decide so).

- Pagination and performance:
  - Infinite scroll for feed and profile Q&A lists.
  - Indexes on `(recipientUserId, createdAt)`, `(status, createdAt)` for feed.

- Internationalization:
  - UI is primarily Korean, but includes English branding. Use an i18n layer so labels are not hardcoded.

Summary of what to build (MVP scope that matches the screenshots)

1. A three-column web UI with a left nav (Home / My Profile / Notifications / More).
2. Home page: orange hero banner + feed of answered Q&A + right sidebar (recently viewed + related).
3. Profile page: profile header (avatar/name/handle/bio/social links) + Q&A timeline + right-side "ask question" composer with identity selector and terms link.
4. A working backend for Users, Questions, Answers, Notifications, and ProfileView, with clear visibility and authorization rules.
5. A Notifications/inbox experience for the profile owner to receive questions and answer them (UI not shown, but required for the service loop).

If you want, I can turn this into a more formal PRD (user stories + acceptance criteria per screen, plus a concrete DB schema and endpoint contracts), but the above is sufficient for an experienced developer to implement an MVP that matches these screens.
