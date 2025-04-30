#!/usr/bin/env python3
"""
Run from the project root:

    $ python3 preprocess.py          # normal run
    $ python3 preprocess.py --clean  # include cleanup of unused assets
"""

from __future__ import annotations

import argparse
import concurrent.futures as cf
import json
import os
import re
import shutil
import unicodedata
import time
import random
import urllib.parse
from datetime import timezone
from pathlib import Path
from typing import Any, Dict, Iterable, Iterator, List, Mapping, MutableMapping, Optional, Tuple, Union

TZ_UTC = timezone.utc  # type: ignore


class CaseInsensitiveDict(MutableMapping[str, Any]):
    """Minimal case-insensitive dict (only what we need)."""
    def __init__(self,
                 data: Optional[Union[Mapping[str, Any], Iterable[Tuple[str, Any]]]] = None,
                 **kwargs: Any) -> None:
        self._store: Dict[str, Tuple[str, Any]] = {}
        data = data or {}
        self.update(data, **kwargs)

    def __getitem__(self, key: str) -> Any:
        return self._store[key.lower()][1]

    def __setitem__(self, key: str, value: Any) -> None:
        self._store[key.lower()] = (key, value)

    def __delitem__(self, key: str) -> None:
        del self._store[key.lower()]

    def __iter__(self) -> Iterator[str]:
        return (orig for orig, _ in self._store.values())

    def __len__(self) -> int:
        return len(self._store)


def nfc(path_or_text: str) -> str:
    """NFC-normalise a string."""
    return unicodedata.normalize("NFC", path_or_text)


def random_hex() -> str:
    """Return a 6-digit uppercase hex."""
    random.seed(int(time.time() * 1000))
    return f"{random.randint(0, 0xFFFFFF):06X}"


def debug(msg: str, flag: bool) -> None:
    if flag:
        print(msg)

REPLACE_RULES: Dict[str, str] = {
    " ": " ",
    "️": "",
    "（": "(",
    "﻿": "",
    "）": ")",
    "# # # ": "### ",
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
    " – arXiv Vanity": "",
    " | npj Digital Medicine": "",
    " - Databricks": "",
    "background-color: rgb(228, 228, 228);": "",
    "**: ": "** — ",
    "]]: ": "]]. ",
    'lang: ko': "lang: 'ko'",
    'lang: en': "lang: 'en'",
    ' | Papers With Code': "",
    " - PMC": "",
}

def sanitise_md(research_root: Path, debug_flag: bool) -> None:
    md_files = [p for p in research_root.rglob("*") if p.suffix in (".md", ".mdx")]
    print(f"🧼 Sanitizing {len(md_files)} markdown files…")

    # We process files in parallel – it’s CPU-light but IO-heavy; ThreadPool is fine.
    with cf.ThreadPoolExecutor() as ex:
        list(ex.map(_sanitise_one, md_files, [debug_flag] * len(md_files)))


def _sanitise_one(path: Path, debug_flag: bool) -> None:
    text = nfc(path.read_text(encoding="utf-8"))
    # HEX placeholders
    if "{{hex}}" in text:
        text = text.replace("{{hex}}", "/" + random_hex())
    # Bulk replacements
    for old, new in REPLACE_RULES.items():
        if old in text:
            text = text.replace(old, new)
    path.write_text(text, encoding="utf-8")
    debug(f"  • {path.relative_to(REPO)}", debug_flag)

def process_blog(posts_src: Path, blog_en: Path, blog_ko: Path, cfg: Path) -> None:
    print("📝 Processing blog…")

    # Fresh dirs
    for target in (blog_en, blog_ko):
        if target.exists():
            shutil.rmtree(target)
        target.mkdir(parents=True)

    # Copy
    for entry in posts_src.iterdir():
        if entry.is_file():
            shutil.copy(entry, blog_en)
            shutil.copy(entry, blog_ko)
        else:
            shutil.copytree(entry, blog_en / entry.name)
            shutil.copytree(entry, blog_ko / entry.name)

    # authors.yml
    shutil.copy(cfg / "english.yml", blog_en / "authors.yml")
    shutil.copy(cfg / "korean.yml", blog_ko / "authors.yml")

    # rename/delete language-specific files
    _walk_rename(blog_en, "en", "ko")
    _walk_rename(blog_ko, "ko", "en")


