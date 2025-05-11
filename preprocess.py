#!/usr/bin/env python3
"""
Preprocess Research → docs/blog/assets.

Execute:

    # normal run
    env PYTHONUTF8=1 PYTHONHASHSEED=0 PYTHONDONTWRITEBYTECODE=1 python3 -OO preprocess.py

    # delete unused assets after build
    env PYTHONUTF8=1 PYTHONHASHSEED=0 PYTHONDONTWRITEBYTECODE=1 python3 -OO preprocess.py --clean
"""

from __future__ import annotations

import argparse
import concurrent.futures as cf
import json
import os
import re
import shutil
import unicodedata
import urllib.parse
from datetime import timezone
from pathlib import Path
from secrets import randbelow
from typing import (
    Any,
    Dict,
    Iterable,
    Iterator,
    List,
    Mapping,
    MutableMapping,
    Optional,
    Tuple,
    Union,
)

# ── constants ────────────────────────────────────────────────────────────────────

TZ_UTC = timezone.utc  # type: ignore
REPO = Path(__file__).resolve().parent
REPLACE_RULES_PATH = REPO / "replace_rules.json"

# ── helpers ──────────────────────────────────────────────────────────────────────


class CaseInsensitiveDict(MutableMapping[str, Any]):
    """A tiny case-insensitive dict."""

    def __init__(
        self,
        data: Optional[Union[Mapping[str, Any], Iterable[Tuple[str, Any]]]] = None,
        **kwargs: Any,
    ) -> None:
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


def nfc(text: str) -> str:
    """NFC-normalise a string."""
    return unicodedata.normalize("NFC", text)


def random_hex() -> str:
    """Return a cryptographically-safe 6-digit uppercase hex."""
    return f"{randbelow(0xFFFFFF + 1):06X}"


# ── load replace rules ───────────────────────────────────────────────────────────

with REPLACE_RULES_PATH.open("r", encoding="utf-8") as fh:
    REPLACE_RULES: Dict[str, str] = json.load(fh)

_REPLACE_RE = re.compile("|".join(map(re.escape, REPLACE_RULES)))
_LANG_FIX_RE = re.compile(r"---\s*\n(.*?)\n---", re.DOTALL)

# ── global regexes ───────────────────────────────────────────────────────────────

_WIKILINK_RE = re.compile(r"\[\[([^\]]+?)]]")              # raw [[…]] tokens
_CODE_BLOCK_RE = re.compile(r"```.*?```", re.S)            # fenced code
_IMG_RE = re.compile(r"!\[([^\]]*?)\]\(([^)]+?)\)$", re.M) # images
_SLUG_RE = re.compile(r"^slug:\s+['\"]?([^\s'\"#]+)['\"]?", re.M)

# ── markdown sanitisation ────────────────────────────────────────────────────────


def sanitise_md(root: Path) -> None:
    md_files = [p for p in root.rglob("*") if p.suffix in (".md", ".mdx")]
    print(f"📝 Sanitizing {len(md_files)} markdown files...")
    with cf.ThreadPoolExecutor() as ex:
        ex.map(_sanitise_one, md_files)
    print(f"✨ Completed markdown sanitization")


def _sanitise_one(path: Path) -> None:
    text = nfc(path.read_text("utf-8"))

    if "{{hex}}" in text and "template" not in path.name:
        text = text.replace("{{hex}}", "/" + random_hex())

    text = _REPLACE_RE.sub(lambda m: REPLACE_RULES[m.group(0)], text)

    fm = _LANG_FIX_RE.match(text)
    if fm and "lang: 'en'" in fm.group(1):
        if "div lang='ko" not in text and 'div lang="ko' not in text:
            ko_name = any("\uAC00" <= ch <= "\uD7A3" for ch in path.name)
            ko_chars = sum("\uAC00" <= ch <= "\uD7A3" for ch in text)
            en_chars = sum("a" <= ch.lower() <= "z" for ch in text)
            if ko_name or ko_chars > en_chars:
                text = text.replace("lang: 'en'", "lang: 'ko'")

    path.write_text(text, "utf-8")


# ── blog generation ──────────────────────────────────────────────────────────────


