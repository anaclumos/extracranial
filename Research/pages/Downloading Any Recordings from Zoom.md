---
slug: '/90675E'
---

[[2022-04-06]]

## Disclaimer

- Both the [[United States of America|United States]] and the Republic of [[대한민국|Korea]] allow limited usage of copyrighted material for **educational use**.

> Notwithstanding the provisions of sections 17 U.S.C. § 106 and 17 U.S.C. § 106A, the fair use of a copyrighted work, including such use by reproduction in copies or phonorecords or by any other means specified by that section, for purposes such as criticism, comment, news reporting, teaching (including multiple copies for classroom use), scholarship, or research, is not an infringement of copyright.

- For most countries, downloading recorded videos for educational purposes only, for such use where you might want to watch them under an unstable internet connection, would not entail legal troubles.
- However, you understand that you use this code block at your own risk and would not use it in such a way that will jeopardize academic integrity or infringe any intellectual rights.

## Usage

```js
// This code is under MIT License.

let video = document.querySelector('video').src
let download = document.createElement('a')
let button = document.createElement('button')
button.innerText = 'To Download Video: Right Click Here → Save Link As'
download.append(button)
download.href = video
download.setAttribute('download', video)

document.getElementsByClassName('transcript')[0].prepend(download)
```

- Access the Zoom video recording page.
- After the webpage completes loading—when you can both play the video and scroll through the chat list—open the [[Web Browser|browser]] console.
- Paste this code and close the console.
- There will be a random button on top of the chat list. Don't click it; right-click it and select **Save Link As**.
- Now the video will download.

## The backstory of reporting this to Zoom

In March of 2021, I have reported this to Zoom as I considered this a security matter. While anyone can technically record their screen to obtain a copy of the video, I thought the implications were different: when you can one-click to download the full video, and when it takes hours of effort to record the video and audio manually.

Furthermore, instructors can decide if they want to open up downloading the original copies. Therefore, this feature's whole purpose is to provide **inconvenience to deter users from downloading files**. In that sense, this code is a security bypass of that policy.

That's what I told Zoom HQ. They responded:

> Thank you for your report. We have reproduced the behavior you have reported. However, while this [[UIUX|UI]] does not expose the download URL for recordings which have opted to disable the download functionality, a user may still record the meeting locally using a screen-recording program. In addition, for the [[Web Browser|browser]] to be able to play the recording, it must be transmitted to the [[Web Browser|browser]] in some form, which an attacker may save during transmission, and so the prevention of this is non-trivial. We appreciate your suggestion and may look into making this change in the future, but at the moment, we consider this to be a [Defense-In-Depth](<https://en.wikipedia.org/wiki/Defense_in_depth_(computing)>) measure. With every fix, we must carefully weigh the usability tradeoffs of any additional security control. We are reasonably satisfied with our security at this time, and **we have chosen not to make any changes to our platform for the time being**. We will be closing this report, but we still want to thank you for all your effort in bringing this behavior to our attention. Thank you for thinking of Zoom security.

Well... It seems like they're not interested, and no patch will come soon. So, for the time being, use this code wisely, and abide by your laws!
