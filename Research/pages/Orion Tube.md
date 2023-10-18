---
lang: 'en'
slug: '/47DDDE'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId='lang' queryString>
<TabItem value='en' label='English 🇺🇸' lang='en-US' default>
<div lang='en-US'>

The Orion app was developed in 45 days to turn an iPad into an HDMI monitor, inspired by the announcement of iPadOS 17 supporting USB Video Class devices. The app has a retro and fun aesthetic, utilizing 80s aesthetics, physical unboxing experience, and old CRT television emulation. The team faced challenges but came up with creative solutions, adding demo mode and designing an attractive upgrade screen. The app received a positive reception and messages of appreciation from users.

</div>
</TabItem>
<TabItem value='ko' label='한국어 🇰🇷' lang='ko-KR'>
<div lang='ko-KR'>

Orion 앱은 USB 비디오 클래스 장치를 지원하는 iPadOS 17의 발표에 영감을 받아 45일 만에 개발되어 iPad를 HDMI 모니터로 전환할 수 있었다. 이 앱은 80년대 미학, 실제 언박싱 경험, 오래된 CRT 텔레비전 에뮬레이션을 활용하여 복고풍의 재미있는 미학을 구현했다. 팀은 어려움에 직면했지만 데모 모드를 추가하고 매력적인 업그레이드 화면을 디자인하는 등 창의적인 해결책을 찾아냈다. 이 앱은 사용자들로부터 긍정적인 반응과 감사의 메시지를 받았다.

</div>
</TabItem>
</Tabs>

## [Orion – From idea to launch in 45 days](https://www.lux.camera/orion-from-idea-to-launch-in-45-days/)

