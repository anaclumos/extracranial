import os

targets = ["./docs/", "./blog/", "./i18n/"]
COUNTER = 0

all_md_files = []

if __name__ == "__main__":
    for target in targets:
        if not os.path.isdir(target):
            continue
        for root, dirs, files in os.walk(target):
            for file in files:
                if file.endswith(".md") or file.endswith(".mdx"):
                    all_md_files.append(os.path.join(root, file))

    print("Found " + str(len(all_md_files)) + " MD and MDX files.")

    for md_file in all_md_files:
        if md_file.endswith("Hey.md"):
            continue
        with open(md_file, "r") as f:
            lines = f.readlines()
        with open(md_file, "w") as f:
            for line in lines:
                if (
                    line.startswith("![")
                    and "]" in line
                    and "(" in line
                    and line.endswith(")\n")
                ):
                    alt_text = line.split("![")[1].split("]")[0]
                    filename = line.split("(")[1].split(")")[0]
                    if (
                        alt_text.endswith(".png")
                        or alt_text.endswith(".jpg")
                        or alt_text.endswith(".jpeg")
                        or alt_text.endswith(".gif")
                        or alt_text.endswith(".svg")
                        or alt_text.startswith("ALT:")
                    ):
                        line = f"""
<figure>

{line.replace("ALT: ", "").replace("ALT:", "")}

</figure>
"""
                    else:
                        line = f"""
<figure>

{line}

<figcaption>{alt_text}</figcaption>
</figure>
"""
                    COUNTER += 1
                    # replace mp4, webm with video tag
                    if filename.endswith(".mp4") or filename.endswith(".webm"):
                        hex = filename.split("/")[-1].split(".")[0]
                        line = f"""\n\nimport Video{hex} from "{filename}";\n<figure><video controls muted autoplay playsinline><source src={{Video{hex}}} type="video/{filename.split('.')[-1]}"/></video>{f'<figcaption>{alt_text}</figcaption>' if not filename.lower().endswith(alt_text.lower()) else ''}</figure>\n\n"""

                f.write(line)

    print("Replaced " + str(COUNTER) + " alt texts.")
