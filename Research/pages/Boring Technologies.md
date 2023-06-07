---
lang: 'en'
slug: '/B8D890'
aliases: ['overengineer', 'over-engineer', 'Boring']
---

### [Programming is a Pop Culture – Baldur Bjarnason](https://www.baldurbjarnason.com/2022/programming-is-a-pop-culture/)

- The programming pop culture favors specific code aesthetics based on the trends of the day
- The issue is that the programming pop culture demands that code exhibit the latest popular aesthetics of rigor, formality, and cleverness
- It didn't matter if you were writing in Ruby, [[JavaScript]], or Objective-C. Your code had to have a level of **magic** to it. Metaprogramming, syntax-hacking languages to create ad hoc Domain-Specific Languages, tricks with extreme late binding, and more were frequent topics on developer weblogs and forums
- A part of this trend is the unpopularity of the approaches and languages seen as less rigorous. [[CSS]] is dropped in favor of statically typed [[CSS]]-in-[[JavaScript|JS]] methods. HTML is dropped in favor of a strict inline XML-like markup format called [[JSX]]

### [Your tech stack is not the product](https://hoho.com/posts/your-stack-is-not-the-product/)

- At most software startups, customers typically don't care if your product runs on Heroku, [[Kubernetes]], or a brittle singly-homed machine in Joe's closet
- No purchasing decisions hinge on your commitment to write servers in [[Rust]] or use Nix for hermetic everything
- Customers want software that delivers problem-solving impact
- But there are many instances where an innocent, ill-considered early decision turned out much worse over the longer term. It becomes a time-sucking, success-hindering mess requiring costly correction later
- Ship the product. Frequently and reliably.
- support growth. Be able to bring in more people gradually that can do
- No sacred bits: Launch, learn, iterate
- Today's bets over tomorrow's theoretical
- Favor **boring technology** and in-house expertise
- Buy non-core competencies whenever prudent

### [Use a monorepo](https://buttondown.email/blog/just-use-a-monorepo)

- I wrote [last month](https://buttondown.email/blog/on-monorepos) about migrating [[Buttondown]] from several separate micro repositories to a single monorepo. I've since completed the migration, and the slight irritation I felt from having to unwind many technical choices with deployment + continuous integration has faded.
- I am here to tell you: if you are running a software business and you aren't at, like, [[Google]]-tier scale, throw it all in a mono repo
