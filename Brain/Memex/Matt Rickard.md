---
lang: 'en'
slug: '/F637CF'
aliases: ['matt-rickard']
---

- [[Programmable Web]]
- [[Screenshot as an API]]
- [[Personal Training Corpus]]
- [What Comes After Git](https://matt-rickard.com/what-comes-after-git/)

## Articles

### [Moat By Induction](https://matt-rickard.ghost.io/moat-by-induction/)

Moat by induction can manifest in many ways. Take network effects:

- Is your product valuable to a single user (`n=1` is the base case).
- With `n=k` users, how much more value does a customer get with `n=k+1` users?

Sometimes it's about solving zero to one and then one to *n.*

### [GitHub's Missing Package Manager](https://matt-rickard.com/githubs-missing-package-manager/)

- Squatters sit on a popular name
- (Malicious) Code does not match what's on GitHub
- The package is maintained by someone else, not the author of the code
- GitHub is updated, but the author hasn't published the release to a package manager.

### [Social Coding](https://matt-rickard.ghost.io/social-coding/)

- Do the social features matter?
- The social graph
- The feed
- Stars (likes)
- [GitHub star growth is primarily linear](https://matt-rickard.com/linear-github-star-growth), even for the fastest-growing repositories. So virality happens, but always off-platform (a viral blog post, etc
- GitHub is removing the trending tab at the end of this month due to low usage
- Anecdotally, developers choose libraries in part based on social proof from other developers
- Chat, a key component of social, is important for open-source projects. Most of the activity happens off GitHub (in Slack or Discord
- GitHub profiles are sometimes used for recruiting and resumes. However, professional networks are rarely reflected on the GitHub follower model compared to LinkedIn (or Twitter
- [[Software as a Service]] businesses with network effects are rare, but when they work, they grow huge (e.g., Figma, Slack)

### [eBPF File Watching](https://matt-rickard.ghost.io/ebpf-file-watching/?ref=Matt+Rickard-newsletter)

- Periodically polling for changes is potentially slow and intensive.
- `inotify` (kernel subsystem that monitors changes to the filesystem)
  - recursive directory watches (X)
  - Fixed-sized buffer. Can overflow.
  - No native debouncing support.
  - Race conditions.
  - API issues (no event information.)
- Having a more native File Watcher would be nice.

### [It's Just a Tarball](https://matt-rickard.ghost.io/its-just-a-tarball/)

- _Yet, container images are just tarballs_
- _Yet [[Git]]'s object model is pretty simple - content-addressed blobs (file-like), trees (folder-like), and commits that get stored in a `.git/objects` folder_
- _Some `[[git]]` commands are still just shell scripts under the hood_
- _Not to mention [plaintext protocols](https://matt-rickard.com/the-power-of-plaintext-protocols). HTTP, SMTP, FTP, and Redis Serialization Protocol (RESP) are a few examples_
- _Maybe one caveat is that nascent technology is often unnecessarily complex. Things are just getting pieced together - unoptimized workflows, artifacts leftover from failed experiments_
- Very inspiring read.

### [Hard to Compute, Simple to Verify](https://matt-rickard.ghost.io/hard-to-compute-simple-to-verify/)

- But relaxing the definition of "hard to compute, simple to verify" lets us make some interesting analogies across different emerging technologies.
- There's public-key cryptography, which relies on things hard to compute, easy to verify problems like factorization of large integers, or [elliptic curve cryptography](https://matt-rickard.com/elliptic-curve-cryptography)
- There are also [zero-knowledge proofs](https://matt-rickard.com/zero-knowledge-proofs), which let counterparties prove that they know ng without revealing the actual secret
- Before LLMs, generating the associated image took time if you were given a prompt. A talented artist could take a few hours (minutes, days, etc.) to create a polished piece. Once created, it would be easy to verify if it fits the criteria - is this an image of a horse wearing sunglasses?
- There are no problems that are easy to compute yet hard to verify. If such a problem existed, you could just re-run the computation again.

One such thing of **easy to compute yet hard to verify** can be tracking the time-based hash seed, but this is only true depending on the definition of **confirming**. If verifying means giving input and comparing the output, yes, then it is easy. It will be hard if verifying includes _finding_ the information **and** comparing the production. But then again, it also falls into another _hard-to-compute_ problem.
