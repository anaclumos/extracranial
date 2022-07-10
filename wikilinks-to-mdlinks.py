import shutil
import os
SOURCE_DIR = './Brain'
DESTINATION_DIR = './docs'
DEBUG = True

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


def replace_wikilinks(file, all_files):
    if not file.endswith(".md"):
        return
    with open(file, 'r') as f:
        lines = f.readlines()
    with open(file, 'w') as f:
        for line in lines:
            while "[[" in line:
                # get the text between the [[ and ]]
                wikilink = line.split("[[")[1].split("]]")[0]
                # now, search for the wikilink in the all_files list
                for searchfile in all_files:
                    if wikilink.lower() in searchfile.lower():
                        # if found, replace the wikilink with the link
                        import urllib.parse
                        searchfile = urllib.parse.quote(searchfile)
                        # count the number of slashes in the file
                        num_slashes = file.count("/")
                        # add "../" for each slash
                        searchfile = "./" + "../" * \
                            (num_slashes - 1) + searchfile
                        line = line.replace(
                            "[[" + wikilink + "]]", "[" + wikilink + "](" + searchfile + ")")
                        print("Replaced [[" + wikilink + "]] with [" +
                              wikilink + "](" + searchfile + ")") if DEBUG else None
                        break
            f.write(line)


for file in all_files:
    replace_wikilinks(file, all_files)