def _walk_rename(dir_: Path, to_index: str, to_delete: str) -> None:
    for path in dir_.rglob("*"):
        if path.is_file() and path.suffix in (".md", ".mdx"):
            if path.stem.startswith(to_index):
                path.rename(path.with_name("index" + path.suffix))
            elif path.stem.startswith(to_delete):
                path.unlink()


def process_docs(research_src: Path, docs_dst: Path, debug_flag: bool) -> None:
    print("📚 Building docs…")

    if docs_dst.exists():
        shutil.rmtree(docs_dst)
    shutil.copytree(research_src, docs_dst)

    all_md = [p for p in docs_dst.rglob("*.md")]
    yml_files = [p for p in research_src.rglob("*.yml")]
    
    for yml_file in yml_files:
        rel_path = yml_file.relative_to(research_src)
        target_path = docs_dst / rel_path
        target_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(yml_file, target_path)

    # Copy over assets directory first
    shutil.copytree(research_src / "assets", docs_dst / "assets", dirs_exist_ok=True)

    # Handle image paths in markdown files
    def process_images(path: Path) -> None:
        text = path.read_text(encoding="utf-8")
        # Replace wikilink style images ![[filename.ext]] with markdown style ![filename](../assets/filename.ext)
        text = re.sub(r"!\[\[([^]]+?)]]", lambda m: f"![{m.group(1)}](../assets/{m.group(1)})", text)
        path.write_text(text, encoding="utf-8")

    # Apply image processing to all markdown files
    with cf.ThreadPoolExecutor() as ex:
        list(ex.map(process_images, all_md))

    def run(path: Path) -> None:
        text = path.read_text(encoding="utf-8")
        text_out = _resolve_wikilinks(text, path, all_md, debug_flag)
        path.write_text(text_out, encoding="utf-8")

    with cf.ThreadPoolExecutor() as ex:
        list(ex.map(run, all_md))


def _resolve_wikilinks(text: str, current: Path, all_md: List[Path], debug_flag: bool) -> str:
    def repl(match: re.Match[str]) -> str:
        raw = match.group(1)
        target, display = (raw.split("|", 1) + [raw])[:2]
        for md in all_md:
            if nfc(md.stem.lower()) == nfc(target.lower()):
                rel = os.path.relpath(md, current.parent)
                # Use standard urllib.parse for URL encoding
                # Split path by slashes to encode each part separately
                path_parts = rel.split('/')
                encoded_parts = [urllib.parse.quote(part) for part in path_parts]
                rel_encoded = '/'.join(encoded_parts)
                link = f"[{display}](./{rel_encoded})"
                debug(f"    [[{raw}]] → {link}", debug_flag)
                return link
        # fallback – leave plain
        return raw

    return re.sub(r"\[\[([^\]]+?)]]", repl, text)

def build_backlinks(docs_root: Path, out_dir: Path) -> None:
    print("🔗 Generating backlinks…")
    md_files = [p for p in docs_root.rglob("*.md")]
    backlink_map: Dict[str, Dict[str, str]] = CaseInsensitiveDict()
    filename_uid_map: Dict[str, str] = CaseInsensitiveDict()

    for path in md_files:
        filename = path.stem
        backlink_map[filename] = {}
        uid = ""
        text = path.read_text("utf-8")
        for line in text.splitlines():
            if line.startswith("slug: "):
                uid = line.split("slug: ", 1)[1].strip().strip("'\"/")

            for wikilink in re.findall(r"\[\[([^\]]+?)]]", line):
                source = wikilink.split("|")[0]
                before, after = _context(line, wikilink)
                backlink_map.setdefault(source, {})[filename] = before + "[[" + wikilink + "]]" + after

        if uid:
            filename_uid_map[filename] = uid

    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "backlinks.ts").write_text(
        "export const backlinks = " +
        json.dumps(dict(backlink_map), ensure_ascii=False, indent=4)
    )
    (out_dir / "filenames.ts").write_text(
        "export const filenames = " +
        json.dumps(dict(filename_uid_map), ensure_ascii=False, indent=4)
    )
    print(f"   • {len(backlink_map)} backlink entries")
    print(f"   • {len(filename_uid_map)} filename ↔ uid mappings")


