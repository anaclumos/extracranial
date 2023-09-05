import shutil
import os
import unicodedata

SOURCE_DIR = "./Research"
DESTINATION_DIR = "./docs"
DEBUG = False

# What this file does:

# Wikilinks to MD links
# [[file]] -> [file](file.md)
# [[file|display text]] -> [display text](file.md)



# first, remove all files in the target directory
if os.path.isdir(DESTINATION_DIR):
    shutil.rmtree(DESTINATION_DIR)

if not os.path.isdir(DESTINATION_DIR):
    os.mkdir(DESTINATION_DIR)

# copy all files from the source directory to the target directory
for file in os.listdir(SOURCE_DIR):
    file_path = os.path.join(SOURCE_DIR, file)
    if os.path.isfile(file_path):
        shutil.copy(file_path, DESTINATION_DIR)
    elif os.path.isdir(file_path):
        shutil.copytree(file_path, os.path.join(DESTINATION_DIR, file))
    else:
        print("Unknown file type: " + file_path)

# inside the target directory, recursively add all files to all_files list
all_files = []
for root, dirs, files in os.walk(DESTINATION_DIR):
    for file in files:
        all_files.append(os.path.join(root, file))

ko_header = """
<head>
  <html lang="ko-KR"/>
</head>
"""

en_header = """
<head>
  <html lang="en-US"/>
</head>
"""


def process(file, all_files, counter):
    current_language = "en"
    if not file.endswith(".md"):
        return counter
    with open(file, "r") as f:
        lines = f.readlines()
    if "lang: 'ko'" in "".join(lines) or "lang: ko" in "".join(lines):
        current_language = "ko"
    else:
        current_language = "en"
    with open(file, "w") as f:
        for line in lines:
            line = line.replace("[[{{date:YYYY-MM-DD}}]]", "date:YYYY-MM-DD")

            while "[[" in line and "]]" in line:
                print() if DEBUG else None
                print(line.rstrip("\n")) if DEBUG else None
                # get the text between the [[ and ]]
                wikilink = line.split("[[")[1].split("]]")[0]
                # now, search for the wikilink in the all_files list
                print("Searching for: " + wikilink) if DEBUG else None
                found = False
                for searchfile in all_files:
                    if unicodedata.normalize(
                        "NFC", wikilink.split("|")[0].lower()
                    ) == unicodedata.normalize(
                        "NFC",
                        searchfile.split("/")[-1]
                        .replace(".md", "")
                        .replace(".mdx", "")
                        .lower(),
                    ):
                        # if found, replace the wikilink with the link
                        import urllib.parse

                        searchfile = urllib.parse.quote(searchfile)
                        # count the number of slashes in the file
                        num_slashes = file.count("/")
                        # add "../" for each slash
                        searchfile = "./" + "../" * (num_slashes - 1) + searchfile
                        display_text = (
                            wikilink.split("|")[1] if "|" in wikilink else wikilink
                        )
                        line = line.replace(
                            "[[" + wikilink + "]]",
                            "[" + display_text + "](" + searchfile + ")",
                        )
                        print(
                            "→ Replaced [["
                            + wikilink
                            + "]] with ["
                            + display_text
                            + "]("
                            + searchfile
                            + ")"
                        ) if DEBUG else None
                        counter += 1
                        found = True
                        break
                if not found:
                    print("→ Could not find: " + wikilink) if DEBUG else None
                    line = line.replace(f"[[{wikilink}]]", wikilink)
            f.write(line)
        # Temporarily disabling this
        # if current_language == "ko":
        #     f.write(ko_header)
        # else:
        #     f.write(en_header)
    return counter


if __name__ == "__main__":
    COUNTER = 0
    for file in all_files:
        COUNTER = process(file, all_files, COUNTER)
    print("Replaced " + str(COUNTER) + " wikilinks.")