def process_blog(src: Path, en: Path, ko: Path, cfg: Path) -> None:
    print(f"📚 Processing blog content...")
    for dst in (en, ko):
        if dst.exists():
            shutil.rmtree(dst)
        dst.mkdir(parents=True)

    file_count = sum(1 for _ in src.rglob("*") if _.is_file())
    print(f"📋 Copying {file_count} blog files to English and Korean destinations")

    for entry in src.iterdir():
        if entry.is_file():
            shutil.copy(entry, en)
            shutil.copy(entry, ko)
        else:
            shutil.copytree(entry, en / entry.name)
            shutil.copytree(entry, ko / entry.name)

    shutil.copy(cfg / "english.yml", en / "authors.yml")
    shutil.copy(cfg / "korean.yml", ko / "authors.yml")
    _walk_rename(en, "en", "ko")
    _walk_rename(ko, "ko", "en")
    print(f"🌐 Completed blog processing")


def _walk_rename(base: Path, to_index: str, to_delete: str) -> None:
    for p in base.rglob("*"):
        if p.suffix not in (".md", ".mdx"):
            continue
        if p.stem.startswith(to_index):
            p.rename(p.with_name("index" + p.suffix))
        elif p.stem.startswith(to_delete):
            p.unlink()


# ── docs build ───────────────────────────────────────────────────────────────────


def process_docs(src: Path, dst: Path) -> None:
    print(f"📔 Processing documentation...")
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst)

    md_files = [p for p in dst.rglob("*.md")]
    print(f"🔗 Resolving links in {len(md_files)} markdown files")
    link_map = {nfc(p.stem.lower()): p for p in md_files}

    for yml in src.rglob("*.yml"):
        target = dst / yml.relative_to(src)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(yml, target)

    shutil.copytree(src / "assets", dst / "assets", dirs_exist_ok=True)

    with cf.ThreadPoolExecutor() as ex:
        ex.map(_process_images, md_files)
        ex.map(lambda p: _resolve_file(p, link_map), md_files)
    print(f"📘 Completed documentation processing")


def _process_images(path: Path) -> None:
    txt = path.read_text("utf-8")
    txt = re.sub(
        r"!\[\[([^]]+?)]]",
        lambda m: f"![{m.group(1)}](../assets/{m.group(1)})",
        txt,
    )
    path.write_text(txt, "utf-8")


def _resolve_file(path: Path, link_map: Dict[str, Path]) -> None:
    txt = path.read_text("utf-8")

    parts: List[str] = []
    last = 0
    for m in _CODE_BLOCK_RE.finditer(txt):
        start, end = m.span()
        outside = txt[last:start]
        outside = _WIKILINK_RE.sub(
            lambda w: _resolve_wikilink(w, path, link_map), outside
        )
        parts.append(outside)
        parts.append(m.group(0))
        last = end
    remainder = txt[last:]
    remainder = _WIKILINK_RE.sub(
        lambda w: _resolve_wikilink(w, path, link_map), remainder
    )
    parts.append(remainder)

    out = "".join(parts)
    if out != txt:
        path.write_text(out, "utf-8")


def _resolve_wikilink(match: re.Match[str], cur: Path, link_map: Dict[str, Path]) -> str:
    raw = match.group(1)

    # Skip tokens that are clearly not wiki titles
    if not raw or raw[0].isspace() or raw[-1].isspace() or raw.lstrip().startswith("-"):
        return match.group(0)  # leave untouched

    target, display = (raw.split("|", 1) + [raw])[:2]
    md = link_map.get(nfc(target.lower()))
    if not md:
        return match.group(0)  # unresolved → keep original

    rel = os.path.relpath(md, cur.parent)
    rel = "/".join(urllib.parse.quote(seg) for seg in rel.split("/"))
    return f"[{display}](./{rel})"


# ── backlink map ─────────────────────────────────────────────────────────────────


