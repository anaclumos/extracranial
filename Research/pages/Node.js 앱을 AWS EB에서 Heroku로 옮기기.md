---
title: 'Node.js 앱을 AWS EB에서 Heroku로 옮기기'
date: 2018-10-28
authors: anaclumos
slug: '/F991A6'
---

:::danger
이 글은 Node.js에 대한 경험이 별로 없을 때 작성되었습니다. 이 글에서 다루는 방법은 유용한 정보를 담고 있지 않습니다. 이 글은 단지 제 블로그의 이정표로써 역할을 합니다.
:::

예전부터 AWS Elastic Beanstalk 앱을 사용해왔지만 최근 Heroku가 AWS에 비해 몇몇 장점이 있다는 것을 알게 되었다. 예전에 개발했던 민사고 공문서 모음집을 Heroku로 옮겼다.

1.  비용. AWS는 Free Tier가 지난 뒤부터 돈을 받는다. 내 웹사이트에도 약간의 트래픽이 발생했기 때문에 매달 약 $10 정도의 돈이 발생했다. Heroku는 트래픽에 의한 추가 비용은 발생하지 않는 것 같았다.
2.  `https` 기본 지원. Heroku는 기본적으로 `https` 인증을 지원한다. 모든 Dyno 앱은 개인 도메인이 없더라도 Heroku 자체의 도메인을 사용할 수 있다. AWS EB에서는 이를 지원하지 않으며 개별적으로 Certificate를 설정해주어야 했다. AWS에서도 어렵지 않게 인증서를 설치할 수 있으나 개인적으로 이 과정이 번거롭다는 생각이 들었다.

EB와 Heroku 모두 PaaS이기 때문에 `app.js` 와 `package.json` 을 살짝 고치는 것으로 충분하다.

### AWS 버전

```js
// app.js

// ...

http.createServer(app).listen(8081, '0.0.0.0')
console.log('App is running on http://0.0.0.0:8081')
```

### Heroku 버전

```js
// app.js

// ...

const port = process.env.PORT || 8000

// ...

app.listen(port, () => {
  console.log('App is running on port ' + port)
})
```

더불어 `package.json`에 `"start": "node app.js"`를 추가했다. 코드는 [GitHub](https://github.com/anaclumos/KMLA.Forms/)에 업로드되어 있으며 웹사이트는 [여기](https://bit.ly/kmlaforms2)에 설치되어 있다.
