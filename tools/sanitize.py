import os
import unicodedata


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

    # NFC-normalize the file names
    import shutil

    for md_file in all_md_files:
        new_name = unicodedata.normalize("NFC", md_file)
        if new_name != md_file:
            shutil.move(md_file, new_name)
            md_file = new_name
        with open(md_file, "r") as f:
            lines = f.readlines()
        with open(md_file, "w") as f:
            for line in lines:
                line = unicodedata.normalize("NFC", line)
                f.write(line)

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
                # remove all 'invisible' characters
                REPLACE_RULES = {
                    " ": " ",
                    "️": "",
                    "​": "",
                    "‍": "",
                    " ": " ",
                    "️": "",
                    "‍": "",
                    " ": " ",
                    " ": " ",
                    " ": " ",
                    " ": " ",
                    " ": " ",
                    " ": " ",
                    " ": " ",
                    " ": " ",
                    " ": " ",
                    " ": " ",
                    "（": "(",
                    "﻿": "",
                    "）": ")",
                    " ": " ",
                    "# # # ": "### ",
                    "‏": "",
                    "‍": "",
                    "  ": " ",
                    " | Hacker News": "",
                    " - The New York Times": "",
                    " | The New Yorker": "",
                    " - WSJ": "",
                    " | Max Woolf's Blog": "",
                    " — Alin Panaitiu": "",
                    " | IMG.LY Blog": "",
                    " - Tyler Cipriani": "",
                    " - Code Faster with Kite": "",
                    " | the art of technology": "",
                    " | Cloudflare": "",
                    " | TechCrunch": "",
                    " | Jesse Li": "",
                    " | GitHub Changelog": "",
                    " | MDN": "",
                    " | RheinardKorf.com": "",
                    " | Apple Developer Documentation": "",
                    " | Create Interactive Product Demos": "",
                    " | Medium": "",
                    " | Chris Xiao": "",
                    " | Malwarebytes Labs": "",
                    " | Scraping Fish": "",
                    " | Azure Blog and Updates": "",
                    " | Microsoft Azure": "",
                    " | The GitHub Blog": "",
                    " | 카카오": "",
                    " | LINE Developers": "",
                    " | Pinterest Newsroom": "",
                    " | by Analytics at Meta": "",
                    " | Deijin's Blog": "",
                    " | lunnova.dev": "",
                    " | Saeloun Blog": "",
                    " | CITIZEN WATCH Global Network": "",
                    " | LeoLabs": "",
                    " | Freedom Be With All": "",
                    " | School of AI": "",
                    " | Coursera": "",
                    " | Fortune": "",
                    " | USENIX": "",
                    " | Rayst": "",
                    " | Giza Project": "",
                    " | Financial Times": "",
                    " | Jacob Martin": "",
                    " | Deephaven": "",
                    " | IBM": "",
                    " | Pinecone": "",
                    " | Fontshare: Quality Fonts. Free.": "",
                    " | Codacy": "",
                    " | Microsoft 365 Blog": "",
                    " | Overview": "",
                    " | Roger Mexico's Oscillator": "",
                    " | The AI Search Engine You Control": "",
                    " | The Homepage Developers Deserve": "",
                    " | Docusaurus": "",
                    " | visualization components": "",
                    " | Roam Garden": "",
                    " | 5to9": "",
                    " | WebKit": "",
                    " | Framer": "",
                    " | Reuters": "",
                    " | Chatterhead Says": "",
                    " | Igalia": "",
                    " | hoho.com": "",
                    " | ExxonMobil": "",
                    " | The Guardian": "",
                    " | Barnabas Kendall": "",
                    " | Clockwise": "",
                    " | Blackmagic Design": "",
                    " | tseijp": "",
                    " | TigYog": "",
                    " | Massdriver Blog": "",
                    " | K리그 프로그래머": "",
                    " | Stanford News": "",
                    " | Cornell Chronicle": "",
                    " | Department of Energy": "",
                    " | TAXLY.KR (택슬리)": "",
                    "<br>": "<br/>",
                    '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>': "",
                    "“": '"',
                    "”": '"',
                    "‘": "'",
                    "’": "'",
                    " • TechCrunch": "",
                    " | Jay Mody": "",
                    " | 중앙일보": "",
                    " | The New York Times": "",
                    "[단독] ": "",
                    " – arXiv Vanity": "",
                    " – arXiv Vanity": "",
                    " | npj Digital Medicine": "",
                    " - Databricks": "",
                    "background-color: rgb(228, 228, 228);": "",
                    "**: ": "** — ",
                    "]]: ": "]]. ",
                }

                for rule in REPLACE_RULES:
                    if rule in line:
                        line = line.replace(rule, REPLACE_RULES[rule])
                    line = unicodedata.normalize("NFC", line)
                f.write(line)
    print("Replaced " + str(COUNTER) + " hex marks.")
