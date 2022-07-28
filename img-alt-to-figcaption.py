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

    print("Found " + str(len(all_md_files)) + " .md and .mdx files.")

    # replace ![alt text](file.ext) with
    # <figure><img alt="alt text" src="file.ext"><figcaption>alt text</figcaption></figure>

    for md_file in all_md_files:
        with open(md_file, 'r') as f:
            lines = f.readlines()
        with open(md_file, 'w') as f:
            for line in lines:
                if line.startswith("![") and "]" in line and "(" in line and line.endswith(")\n"):
                    alt_text = line.split("![")[1].split("]")[0]
                    filename = line.split("(")[1].split(")")[0]
                    if alt_text.endswith(".png") or alt_text.endswith(".jpg") or alt_text.endswith(".jpeg"):
                        continue
                    line = f'''
<figure>

{line}

<figcaption>{alt_text}</figcaption>
</figure>
'''
                    COUNTER += 1
                f.write(line)

    print("Replaced " + str(COUNTER) + " alt texts.")
