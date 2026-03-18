import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const LIBRARY_ROOT = path.join(process.cwd(), "library");
const MARKDOWN_EXTENSIONS = new Set([".md", ".mdx"]);
const SKIPPED_DIRECTORIES = new Set([".obsidian", "assets", "templates"]);
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;
const PLACEHOLDER = "{{hex}}";

async function collectMarkdownFiles(root: string): Promise<string[]> {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const files: string[] = [];
  const subdirPromises: Promise<string[]>[] = [];

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (SKIPPED_DIRECTORIES.has(entry.name)) continue;
      subdirPromises.push(collectMarkdownFiles(fullPath));
      continue;
    }
    if (MARKDOWN_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  const subdirResults = await Promise.all(subdirPromises);
  return files.concat(...subdirResults);
}

function collectExistingSlugs(files: { path: string; content: string }[]): Set<string> {
  const slugs = new Set<string>();
  for (const file of files) {
    const match = file.content.match(FRONTMATTER_RE);
    if (!match) continue;
    const frontmatter = match[1];
    const slugLine = frontmatter.split("\n").find((l) => l.startsWith("slug:"));
    if (!slugLine) continue;
    const slug = slugLine
      .replace(/^slug:\s*/, "")
      .replace(/['"]/g, "")
      .replace(/^\//, "")
      .trim();
    if (slug && slug !== PLACEHOLDER) {
      slugs.add(slug.toUpperCase());
    }
  }
  return slugs;
}

function generateUniqueHex(existing: Set<string>): string {
  for (;;) {
    const hex = crypto.randomBytes(3).toString("hex").toUpperCase();
    if (!existing.has(hex)) {
      existing.add(hex);
      return hex;
    }
  }
}

async function main() {
  const allPaths = await collectMarkdownFiles(LIBRARY_ROOT);
  const allFiles = await Promise.all(
    allPaths.map(async (p) => ({
      path: p,
      content: await fs.readFile(p, "utf8"),
    })),
  );

  const existingSlugs = collectExistingSlugs(allFiles);
  let replaced = 0;

  for (const file of allFiles) {
    if (!file.content.includes(PLACEHOLDER)) continue;

    const hex = generateUniqueHex(existingSlugs);
    const updated = file.content.replace(PLACEHOLDER, hex);
    await fs.writeFile(file.path, updated, "utf8");
    const relative = path.relative(process.cwd(), file.path);
    console.log(`${relative}: ${hex}`);
    replaced++;
  }

  if (replaced === 0) {
    console.log("No {{hex}} placeholders found.");
  } else {
    console.log(`\nAssigned ${replaced} hex slug(s).`);
  }
}

main();
