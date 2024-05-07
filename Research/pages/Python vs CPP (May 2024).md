---
lang: 'en'
slug: '/F97506'
---

So this is my story with my last Master's class team project.

Our team project was to create a _Shazam for Videos._ You have a pile of videos, approximately 30 hours in length. Given a 30-second video clip (which may have different resolution/color space/sampling rate/extension, etc.), we must identify the video it is included in and find the timestamp where that clip starts.

I was pretty confident that Python would be very suitable for this task. Alas, there is a mantra in software engineering:

> Don't blame \[language\] for being slow. It's your code that's slow.

I can't exactly find out who first said this, but fair enough, I've seen so many cases. Even more, the nice Python syntaxes and wrapped APIs often give additional time to plug and play higher-order speed improvements, such as multiprocessing and producing faster code, given the same human hours. Writing multiprocessing in C++ is a hassle, whereas in Python, you can convert a single-processed program into a multi-processed one in less than 20 minutes.

In this case, Python will have `PIL` and `OpenCV`, which are already battle-tested, and throwing in some simple optimizations would be more than enough. I also thought that Python's syntax would've 10x our dev time, and thus, I am sure we will have to use Python in the end.

I've done some initial research and used perceptual hashing (v. `ahash`, `dhash`) to investigate audio matching, SIFT (scale-invariant feature transform), etc. A naive calculation took around 10 minutes to identify a video with decent accuracy, and I made some optimizations to skip frames (around 30 frames per time, using prime numbers). I also threw in multiprocessing, ending up with code with around 80% accuracy in around 40 seconds of runtime. If I reduce the skip-frames (used for optimizations), the accuracy climbed to 90%, but at double the runtime. It was a typical make-a-compromise situation, but I was proud and thought I could've called it a day.

Then there was Louis. Louis was the opposite type of developer than I was. Maybe I was the type of _startup engineer_ who values dev-hour efficiency more, whereas he was the type of _performance engineer_ who values CPU-cycle efficiency more. He was adamant that we had to move to C++ due to performance issues. To be fair, we did need a little better performance-accuracy. We needed near-100% in less than a minute, but I thought we would throw in more algorithms, such as audio profiling, to improve the accuracy while cutting some fat here and there (such as preprocessing) to make things faster.

However, Louis still insisted that we move to other languages, such as C++ or Rust. I think mentioning Rust (Pythonic syntax with very fast speed) was just a catalyst to bring the topic onto the table because none of us had prior experience, and we still needed to finish the project within a few days. It was pretty clear that he wanted to rewrite the code in C++, despite the already-implemented pretty-good Python version.

I must admit that I was slightly offended at first. He was condescending about other languages that _he didn't get_ why real engineers use anything other than C++. He was also slightly condescending on OS other than Windows because other OSs _cannot make code run fast_ because they don't have VS, and since he was into the VS ecosystem (which makes sense because that's the industry de facto for C++, and it's only on Windows).
![[804F38.png]]
But then, I admitted to "experimenting" with the idea—"we can spend the next day or two seeing if converting to C++ improves things." Maybe the reason why I was so embracing was because I was so confident inside that he wouldn't make it. I had already combined multiple features and thrown in multiprocessing that nearly-8x-ed the speed. Coding signal processing in C++ will be a pain on the one hand, and implementing multiprocessing to improve the speed will be another pain on the other hand.

Perhaps that was why I agreed so nonchalantly to his suggestion.

Then, a day passed, and he not only finished the implementation but also made the speed 20x faster than the Python version. I was mindblown because, as mentioned above, "Python is fast enough" is true for most cases I've seen. In most cases, the bottleneck was networking, I/O, or something else. In this case, I thought the main bottleneck was the hardware I/O, which we needed to probe and read in video frames of 30 hours.

Louis proved me wrong.

If you're asking, yes, debugging was painful, but we had Sammie and Ishu doing a brilliant job at catching bugs. At one point, we were using the perceptual hashing completely wrong, but nonetheless, the code was indexing source videos, extracting features, and comparing them to the clip videos in a few seconds. It was so fast that we could've easily punched up the skip frames, from indexing 1 in 30 frames in Python to 1 in 3 in C++, and still could've finished the operation in 4 seconds.

Based on the graders' responses during the final demo, it was clear no one came close to our runtime. We were probably the most accurate (I bet everyone else's accuracy was near-correct) but at least ten times faster than other teams.

Frankly, this is completely against my understanding of technology: "Modern-day processors are fast enough, and tools/languages don't matter; it's the algorithm and programmer's code that makes things slow," so I'm unsure how to extrapolate this. Maybe it's just Louis is an exceptional programmer who codes C++ at the same speed as others write Python. Maybe the realm of signal processing makes C++ and its SIMD processing extremely efficient. Maybe it's our trust and teamwork that I did a proof-of-concept and got the knack of strategies, Louis led the C++ development, and Sammie and Ishu were able to failproof the C++ code. Maybe the stars aligned just the right amount.

I still think if any of these factors were ever so slightly off, the outcome would be a major failure, just as many team projects. People get into arguments, don't trust each other, and have debacles. But even then, somehow with some luck, we got a perfect implementation in the fastest form possible.

It was such an eerie experience that I was proved wrong, but yet I felt so happy.
