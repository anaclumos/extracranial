import datetime
import os

print("What is the title of the post, in slug format?")
title = input().lower().replace(" ", "-")

# create a folder in cwd/posts with the same name as the title
os.mkdir("./posts/" + title)

print("Do you have a preferred slug in Hex format?")
slug = input()

languages = ["en", "ko"]

# get today's date, in YYYY-MM-DD format
today = datetime.datetime.now().strftime("%Y-%m-%d")

frontmatter = f"""---
title: "{title}"
date: "{today}"
slug: '/{slug}'
---
"""

# make a file for each language in the post folder
for language in languages:
    with open("./posts/" + title + "/" + language + ".md", "w") as file:
        file.write(frontmatter)
        file.close()
