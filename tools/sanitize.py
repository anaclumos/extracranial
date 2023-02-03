import os


def getHex():
    # Returns a 6-digit hexadecimal number
    return hex(int(os.urandom(4).hex(), 16))[2:8].upper()


targets = ["./Research"]
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
        # ignore files with Template in the name
        if "template" in md_file.lower():
            continue
        # Replace all {{hex}} with a random hex number
        with open(md_file, "r") as f:
            lines = f.readlines()
        with open(md_file, "w") as f:
            for line in lines:
                if "{{hex}}" in line:
                    line = line.replace("{{hex}}", "/" + getHex())
                    COUNTER += 1

                # Replace Rules

                REPLACE_RULES = {
                    " ": " ",
                    " | Hacker News": "",
                    " - The New York Times": "",
                    " - WSJ": "",
                    " | Max Woolf's Blog": "",
                    " — Alin Panaitiu": "",
                    " | IMG.LY Blog": "",
                    " - Tyler Cipriani": "",
                    " - Code Faster with Kite": "",
                    " | the art of technology": "",
                    " | Cloudflare": "",
                }

                for rule in REPLACE_RULES:
                    if rule in line:
                        line = line.replace(rule, REPLACE_RULES[rule])
                f.write(line)
    print("Replaced " + str(COUNTER) + " hex marks.")
