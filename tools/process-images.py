import os

# this file generates <figure>, <figcaption> and <Image> (for lazy loading) tags.

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

    # replace ![alt text](file.ext) with
    # <figure><img alt="alt text" src="file.ext"><figcaption>alt text</figcaption></figure>

    current_file_has_ideal_image = False
    for md_file in all_md_files:
        if md_file.endswith("Hey.md"):
            continue
        with open(md_file, "r") as f:
            lines = f.readlines()
        with open(md_file, "w") as f:
            current_file_has_ideal_image = False
            for line in lines:
                if (
                    line.startswith("![")
                    and "]" in line
                    and "(" in line
                    and line.endswith(")\n")
                ):
                    alt_text = line.split("![")[1].split("]")[0]
                    filename = line.split("(")[1].split(")")[0]
                    if not current_file_has_ideal_image:
                        line = "\nimport Image from '@theme/IdealImage';\n"
                        current_file_has_ideal_image = True
                    else:
                        line = "\n"
                    if (
                        alt_text.endswith(".png")
                        or alt_text.endswith(".jpg")
                        or alt_text.endswith(".jpeg")
                        or alt_text.endswith(".gif")
                        or alt_text.endswith(".svg")
                        or alt_text.startswith("ALT:")
                    ):
                        filepath = os.path.join(os.path.dirname(md_file), filename)
                        alt_text = (
                            alt_text.replace("ALT:", "")
                            .replace('alt:"', "")
                            .replace('"', "`")
                            .replace("'", "`")
                            .strip()
                        )
                        line += f"""
<figure>

<Image img={{require('{filepath}')}} alt=\"{alt_text}\" />

</figure>
"""
                    else:
                        line += f"""
<figure>

<Image img={{require('{filename}')}} alt=\"{alt_text}\" />

<figcaption>{alt_text}</figcaption>
</figure>
"""
                    COUNTER += 1
                f.write(line)

    print("Replaced " + str(COUNTER) + " alt texts.")
