---
date: 2018-10-28
slug: '/C855D4'
---

:::danger
This post was written when I had little experience with Node.js. This is not an advisable way. This post simply serves as a departure post for my journey.
:::

- [[Node.js 앱을 AWS EB에서 Heroku로 옮기기]]

I have used [[AWS]] Elastic Beanstalk for a while and figured Heroku has several advantages over [[AWS]]. So I have migrated my [[AWS]] EB app called **[[민사고|KMLA]] Forms** to Heroku. For your information, [[민사고|KMLA]] Forms is a web app that simplifies writing necessary official documents in my school, [[민사고|KMLA]].

Few advantages I found:

1. Money. [[AWS]] costs money after its free tier limit. Since some of the students in my school used my web app, I have got some traffic, and [[AWS]] started to ask me about ~$10/month. As far as I know, there is no free tier traffic limit on Heroku.
2. Native HTTPS support. Heroku natively supports HTTPS since every dyno app can use Heroku's domain. [[AWS]] EB, on the other hand, does not provide this. You need to configure your web domain and HTTPS Certificate for each web domain. Not valid for casual developers.

I had to make only minimal changes to app.js and package.[[json]].

### [[AWS]] Version

```js
// ...

http.createServer(app).listen(8081, '0.0.0.0')

console.log('Server up and running at http://0.0.0.0:8081')
```

### Heroku Version

```js
// ...

const port = process.env.PORT || 8000

// ...

app.listen(port, () => {
  console.log('App is running on port ' + port)
})
```

Also, I have added `"start": "node app.js"` in `package.json`. Codes are on [GitHub](https://github.com/anaclumos/KMLA.Forms/), and the web is launched [here](http://bit.ly/kmlaforms2).
