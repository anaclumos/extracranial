import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const REPO_ROOT = process.cwd();
const LIBRARY_ROOT = path.join(REPO_ROOT, "library");
const GIT_HISTORY_ROOTS = ["library", "Research"] as const;
const MARKDOWN_EXTENSIONS = new Set([".md", ".mdx"]);
const SKIPPED_DIRECTORIES = new Set([".obsidian", "assets", "templates"]);
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/;
const LIBRARY_PREFIX_RE = /^library\//;
const LAST_MODIFIED_RE = /^last_modified\s*:/;
const LINE_SPLIT_RE = /\r?\n/;
const WHITESPACE_RE = /\s+/;

async function collectMarkdownFiles(root: string): Promise<string[]> {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);

    if (entry.isDirectory()) {
      if (SKIPPED_DIRECTORIES.has(entry.name)) {
        continue;
      }
      files.push(...(await collectMarkdownFiles(fullPath)));
      continue;
    }

    if (MARKDOWN_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function parseBeforeArg() {
  const args = process.argv.slice(2);
  const beforeWithEquals = args.find((arg) => arg.startsWith("--before="));
  if (beforeWithEquals) {
    return beforeWithEquals.slice("--before=".length);
  }

  const beforeIndex = args.indexOf("--before");
  if (beforeIndex >= 0) {
    return args[beforeIndex + 1];
  }

  return undefined;
}

function getGitPathCandidates(relativePath: string) {
  return Array.from(new Set([relativePath, relativePath.replace(LIBRARY_PREFIX_RE, "Research/")]));
}

function pickLastUpdatedFromLog(stdout: string): string | undefined {
  let currentDate: string | null = null;
  let createdAt: string | undefined;

  for (const line of stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    if (trimmed.startsWith("__COMMIT__ ")) {
      currentDate = trimmed.slice("__COMMIT__ ".length);
      continue;
    }

    if (!currentDate) {
      continue;
    }

    const [status] = trimmed.split(WHITESPACE_RE, 1);
    if (!status) {
      continue;
    }

    if (status === "M") {
      return currentDate;
    }

    if (status === "A" && !createdAt) {
      createdAt = currentDate;
    }
  }

  return createdAt;
}

async function getLastUpdatedForRelativePath(
  relativePath: string,
  before?: string,
): Promise<string | undefined> {
  for (const candidate of getGitPathCandidates(relativePath)) {
    const candidateRoot = GIT_HISTORY_ROOTS.find((root) => candidate.startsWith(`${root}/`));
    if (!candidateRoot) {
      continue;
    }

    const args = ["-C", REPO_ROOT, "log", "--follow", "--name-status", "--format=__COMMIT__ %cs"];

    if (before) {
      args.push(`--before=${before} 00:00:00`);
    }

    args.push("--", candidate);

    const { stdout } = await execFileAsync("git", args, {
      maxBuffer: 1024 * 1024,
    });

    const resolved = pickLastUpdatedFromLog(stdout);
    if (resolved) {
      return resolved;
    }
  }

  return undefined;
}

function upsertLastModified(source: string, lastModified: string): string | null {
  const match = source.match(FRONTMATTER_RE);
  if (!match) {
    return null;
  }

  const lineEnding = source.includes("\r\n") ? "\r\n" : "\n";
  const frontmatterLines = match[1].split(LINE_SPLIT_RE);
  const existingIndex = frontmatterLines.findIndex((line) => LAST_MODIFIED_RE.test(line));
  const newLine = `last_modified: ${lastModified}`;

  if (existingIndex >= 0) {
    if (frontmatterLines[existingIndex] === newLine) {
      return source;
    }
    frontmatterLines[existingIndex] = newLine;
  } else {
    frontmatterLines.push(newLine);
  }

  const rest = source.slice(match[0].length);
  const rebuiltFrontmatter = ["---", ...frontmatterLines, "---"].join(lineEnding);

  return `${rebuiltFrontmatter}${match[2]}${rest}`;
}

async function runWithConcurrency<T>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<void>,
) {
  const queue = [...items];

  await Promise.all(
    Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
      while (queue.length > 0) {
        const item = queue.shift();
        if (item === undefined) {
          return;
        }
        await worker(item);
      }
    }),
  );
}

async function main() {
  const before = parseBeforeArg();
  const files = await collectMarkdownFiles(LIBRARY_ROOT);

  let updatedCount = 0;
  let skippedCount = 0;

  await runWithConcurrency(files, 12, async (filePath) => {
    const relativePath = path.relative(REPO_ROOT, filePath);
    const lastModified = await getLastUpdatedForRelativePath(relativePath, before);

    if (!lastModified) {
      skippedCount += 1;
      return;
    }

    const source = await fs.readFile(filePath, "utf8");
    const updatedSource = upsertLastModified(source, lastModified);

    if (!(updatedSource && updatedSource !== source)) {
      return;
    }

    await fs.writeFile(filePath, updatedSource);
    updatedCount += 1;
  });

  console.log(
    `Updated ${updatedCount} files with last_modified${before ? ` before ${before}` : ""}. Skipped ${skippedCount} files without git history.`,
  );
}

await main();
