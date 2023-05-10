import os
import re
from CaseInsensitiveDict import CaseInsensitiveDict


target_directory = "./Research"

all_md_files = []

backlink_map = (
    CaseInsensitiveDict()
)  # filename -> {mentioned_file -> first_mentioned_sentence}
filename_uid_map = CaseInsensitiveDict()  # filename -> uid

mention_count = 0

if __name__ == "__main__":
    if not os.path.isdir(target_directory):
        print("Invalid target directory.")
        exit(1)
    for root, dirs, files in os.walk(target_directory):
        for file in files:
            if file.endswith(".md") or file.endswith(".mdx"):
                if "templates" in root.lower():
                    continue
                if "templates" in file.lower():
                    continue
                add = True
                for dir in dirs:
                    if "templates" in dir.lower():
                        add = False
                if not add:
                    continue
                all_md_files.append(os.path.join(root, file))
                all_md_files.append(os.path.join(root, file))

                filename = file.replace(".md", "").replace(".mdx", "")
                backlink_map[filename] = {}

    print("Found " + str(len(all_md_files)) + " MD files.")

    # 2022-10-25. Don't blame me. I know this is a complete mess.
    try:
        for md_file in all_md_files:
            filename = md_file.split("/")[-1].replace(".md", "")
            uid = ""
            with open(md_file, "r") as f:
                lines = f.readlines()
            for line in lines:
                if line.startswith("slug: "):
                    uid = (
                        line.split("slug: ")[1]
                        .strip()
                        .replace("/", "")
                        .replace("'", "")
                        .replace('"', "")
                    )
                    filename_uid_map[filename] = uid
                while "[[" in line and "]]" in line:
                    try:
                        # remove all markdown links, except wikilinks
                        line = re.sub(r"\[([^[]+?)\]\(.+?\)", r"\1", line)
                        line = line.replace("\n", "")
                        mentioned_file = line.split("[[")[1].split("]]")[0]
                        source = (
                            mentioned_file.split("|")[0]
                            if "|" in mentioned_file
                            else mentioned_file
                        )
                        alias = (
                            mentioned_file.split("|")[-1]
                            if mentioned_file.count("|") > 0
                            else ""
                        )
                        line = line.replace("*", "").replace("_", "")
                    except Exception as e:
                        print("Error processing " + md_file + " line " + line)
                        print(e)
                        exit(1)
                    # only leave 6 words before and after the first mention
                    words_to_keep = 6
                    before_original = line.split("[[" + mentioned_file + "]]")[0]
                    before = " ".join(before_original.split(" ")[-words_to_keep:])
                    if before_original != before:
                        before = "... " + before
                    center = mentioned_file
                    after_original = mentioned_file.join(
                        line.split("[[" + mentioned_file + "]]")[1:]
                    )
                    after = " ".join(after_original.split(" ")[:words_to_keep])
                    if after_original != after:
                        after = after + " ..."
                    first_mentioned_sentence = before + "[[" + center + "]]" + after
                    "[[" + center + "]]" + after
                    if source not in backlink_map:
                        backlink_map[source] = {}
                    if filename not in backlink_map[source]:
                        backlink_map[source][filename] = first_mentioned_sentence
                        mention_count += 1
                    line = line.replace("[[" + mentioned_file + "]]", mentioned_file)
    except Exception as e:
        print("Error processing " + md_file)
        print(e)
        exit(1)

    import json
    import unicodedata

    # unicodedata.normalize("NFC", json.dumps(backlink_map))

    # delete keys with empty values

    # normalize unicode in keys for backlink_map
    backlink_map = {
        unicodedata.normalize("NFC", key): value for key, value in backlink_map.items()
    }

    for key in list(backlink_map.keys()):
        if len(backlink_map[key]) == 0:
            del backlink_map[key]
        else:
            # normalize unicode in values
            for key2 in list(backlink_map[key].keys()):
                backlink_map[key][key2] = unicodedata.normalize(
                    "NFC", backlink_map[key][key2]
                )
                backlink_map = {
                    unicodedata.normalize("NFC", key): value
                    for key, value in backlink_map.items()
                }
    # normalize unicode in keys for filename_uid_map
    filename_uid_map = {
        unicodedata.normalize("NFC", key): value
        for key, value in filename_uid_map.items()
    }

    for key in backlink_map:
        backlink_map[key] = dict(
            sorted(backlink_map[key].items(), key=lambda item: item[0])
        )
    filename_uid_map = dict(sorted(filename_uid_map.items(), key=lambda item: item[0]))

    with open("./src/data/backlinks.ts", "w") as f:
        f.write(
            "export const backlinks = "
            + json.dumps(dict(backlink_map), indent=4, ensure_ascii=False)
            .encode("utf8")
            .decode()
        )
        print(
            "Wrote "
            + str(len(backlink_map))
            + " files with "
            + str(mention_count)
            + " mentions to backlinks.ts."
        )
    with open("./src/data/filenames.ts", "w") as f:
        f.write(
            "export const filenames = "
            + json.dumps(filename_uid_map, indent=4, ensure_ascii=False)
            .encode("utf8")
            .decode()
        )
        print("Wrote " + str(len(filename_uid_map)) + " filenames to filenames.ts.")
