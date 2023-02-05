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

    for md_file in all_md_files:
        if md_file.endswith("Hey.md"):
            continue
        with open(md_file, "r") as f:
            lines = f.readlines()
        with open(md_file, "w") as f:
            line_seen = False
            has_import_header = False
            for line in lines:
                if line.startswith("---") and line_seen and not has_import_header:
                    line += (
                        "\nimport Image from '@docusaurus/plugin-ideal-image/src';\n"
                    )
                    has_import_header = True
                elif line.startswith("---"):
                    line_seen = True
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
                        filepath = os.path.join(
                            os.path.dirname(os.path.realpath(__file__)),
                            "..",
                            os.path.dirname(md_file),
                            filename,
                        )
                        filepath = filepath.replace("\\", "/")
                        filepath = filepath.replace("//", "/")
                        alt_text = (
                            alt_text.replace("ALT:", "")
                            .replace('alt:"', "")
                            .replace('"', "`")
                            .replace("'", "`")
                            .strip()
                        )
                        if (
                            alt_text.lower().endswith(".jpg")
                            or alt_text.lower().endswith(".jpeg")
                            or alt_text.lower().endswith(".png")
                            or filename.lower().endswith(".jpg")
                            or filename.lower().endswith(".jpeg")
                            or filename.lower().endswith(".png")
                        ):
                            line = f"<Image img={{require('{filepath}').default}} alt=\"{alt_text}\" />"
                        else:
                            line = line.replace("ALT: ", "").replace("ALT:", "")
                    else:
                        alt_text = (
                            alt_text.replace("ALT:", "")
                            .replace('alt:"', "")
                            .replace('"', "`")
                            .replace("'", "`")
                            .strip()
                        )
                        if (
                            alt_text.lower().endswith(".jpg")
                            or alt_text.lower().endswith(".jpeg")
                            or alt_text.lower().endswith(".png")
                            or filename.lower().endswith(".jpg")
                            or filename.lower().endswith(".jpeg")
                            or filename.lower().endswith(".png")
                        ):
                            line = f"<figure><Image img={{require('{filepath}').default}} alt=\"{alt_text}\" /><figcaption>{alt_text}</figcaption></figure>"
                        else:
                            line = line.replace("ALT: ", "").replace("ALT:", "")
                    COUNTER += 1
                f.write(line)

    print("Processed " + str(COUNTER) + " markdown images.")
