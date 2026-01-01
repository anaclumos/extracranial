---
lang: 'en'
slug: '/26D2AB'
---

In computer programming, **[shimming](./../.././docs/pages/Shim.md)** is a method of transparently intercepting, modifying, and redirecting the [API](./../.././docs/pages/API.md) calls. A smooth [shim](./../.././docs/pages/Shim.md) is hardly noticeable; imagine Mission Impossible, where you ordered food at a restaurant, but actually, Ethan Hunt intercepted your call, cooked, and delivered your food.

People **really** don't care about how developers implement services. If you withdraw some money from an ATM, you don't care if it's an actual ATM, a secret terminator trying to assassinate you, or actually, there's a person inside a machine [counting](./../.././docs/pages/Counting.md) the money for you. The important thing is giving the **illusion** that everything is working. If this is true, engineering might not be as crucial as we developers think. Maybe [Time to Market](./../.././docs/pages/Time%20to%20Market.md) is more critical. Here are a few examples:

- Edison faked his invention of the light bulb for more than 4 years.
- The first iPhone failed to integrate individual apps, so Jobs had to prepare separate iPhones for calls, music, [maps](./../.././docs/pages/Cartography.md), etc. He had to switch between each iPhone, pretending it was the same device.
- Tesla is also a similar example; Elon always makes bold claims but never delivers something on that date. Where is our Cybertruck?
- [Naver](./../.././docs/pages/Naver.md) (≈ [Korean](./../.././docs/pages/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD.md) Google), for a while, failed to make a News [automation](./../.././docs/pages/Automation.md) service, making the CEO visit Press organizations every morning to ask permission to distribute the articles.
- [Woowa Bros](./../.././docs/pages/%EB%B0%B0%EB%8B%AC%EC%9D%98%EB%AF%BC%EC%A1%B1.md) (≈ [Korean](./../.././docs/pages/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD.md) Doordash) failed to make an order relay system, so they had to call the restaurant one by one whenever they got an order request.
- [Toss](./../.././docs/pages/Toss.md) (≈ [Korean](./../.././docs/pages/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD.md) Paypal) failed to make the transaction system, so the CEO visited the bank three times a day to bulk-process pending Venmo requests.

One interesting observation is that Theranos, known for the "Bad blood" incident, had the same flow. They claimed to diagnose $N$ amount of tests with a drop of blood, but the device never worked, and they operated a full-scale diagnosis lab to fake as if the results were coming from their flagship machine. Soon they were exposed and ended in a fiasco; how would history change if they had succeeded in the end? Another observation: 4 years in the 20th century and 21st century is extremely different in velocity.

> How far can we accept _fake it until you make it_?