- This summer, Apple announced iPadOS 17 would support UVC, or [USB Video Class](https://en.wikipedia.org/wiki/USB_video_device_class) devices (basically: "webcams
- However, our experiments uncovered that those inexpensive USB-C "capture cards" you find on Amazon work like webcams. With one of those, you could plug any HDMI device into your iPad, and its output would appear on your screen. It was a "Woah" moment
- So before jumping on a new project, it helps to be skeptical. We asked ourselves a few questions
- How many people want this? Our gut said, "A lot." We've lost count of the times we wished we had a portable monitor within reach, whether it's plugging it into our video and still cameras for better monitoring, connecting it to a Mac-Minis we have sitting in a closet, or just hooking up to a Nintendo Switch while traveling. At the same time, there's a huge barrier to asking someone to spend even $15 on a separate adapter in addition to the cost of our app
- What makes our version unique? We expected a glut of free "iPad monitor" apps in the App Store, like the [Flashlight App gold rush](https://www.wired.com/2010/06/inevitable-iphone-4-flashlight-apps-flicker-into-view/) of 2010. What could we bring to the table
- Design, in and of itself, is a feature. If this was going to be a possible use of the iPad, we might as well make it delightful
- Assuming there'd be a lot of free utilities to enable this, we felt it was ideal for this app to be 'freemium'. We'd make the core experience and, most important part — using your iPad as a monitor — free. Advanced features, like our 4K upscaling, could be a one-time purchase. A big plus here was that we saw it as a fun exercise to build something new and didn't have the pressure to turn it into a business
- It was August 4th, just around the corner from New iPhone Season. This is our busiest time of year. That makes it sound casual, but we are talking nights and weekends crazy busy busy — when new iPhones come out, we don't get advanced hardware or a heads-up on what's coming. We have to run to the store, buy the phones, fix what is broken first, and then work long nights to support what's new.
- We had to get Orion out before then. If we didn't ship Orion in time, we had no choice but to shift focus to Halide and Spectre updates and abandon it. So we set the new iPhone launch as our deadline— either ship this app in 45 days or abandon it and move on
- I got a lot of inspiration from the 80s, which had a futuristic yet tacky look.
- Orion was the kind of project that is pure fun to me, and it gave me an excuse to reach out to people whose work I loved and admired. The first person I reached out to was a longtime friend and collaborator: [Jelmar Geertsma](http://typehigh.nl)
- For Orion, we wanted it to be far more rooted in the period's graphic style. That required experimenting with visual style, the Orion logo, and typography. Jelmar did an insane job and put together a massive variety of designs
- I debated changing these up depending on the device type. Still, we narrowed it down and started improving just one, in a more traditional manual aspect, which would greet the user after unboxing. I also added some paper texture and mild wear and tear
- We ended up crafting display curvature, slight chromatic aberration, interference noise, and a quasi-analog feel to the digital interface of Orion
- This effect would have been challenging to implement in the past years. By limiting the app to iPadOS 17, we could take advantage of custom [shaders](https://en.wikipedia.org/wiki/Shader), those tiny programs that run on your GPU and are responsible for the most complex effects in video games. However, Ben was focused on the app as a whole, so it was risky sending him off on days-long explorations of cool but superfluous effects (or MMORPGs that run in the Dynamic Island). We needed help and enlisted [Anton Heestand](http://heestand.xyz)
- Luckily, Anton's shader effects didn't touch the rest of the app, and he was a delight to work with. The same went for his help on the initial unboxing experience (which we'll talk about later
- These shaders took about four days to build, which included some experiments with [scan lines](https://en.wikipedia.org/wiki/Scan_line). We even tried drawing the whole image in two alternating phases, like a real TV would. We ultimately stopped at phosphor emulation as we found it hit a sweet spot in recapturing the feel of pixel art as initially shown. Virtual phosphors act as low-pass filters, whereas scan lines hide pixels
- In the type department, Orion would meet the bar set by our previous apps. The manual uses a unique cut of a Dutch sans-serif by Jelmar called Azimut, and in the menus, you can spot Orion's custom pixel font, Radiant
- It was easy to envision a wood-paneled remote with funny plastic buttons. The plastic could be textured like it typically was back in the day—gritty and dark grey. I caught myself early because a critical part of building a fun app is finding fun that doesn't harm usability.
- I remember the fantastic animation in iOS 6 that shredded a pass in the Passbook (now Wallet) app with long, great animation. It was super whimsical, fun, and gorgeous - but deleting more than one pass was a slow slog
- The happy medium is a set of controls that feels and looks very tactile yet not entirely out of place on a modern iPad interface
- While investigating typical typefaces, I discovered Apple's San Francisco Compressed typeface style matched great
- If you look closely, you might also spot a few fun easter eggs. Let's say it's all in the Halide cinematic universe - and we're very grateful that our friends at Panic and Campo Santo let us use imagery here from some of our favorite games in action: Untitled Goose Game and Firewatch
- With our deadline fast approaching, it was time to cut stuff. While adding features up until the last minute is tempting, at a certain point, you need the discipline to say "pencils down." The final stretch of any release should be about pixel-peeping and bug-hunting
- One feature that hit the cutting room floor was alternate icons — imagine an NES icon, an Xbox icon, a beige Macintosh screen, and more. I'd love suggestions if you have any because we still want to get this into an update, and I genuinely love working on app icons
- On the marketing side, we didn't have time to shoot a launch video. I even visited a thrift store to buy '80s clothes and enlisted some friends — one of whom was committed to cutting their hair to leave only a mullet. Next time, perhaps
- That was, fortunately, easy even for this admitted web-challenged designer. I created a pretty decent page in [Framer](http://framer.com) in just one very long night in a very uncomfortable wooden chair in a farmhouse. And with that, we were all set for a launch

## Images

![[A8D4CB.jpg]]
![[D78764.jpg]]
![[30E5FA.jpg]]
![[4D8925.jpg]]
![[B99013.jpg]]
![[20E8C0.jpg]]
![[2A6CF4.jpg]]
![[9D7DCC.jpg]]
![[BE40BD.jpg]]
![[8671E0.jpg]]
![[D5E876.jpg]]
![[CCF3D9.jpg]]
![[8E5721.jpg]]
![[84B9FE.jpg]]
![[9373A2.jpg]]
![[95DB2C.jpg]]
![[E49FD7.jpg]]
![[8CC453.jpg]]
![[70B702.jpg]]
![[3BCEB5.jpg]]
![[30A45C.jpg]]
![[889B68.jpg]]
![[5B8DF9.jpg]]
![[21F1B9.jpg]]
![[9D5919.jpg]]
![[26B513.jpg]]
![[785B43.jpg]]
![[A03878.jpg]]
![[76C2EB.jpg]]
![[ACBF2C.jpg]]
![[6A3812.jpg]]
![[97B033.jpg]]
![[6E3E1F.jpg]]
![[C37458.jpg]]
![[717BB0.jpg]]
![[2E161D.jpg]]
![[B8EED2.jpg]]
![[EB29DB.jpg]]
![[AD9E25.jpg]]
![[58854D.jpg]]
![[55E4D6.jpg]]
![[DFC4B6.jpg]]
![[C5FC95.jpg]]
![[2EEEF6.jpg]]
![[399C15.jpg]]
![[D5FF11.jpg]]
![[FB2970.jpg]]
![[4B231A.jpg]]
![[DA6622.jpg]]
![[93392E.jpg]]
![[9B1D5F.jpg]]
![[C9C1EA.jpg]]
