import shutil
import os

EN_DIR = "./blog"
KO_DIR = "./i18n/ko/docusaurus-plugin-content-blog"
NEW_SOURCE_DIR = "./posts"

# first, remove all files in the target directory

DEBUG = False


def remove_dir(dir):
    if not os.path.isdir(dir):
        return
    # delete all files in the directory
    for file in os.listdir(dir):
        file_path = os.path.join(dir, file)
        if os.path.isdir(file_path):
            shutil.rmtree(file_path)


remove_dir(KO_DIR)
remove_dir(EN_DIR)

for file in os.listdir(NEW_SOURCE_DIR):
    file_path = os.path.join(NEW_SOURCE_DIR, file)
    if os.path.isfile(file_path):
        shutil.copy(file_path, KO_DIR)
        shutil.copy(file_path, EN_DIR)
    elif os.path.isdir(file_path):
        shutil.copytree(file_path, os.path.join(KO_DIR, file))
        shutil.copytree(file_path, os.path.join(EN_DIR, file))
    else:
        print("Unknown file type: " + file_path)

shutil.copy("./config/english.yml", EN_DIR + "/authors.yml")
shutil.copy("./config/korean.yml", KO_DIR + "/authors.yml")


def process_language(dir, to_index, to_delete):
    for file in os.listdir(dir):
        file_path = os.path.join(dir, file)
        if os.path.isfile(file_path):
            file_location = os.path.join(dir, file)
            file_location_last_two = "/".join(file_location.split("/")[-2:])
            if file.startswith(to_index) and (
                file.endswith(".md") or file.endswith(".mdx")
            ):
                os.rename(
                    file_location,
                    file_location.replace(to_index + ".md", "index.md").replace(
                        to_index + ".mdx", "index.mdx"
                    ),
                )
                print(
                    "Renamed "
                    + file_location_last_two
                    + " to "
                    + file_location_last_two.replace(
                        to_index + ".md", "index.md"
                    ).replace(to_index + ".mdx", "index.mdx")
                ) if DEBUG else None
            elif file.startswith(to_delete) and (
                file.endswith(".md") or file.endswith(".mdx")
            ):
                os.remove(file_location)
                print("Deleted " + file_location_last_two) if DEBUG else None
        elif os.path.isdir(file_path):
            process_language(file_path, to_index, to_delete)


process_language(EN_DIR, "en", "ko")
process_language(KO_DIR, "ko", "en")
