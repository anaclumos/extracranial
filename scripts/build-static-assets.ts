import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const PROJECT_ROOT = process.cwd();
const LIBRARY_ROOT = path.join(PROJECT_ROOT, "library");
const LIBRARY_ASSETS_ROOT = path.join(LIBRARY_ROOT, "assets");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");
const CONTENT_ASSETS_DIR = path.join(PUBLIC_DIR, "content-assets");
const OG_DIR = path.join(PUBLIC_DIR, "og");

const MARKDOWN_EXTENSIONS = new Set([".md", ".mdx"]);
const SKIPPED_DIRECTORIES = new Set([".obsidian", "assets", "templates"]);
const ASSET_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".mp4",
  ".png",
  ".svg",
  ".webp",
]);

interface NoteEntry {
  dirPath: string;
  slug: string;
  title: string;
  description?: string;
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function collectMarkdownFiles(root: string): Promise<string[]> {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const files: string[] = [];
  const subdirPromises: Promise<string[]>[] = [];

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);

    if (entry.isDirectory()) {
      if (SKIPPED_DIRECTORIES.has(entry.name)) {
        continue;
      }
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

function extractSlug(filePath: string, frontmatter: Record<string, unknown>): string {
  if (typeof frontmatter.slug === "string" && frontmatter.slug.trim()) {
    return frontmatter.slug.trim();
  }
  return path.basename(filePath, path.extname(filePath));
}

async function readNoteEntries(): Promise<NoteEntry[]> {
  const allFiles = await collectMarkdownFiles(LIBRARY_ROOT);
  const entries: NoteEntry[] = [];

  for (const filePath of allFiles) {
    const content = await fs.readFile(filePath, "utf8");
    const { data } = matter(content);
    const slug = extractSlug(filePath, data);
    if (!slug) continue;

    entries.push({
      dirPath: path.dirname(filePath),
      slug,
      title: typeof data.title === "string" ? data.title : slug,
      description: typeof data.description === "string" ? data.description : undefined,
    });
  }

  return entries;
}

async function copyLocalAssets(notes: NoteEntry[]) {
  const seen = new Set<string>();

  for (const note of notes) {
    if (seen.has(note.dirPath)) continue;
    seen.add(note.dirPath);

    let entries: Awaited<ReturnType<typeof fs.readdir>>;
    try {
      entries = await fs.readdir(note.dirPath, { withFileTypes: true });
    } catch {
      continue;
    }

    const assetFiles = entries.filter(
      (entry) =>
        entry.isFile() &&
        ASSET_EXTENSIONS.has(path.extname(entry.name).toLowerCase())
    );

    if (assetFiles.length === 0) continue;

    const destDir = path.join(CONTENT_ASSETS_DIR, note.slug);
    await ensureDir(destDir);

    for (const asset of assetFiles) {
      const src = path.join(note.dirPath, asset.name);
      const dest = path.join(destDir, asset.name);
      await fs.copyFile(src, dest);
    }
  }
}

async function copySharedAssets() {
  let entries: Awaited<ReturnType<typeof fs.readdir>>;
  try {
    entries = await fs.readdir(LIBRARY_ASSETS_ROOT, { withFileTypes: true });
  } catch {
    return;
  }

  const destDir = path.join(CONTENT_ASSETS_DIR, "_assets");
  await ensureDir(destDir);

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const src = path.join(LIBRARY_ASSETS_ROOT, entry.name);
    const dest = path.join(destDir, entry.name);
    await fs.copyFile(src, dest);
  }
}

async function generateOGImages(notes: NoteEntry[]) {
  await ensureDir(OG_DIR);

  const { generateOGImage } = await import(
    "../src/lib/og/og-generator"
  );

  let generated = 0;
  let skipped = 0;

  const CONCURRENCY = 8;
  const queue = [...notes];

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
      while (queue.length > 0) {
        const note = queue.shift();
        if (!note) return;

        const dest = path.join(OG_DIR, `${note.slug}.png`);

        try {
          await fs.access(dest);
          skipped += 1;
          continue;
        } catch {
          // File doesn't exist, generate it
        }

        try {
          const response = await generateOGImage({
            title: note.title,
            description: note.description,
          });
          const buffer = await response.arrayBuffer();
          await fs.writeFile(dest, Buffer.from(buffer));
          generated += 1;
        } catch (error) {
          console.error(`Failed to generate OG image for ${note.slug}:`, error);
        }
      }
    })
  );

  console.log(
    `OG images: ${generated} generated, ${skipped} skipped (already exist)`
  );
}

async function main() {
  const skipOG = process.argv.includes("--skip-og");

  console.log("Reading note entries...");
  const notes = await readNoteEntries();
  console.log(`Found ${notes.length} notes`);

  console.log("Copying local assets...");
  await copyLocalAssets(notes);

  console.log("Copying shared assets...");
  await copySharedAssets();

  if (!skipOG) {
    console.log("Generating OG images...");
    await generateOGImages(notes);
  } else {
    console.log("Skipping OG image generation (--skip-og)");
  }

  console.log("Static assets build complete.");
}

await main();
