import os

target_directory = "./Brain"

all_md_files = []

backlink_map = {}  # filename -> {mentioned_file -> first_mentioned_sentence}
filename_uid_map = {}  # filename -> uid

file_count = 0
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

    print("Found " + str(len(all_md_files)) + " MD files.")

    for md_file in all_md_files:
        filename = md_file.split("/")[-1].replace(".md", "")
        uid = ""
        with open(md_file, 'r') as f:
            lines = f.readlines()
        for line in lines:
            if line.startswith("slug: "):
                uid = line.split("slug: ")[1].strip().replace(
                    "/", "").replace("'", "").replace('"', "")
                filename_uid_map[filename] = uid
            while "[[" in line and "]]" in line:
                file_count += 1
                mentioned_file = line.split("[[")[1].split("]]")[0]
                source = mentioned_file.split("|")[0]
                alias = mentioned_file.split("|")[-1]
                # replace source with **source**
                # and source|alias with **alias**
                first_mentioned_sentence = line.replace(
                    source, "**" + source + "**").replace(source + "|" + alias, "**" + alias + "**")
                # only leave 12 words before and after the first mention
                words_to_keep = 12
                before_original = first_mentioned_sentence.split(
                    "[[")[0]
                before = " ".join(before_original.split(" ")[
                    -words_to_keep:])
                if before_original != before:
                    before = "…" + before
                center = first_mentioned_sentence.split("[[")[1].split("]]")[0]
                after_original = first_mentioned_sentence.split("]]")[1]
                after = " ".join(after_original.split(" ")[:words_to_keep])
                if after_original != after:
                    after = after + "…"
                first_mentioned_sentence = before + \
                    "[[" + center + "]]" + after
                if source not in backlink_map:
                    backlink_map[source] = {}
                if source not in backlink_map[source]:
                    backlink_map[source][filename] = first_mentioned_sentence
                    mention_count += 1
                line = line.replace(
                    "[[" + mentioned_file + "]]", mentioned_file)

    import json
    with open("./src/components/BacklinkTable/backlinks.ts", "w") as f:
        f.write("export const backlinks = " + json.dumps(backlink_map,
                indent=4, ensure_ascii=False).encode('utf8').decode())

        print("Wrote " + str(file_count) + " files with " +
              str(mention_count) + " mentions to backlinks.ts.")
    with open("./src/components/BacklinkTable/filenames.ts", "w") as f:
        f.write("export const filenames = " + json.dumps(filename_uid_map,
                indent=4, ensure_ascii=False).encode('utf8').decode())
        print("Wrote " + str(len(filename_uid_map)) +
              " filenames to filenames.ts.")
