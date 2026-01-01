---
slug: '/C855D4'
---

[2018-10-28](./../.././docs/journals/2018-10-28.md)

:::danger
This post was written when I had little experience with [Node.js](./../.././docs/pages/Node.js.md). This is not an advisable way. This post simply serves as a departure post for my journey.

:::

- [Node.js 앱을 AWS EB에서 Heroku로 옮기기](./../.././docs/pages/Node.js%20%EC%95%B1%EC%9D%84%20AWS%20EB%EC%97%90%EC%84%9C%20Heroku%EB%A1%9C%20%EC%98%AE%EA%B8%B0%EA%B8%B0.md)

I have used [AWS](./../.././docs/pages/AWS.md) Elastic Beanstalk for a while and figured Heroku has several advantages over [AWS](./../.././docs/pages/AWS.md). So I have migrated my [AWS](./../.././docs/pages/AWS.md) EB app called **[KMLA](./../.././docs/pages/%EB%AF%BC%EC%82%AC%EA%B3%A0.md) Forms** to Heroku. For your information, [KMLA](./../.././docs/pages/%EB%AF%BC%EC%82%AC%EA%B3%A0.md) Forms is a web app that simplifies writing necessary official documents in my school, [KMLA](./../.././docs/pages/%EB%AF%BC%EC%82%AC%EA%B3%A0.md).

Few advantages I found:

1. Money. [AWS](./../.././docs/pages/AWS.md) costs money after its free tier limit. Since some of the students in my school used my web app, I have got some traffic, and [AWS](./../.././docs/pages/AWS.md) started to ask me about ~$10/month. As far as I know, there is no free tier traffic limit on Heroku.
2. Native HTTPS support. Heroku natively supports HTTPS since every dyno app can use Heroku's domain. [AWS](./../.././docs/pages/AWS.md) EB, on the other hand, does not provide this. You need to configure your web domain and HTTPS Certificate for each web domain. Not valid for casual developers.

I had to make only minimal changes to app.js and package.[json](./../.././docs/pages/JSON.md).

### [AWS](./../.././docs/pages/AWS.md) Version

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
