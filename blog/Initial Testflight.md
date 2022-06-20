Let $f\colon[a,b]\to\R$ be Riemann integrable. Let $F\colon[a,b]\to\R$ be
$F(x)=\int_{a}^{x} f(t)\,dt$. Then $F$ is continuous, and at all $x$ such that
$f$ is continuous at $x$, $F$ is differentiable at $x$ with $F'(x)=f(x)$.

```js
let video = document.querySelector('video').src
let download = document.createElement('a')
let button = document.createElement('button')
button.style.fontFamily = 'system-ui'
button.innerText = 'To Download Video: Right Click Here → Save Link As'
download.append(button)
download.href = video
download.setAttribute('download', video)

document.getElementsByClassName('transcript')[0].prepend(download)
```