def build_backlinks(root: Path, out_dir: Path) -> None:
    print(f"🔄 Building backlink map...")
    backlink_map: Dict[str, Dict[str, str]] = CaseInsensitiveDict()
    uid_map: Dict[str, str] = CaseInsensitiveDict()

    file_count = 0
    link_count = 0
    
    for p in root.rglob("*.md"):
        file_count += 1
        fname = p.stem
        backlink_map.setdefault(fname, {})
        txt = p.read_text("utf-8")

        uid = _SLUG_RE.search(txt)
        if uid:
            uid_map[fname] = uid.group(1)

        for wl in _WIKILINK_RE.findall(txt):
            link_count += 1
            source = wl.split("|")[0]
            backlink_map.setdefault(source, {})[fname] = _context(txt, wl)

    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "backlinks.ts").write_text(
        "export const backlinks = "
        + json.dumps(dict(backlink_map), ensure_ascii=False, indent=4)
    )
    (out_dir / "filenames.ts").write_text(
        "export const filenames = "
        + json.dumps(dict(uid_map), ensure_ascii=False, indent=4)
    )
    print(f"🧩 Created backlink map with {file_count} files and {link_count} links")


def _context(txt: str, needle: str, keep: int = 6) -> str:
    tag = f"[[{needle}]]"
    for line in txt.splitlines():
        if tag not in line:
            continue
        pre_raw, post_raw = line.split(tag, 1)
        pre = " ".join(pre_raw.split()[-keep:])
        post = " ".join(post_raw.split()[:keep])
        return (
            ("... " + pre if pre_raw != pre else pre)
            + tag
            + (" " + post + "..." if post_raw != post else post)
        )
    return ""


# ── image alt fix ────────────────────────────────────────────────────────────────


def fix_img_alt(root: Path) -> None:
    count = 0
    for p in root.rglob("*"):
        if p.suffix not in (".md", ".mdx") or p.name == "Welcome.md":
            continue
        txt = p.read_text("utf-8")

        def repl(m: re.Match[str]) -> str:
            nonlocal count
            alt, src = m.groups()
            ext = Path(src).suffix.lower()
            count += 1
            if alt.endswith(ext) or alt.upper().startswith("ALT:"):
                clean = alt.replace("ALT:", "").strip()
                return f"\n<figure>\n\n![{clean}]({src})\n\n</figure>\n"
            return (
                f"\n<figure>\n\n![{alt}]({src})\n\n<figcaption>{alt}</figcaption>\n</figure>\n"
            )

        out = _IMG_RE.sub(repl, txt)
        if out != txt:
            p.write_text(out, "utf-8")


# ── asset cleanup ────────────────────────────────────────────────────────────────


def cleanup_assets(assets_dir: Path, research_root: Path) -> None:
    print(f"🧹 Checking for unused assets...")
    if not assets_dir.is_dir():
        return

    assets = {f.name for f in assets_dir.iterdir() if f.is_file()}
    print(f"🔍 Analyzing {len(assets)} assets for usage")
    mentioned = {f: False for f in assets}

    for md in research_root.rglob("*.md"):
        txt = md.read_text("utf-8")
        for a in assets:
            if a in txt:
                mentioned[a] = True

    unused = [a for a, used in mentioned.items() if not used]
    if not unused:
        print("✅ No unused assets found.")
        return

    print(f"🗑️ Found {len(unused)} unused assets:")
    for f in unused:
        print(" •", f)

    if input("Delete them? (y/N): ").lower().startswith("y"):
        for f in unused:
            (assets_dir / f).unlink()
            print(f"🗑️ Deleted {f}")


# ── entry point ─────────────────────────────────────────────────────────────────


def main() -> None:
    print("🚀 Starting preprocessing...")
    ap = argparse.ArgumentParser(description="Build site from Research markdown")
    ap.add_argument("--clean", action="store_true", help="Also delete unused assets")
    args = ap.parse_args()

    research = REPO / "Research"
    docs = REPO / "docs"
    blog_en = REPO / "blog"
    blog_ko = REPO / "i18n" / "ko" / "docusaurus-plugin-content-blog"
    posts_src = REPO / "posts"
    cfg = REPO / "config"
    out_ts = REPO / "src" / "data"
    assets = research / "assets"

    sanitise_md(research)
    process_blog(posts_src, blog_en, blog_ko, cfg)
    process_docs(research, docs)
    build_backlinks(docs, out_ts)
    fix_img_alt(docs)
    if args.clean:
        cleanup_assets(assets, research)

    print("✅ Preprocess completed.")


if __name__ == "__main__":
    main()
