---
lang: 'en'
slug: '/C388D9'
---

Cross-Site Request Forgery, commonly known as CSRF, is a web security vulnerability that can have serious consequences for both users and websites. To understand CSRF, we need to explore how websites handle user authentication and how attackers can exploit this process.

## How Web Authentication Usually Works

When you log into a website, like your bank's online portal, the site typically gives your browser a special token or ticket. This token is stored as a cookie in your browser. Every time you interact with the bank's website after logging in, your browser automatically sends this token along with your request. This process allows the website to recognize you as an authenticated user without asking you to log in for every action you take.

## The CSRF Vulnerability

The problem arises because many websites automatically trust any request that comes with a valid authentication token, without verifying if the user actually intended to make that request. This trust is what CSRF attacks exploit.

## How a CSRF Attack Works

1. **Setting the Stage**. Imagine you're logged into your bank's website in one browser tab.
2. **The Trap**. An attacker creates a malicious website or sends you an email with a hidden form or a disguised link.
3. **Springing the Trap**. When you visit the malicious site or click the link, it automatically sends a request to your bank's website.
4. **The Deception**. Your browser, still holding the authentication token from your legitimate login, automatically includes this token with the request.
5. **The Consequences**. The bank's website receives a seemingly legitimate request from an authenticated user (you) and processes it, potentially transferring money or changing your password.

## Example Scenario

Let's say your bank allows you to transfer money using a simple GET request like this:
`www.yourbank.com/transfer?to=account123&amount=1000`

A CSRF attack might look like this:

1. You log into your bank account and leave the tab open.
2. You receive an email about cute cat pictures and click a link.
3. The link actually contains an image tag like this:
   `<img src="www.yourbank.com/transfer?to=hacker&amount=1000" width="0" height="0">`
4. Your browser tries to load this "image," sending a request to your bank with your authentication token.
5. Your bank receives a legitimate-looking request to transfer $1000 to the hacker's account.

## Real-World Examples

1. In 2008, a CSRF vulnerability in YouTube allowed attackers to perform actions on a user's account, like adding videos to favorites or sending messages.
2. In 2018, a cryptocurrency exchange platform, Poloniex, had a CSRF vulnerability that could have allowed attackers to steal users' funds.

## Prevention Measures

1. **Anti-CSRF Tokens**. Websites can include a unique, unpredictable token with each form or request. The server verifies this token before processing the request.
2. **Same-Site Cookies**. Browsers can be instructed to only send cookies for requests originating from the same site.
3. **Checking Request Origins**. Websites can verify that requests are coming from their own pages and not external sites.
4. **Requiring Re-authentication**. For sensitive actions like changing passwords or transferring money, websites can require users to enter their password again.

## Conclusion

CSRF attacks are sneaky because they take advantage of the trust between a website and an authenticated user. They can be particularly dangerous because the victim might not even realize an attack has occurred. Understanding CSRF helps both users and developers create safer web experiences. Users should be cautious about clicking unknown links, especially when logged into sensitive accounts. Developers must implement robust security measures to protect their users from such attacks.