def _context(line: str, needle: str, keep: int = 6) -> Tuple[str, str]:
    before_raw = line.split("[[" + needle + "]]")[0]
    after_raw = needle.join(line.split("[[" + needle + "]]")[1:])
    before = " ".join(before_raw.split()[-keep:])
    after = " ".join(after_raw.split()[:keep])
    return ("... " + before if before_raw != before else before,
            after + " ..." if after_raw != after else after)


_IMG_RE = re.compile(r'!\[([^\]]*?)\]\(([^)]+?)\)$', re.M)


def fix_img_alt(docs_root: Path) -> None:
    md_files = [p for p in docs_root.rglob("*") if p.suffix in (".md", ".mdx")]
    count = 0
    for path in md_files:
        if path.name == "Hey.md":
            continue
        text = path.read_text(encoding="utf-8")
        def repl(match: re.Match[str]) -> str:
            nonlocal count
            alt, src = match.groups()
            ext = Path(src).suffix.lower()
            count += 1
            if alt.endswith(ext) or alt.upper().startswith("ALT:"):
                return f"\n<figure>\n\n![{alt.replace('ALT:', '').replace('ALT: ', '')}]({src})\n\n</figure>\n"
            return f"\n<figure>\n\n![{alt}]({src})\n\n<figcaption>{alt}</figcaption>\n</figure>\n"
        text_out = _IMG_RE.sub(repl, text)
        if text_out != text:
            path.write_text(text_out, encoding="utf-8")
    print(f"🖼️  Re-wrote {count} image blocks")


def cleanup_assets(assets_dir: Path, research_root: Path) -> None:
    print("🧹 Cleaning unused assets…")
    if not assets_dir.is_dir():
        print("   (no assets directory)")
        return

    assets = {f.name for f in assets_dir.iterdir() if f.is_file()}
    mentioned: Dict[str, bool] = {f: False for f in assets}

    for md in research_root.rglob("*.md"):
        text = md.read_text(encoding="utf-8")
        for asset in assets:
            if asset in text:
                mentioned[asset] = True

    unused = [a for a, used in mentioned.items() if not used]
    if not unused:
        print("   No unused assets 🎉")
        return

    print("   Unused files:")
    for f in unused:
        print("    •", f)

    if input("   Delete them? (y/N): ").lower().startswith("y"):
        for f in unused:
            (assets_dir / f).unlink()
            print("      deleted", f)


REPO = Path(__file__).resolve().parent

def main() -> None:
    p = argparse.ArgumentParser(description="Build full site from Research markdown")
    p.add_argument("--debug", action="store_true")
    p.add_argument("--clean", action="store_true", help="Also delete unused assets")
    args = p.parse_args()

    research = REPO / "Research"
    docs = REPO / "docs"
    blog_en = REPO / "blog"
    blog_ko = REPO / "i18n" / "ko" / "docusaurus-plugin-content-blog"
    posts_src = REPO / "posts"
    cfg = REPO / "config"
    out_ts = REPO / "src" / "data"
    assets = REPO / "Research" / "assets"

    sanitise_md(research, args.debug)
    process_blog(posts_src, blog_en, blog_ko, cfg)
    process_docs(research, docs, args.debug)
    build_backlinks(docs, out_ts)
    fix_img_alt(docs)
    if args.clean:
        cleanup_assets(assets, research)

    print("✅ Preprocess completed.")


if __name__ == "__main__":
    main()
