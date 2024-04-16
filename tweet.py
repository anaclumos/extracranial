import re
import requests
from io import BytesIO
from PIL import Image
from pyperclip import copy
from rich.text import Text
from rich.console import Console

def process_tweet(tweet_text):
    # Link @mentions to their Twitter profiles
    tweet_text = re.sub(r'@(\w+)', r'[@\1](https://twitter.com/\1)', tweet_text)

    # Download and embed images
    image_urls = re.findall(r'\[!\[Image\]\((.*?)\)\]', tweet_text)
    for url in image_urls:
        response = requests.get(url)
        img = Image.open(BytesIO(response.content))
        img.save(f'image_{image_urls.index(url)}.png')
        tweet_text = tweet_text.replace(f'[![Image]({url})]', f'[Image](image_{image_urls.index(url)}.png)')

    return tweet_text

# Your tweet text
tweet_text = """
@limitlessai day one review
  
Today I spoke 2 hours with @jameszhou02, a really good enginifounder.  
  
Natrually I had to give @limitlessai a spin, as an avid @RewindAI user and @dsiroker fanboy.[![Image](https://pbs.twimg.com/media/GLPkPqqbYAAsbEa.jpg)](https://pbs.twimg.com/media/GLPkPqqbYAAsbEa.jpg)

Some bugs first: 

The summary was surprisingly really good, but missed some key points.  
  
For example, we discussed if big techs exp. will help founding a startup.  
  
James and I had slightly different perspectives (which we both respect) but our 20m discussion was simplified into this one block.[![Image](https://pbs.twimg.com/media/GLPn6p7acAAh5cf.jpg)](https://pbs.twimg.com/media/GLPn6p7acAAh5cf.jpg)

It misunderstood some jargons, even not understanding popular jargons like ChatGPT.  
  
It'd be great if I could add personal Jargons in a user-friendly way.  
  
p.s. the companies transcribed wrong here are "Moloco" and "Grammarly"  
[![Image](https://pbs.twimg.com/media/GLPlWcQbcAA6GLm.jpg)](https://pbs.twimg.com/media/GLPlWcQbcAA6GLm.jpg)  
[![Image](https://pbs.twimg.com/media/GLPmGvKa8AEEy-c.jpg)](https://pbs.twimg.com/media/GLPmGvKa8AEEy-c.jpg)

Also a bug in running RAG on the same recording clip over and over.  
  
We only talked Grammarly's team selection for couple minutes, but at least 30+ sections are on Grammarly and Personal Agency.  
  
We also did not talk about game-related projects.  
  
TIL there's a city named Brammerton[![Image](https://pbs.twimg.com/media/GLPmYbWaAAACXqG.jpg)](https://pbs.twimg.com/media/GLPmYbWaAAACXqG.jpg)

The transcript tab is also not only non-chronological, but also mixed up. It starts with a sentence at 101m and then jumps to a sentence at 34m.  
[![Image](https://pbs.twimg.com/media/GLPnLhZa4AABPWA.jpg)](https://pbs.twimg.com/media/GLPnLhZa4AABPWA.jpg)  
[![Image](https://pbs.twimg.com/media/GLPnWQEaAAA7ENR.jpg)](https://pbs.twimg.com/media/GLPnWQEaAAA7ENR.jpg)

I must acknowledge the app is surprisingly polished for a day one product, and I'll daily drive this.  
  
Ideally I hope Limitless and Rewind merge into 1 product, because now my data is split across tools.  
  
I even preordered the Pendant last year, guess I made a good bet![![Image](https://pbs.twimg.com/media/GLPpxfbaYAAwITe.jpg)](https://pbs.twimg.com/media/GLPpxfbaYAAwITe.jpg)

If that ever happens, it'll also be interesting to see how Limitless handles the data migration with Rewind.  
  
Not a lot of service update requires you to upload 100 gigs of videos.  
  
I still trust Limitless team that they'll make it as smooth as possible[![Image](https://pbs.twimg.com/media/GLPpWLdaIAEvWC5.jpg)](https://pbs.twimg.com/media/GLPpWLdaIAEvWC5.jpg)

I have a huge trust in Rewind because they didn't just jumped on a hype train.  
  
They actually thought of a good use case of AI:  
  
Eidetic Memory Devices.  
  
[cho.sh/r/ECF81E](https://cho.sh/r/ECF81E)

Humans don't need $700 pins to shoot lasers or replace your phone.  
  
We don't need pins to ask weathers or how tall the empire state building is.  
  
That was Humane's mistake. They didn't think what "additional value" they should/could bring.[![Image](https://pbs.twimg.com/media/GLPsFk_bAAAupKn.jpg)](https://pbs.twimg.com/media/GLPsFk_bAAAupKn.jpg)

We need pins to get eidetic memory. Nothing more.  
  
That's the additional value these new form factors should/could bring.  
  
And I think @dsiroker is one of the very few people who actually understands this. 

I also am really excited how Limitless will change Memexing or Digital-Gardening on the web.  
  
Notable tools in this space is @RoamResearch and @obsdmd.[![Image](https://pbs.twimg.com/media/GLPtuFsaIAEr8E0.png)](https://pbs.twimg.com/media/GLPtuFsaIAEr8E0.png)

I think Memexing is the most "practical" way to achieve eidetic memory, so far.  
  
I still don't fully see how AI will help Memexing; All implementation so far just made my memory worse  
  
It's cuz if you don't think in your own words, you typically forget things really quickly 

But one thing for sure is that...  
  
we will either  
  
① find a sweet spot in between "brain-busywork makes you remember" and "go full on brain-autopilot"  
  
② or come up with an ingenious UX to both let AI do the brain-busywork but also make us remember things better. 

And I'm betting on Limitless would do one of the two, or at least help us get there.  
  
They know the problem they should solve. 

I want to close my thread with a quote from Ted Chiang, which addresses the social connotations of remembering everything.  
  
[cho.sh/r/6C8C05#the-t…](https://cho.sh/r/6C8C05#the-truth-of-fact-the-truth-of-feeling)

"As someone whose identity was built on organic memory, I'm threatened by the prospect of removing subjectivity from our recall of events. I used to think it could be valuable for individuals to tell stories about themselves, valuable in a way that it couldn't be for cultures, but I'm a product of my time, and times change.  
  
We can't prevent the adoption of digital memory any more than oral cultures could stop the arrival of literacy, so the best I can do is look for something positive in it. And I think I've found the real benefit of digital memory. The point is not to prove you were right; the point is to admit you were wrong.  
  
Digital memory will not stop us from telling stories about ourselves. As I said earlier, we are made of stories, and nothing can change that.  
  
What digital memory will do is change those stories from fabulations that emphasize our best acts and elide our worst, into ones that—I hope—acknowledge our fallibility and make us less judgmental about the fallibility of others."  
  
—The Truth of Fact, the Truth of Feeling, Ted Chiang (2018)
"""


# Process the tweet text
processed_tweet = process_tweet(tweet_text)

# Create a Text object with the processed tweet
text = Text(processed_tweet)

# Convert the Text object to a string
tweet_string = str(text)

# Copy the tweet string to clipboard
copy(tweet_string)

# Print the rich text
console = Console()
console.print(text)
# Your tweet text
