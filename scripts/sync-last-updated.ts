import { execFile } from "node:child_process"
import fs from "node:fs/promises"
import path from "node:path"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)
const REPO_ROOT = process.cwd()
const LIBRARY_ROOT = path.join(REPO_ROOT, "library")
const MARKDOWN_EXTENSIONS = new Set([".md", ".mdx"])
const SKIPPED_DIRECTORIES = new Set([".obsidian", "assets", "templates"])
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/

async function collectMarkdownFiles(root: string): Promise<string[]> {
  const entries = await fs.readdir(root, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name)

    if (entry.isDirectory()) {
      if (SKIPPED_DIRECTORIES.has(entry.name)) {
        continue
      }
      files.push(...(await collectMarkdownFiles(fullPath)))
      continue
    }

    if (MARKDOWN_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }

  return files
}

async function getLastUpdatedByRelativePath(): Promise<Map<string, string>> {
  const { stdout } = await execFileAsync(
    "git",
    [
      "-C",
      REPO_ROOT,
      "log",
      "--name-only",
      "--format=__COMMIT__ %cs",
      "--",
      "library",
    ],
    {
      maxBuffer: 16 * 1024 * 1024,
    }
  )

  const lastUpdatedByPath = new Map<string, string>()
  let currentDate: string | null = null

  for (const line of stdout.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed) {
      continue
    }

    if (trimmed.startsWith("__COMMIT__ ")) {
      currentDate = trimmed.slice("__COMMIT__ ".length)
      continue
    }

    if (!(currentDate && !lastUpdatedByPath.has(trimmed))) {
      continue
    }

    lastUpdatedByPath.set(trimmed, currentDate)
  }

  return lastUpdatedByPath
}

function upsertLastUpdated(source: string, lastUpdated: string): string | null {
  const match = source.match(FRONTMATTER_RE)
  if (!match) {
    return null
  }

  const lineEnding = source.includes("\r\n") ? "\r\n" : "\n"
  const frontmatterLines = match[1].split(/\r?\n/)
  const existingIndex = frontmatterLines.findIndex((line) =>
    /^last_updated\s*:/.test(line)
  )
  const newLine = `last_updated: ${lastUpdated}`

  if (existingIndex >= 0) {
    if (frontmatterLines[existingIndex] === newLine) {
      return source
    }
    frontmatterLines[existingIndex] = newLine
  } else {
    frontmatterLines.push(newLine)
  }

  const rest = source.slice(match[0].length)
  const rebuiltFrontmatter = [
    "---",
    ...frontmatterLines,
    "---",
  ].join(lineEnding)

  return `${rebuiltFrontmatter}${match[2]}${rest}`
}

async function main() {
  const files = await collectMarkdownFiles(LIBRARY_ROOT)
  const lastUpdatedByPath = await getLastUpdatedByRelativePath()

  let updatedCount = 0
  let skippedCount = 0

  for (const filePath of files) {
    const relativePath = path.relative(REPO_ROOT, filePath)
    const lastUpdated = lastUpdatedByPath.get(relativePath)

    if (!lastUpdated) {
      skippedCount += 1
      continue
    }

    const source = await fs.readFile(filePath, "utf8")
    const updatedSource = upsertLastUpdated(source, lastUpdated)

    if (!(updatedSource && updatedSource !== source)) {
      continue
    }

    await fs.writeFile(filePath, updatedSource)
    updatedCount += 1
  }

  console.log(
    `Updated ${updatedCount} files with last_updated. Skipped ${skippedCount} files without git history.`
  )
}

await main()
