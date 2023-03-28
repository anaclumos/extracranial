---
lang: 'en'
slug: '/598D73'
---

As TourScout continues to chart new territories in the travel industry, our identity management system will play a pivotal role in ensuring a seamless and secure user experience. In this proposal, we outline the critical aspects of our identity management system, covering both Authentication ("Who are you? Or are you an alien in disguise?") and Authorization ("What can you do? And no, you can't teleport!"). We've chosen Supabase as our platform—it supports various authentication methods, including email, Google, Apple, and Facebook sign-in. In addition, our proposed architecture leverages JWT (JSON Web Tokens) and a serverless design.

![[AEC99E.png]]

## Architecture Options

### Serverful: Separate Node.js Server

- A single API server processes all requests (the Hercules of servers).
- Plays well with legacy systems.
- Less vendor lock-in (because freedom is priceless).
- Higher costs and scalability challenges (Amdahl's Law sends its regards).
- Requires a separate backend hosting provider (e.g., AWS Elastic Beanstalk or Railway).

### Serverless (Recommended)

- The "server" is split into smaller, on-demand pieces (think server tapas).
- Some workarounds may be required (but we're clever like that).
- Can be hosted entirely within Supabase (one-stop-shop, anyone?).
- Aligned with industry trends, though slightly experimental (we're adventurous).

## Authentication

### JWT (Recommended)

We recommend using JWT for Authentication, as it provides a more scalable and secure solution. JWT is like a national ID but without the long lines at the DMV. In addition, it acts as cryptographic proof that can be reused across multiple servers.

### Sessions

- The server maintains a static "memory" of user identity (it never forgets a face).
- Scalability can be tricky (like solving a Rubik's cube blindfolded).
- Redis can address session-sharing challenges (Netflix-level engineering skills not included).

## Conclusion

In conclusion, we recommend the JWT approach with a serverless architecture within Supabase Edge. It's efficient, scalable, and sure to impress our users. However, it is known that "[almost no one gets JWT tokens right on their first try](https://kenkantzer.com/learnings-from-5-years-of-tech-startup-code-audits/)." So, let's buckle up for some exciting challenges ahead.

We must select a Context Management Tool for React on the front end. We have two contenders: Recoil (the new kid on the block) and Redux (the seasoned veteran). It's a tough choice, but we're confident we'll make the right call.
