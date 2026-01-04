import { randomBytes } from 'node:crypto'
import { existsSync } from 'node:fs'
import {
  copyFile,
  mkdir,
  readdir,
  readFile,
  rename,
  rm,
  stat,
  unlink,
  writeFile,
} from 'node:fs/promises'
import {
  basename,
  dirname,
  extname,
  join,
  relative,
  resolve,
  sep,
} from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO = resolve(__dirname)
const REPLACE_RULES_PATH = join(REPO, 'replace_rules.json')

class CaseInsensitiveMap<T> extends Map<string, T> {
  override get(key: string): T | undefined {
    return super.get(key.toLowerCase())
  }

  override set(key: string, value: T): this {
    return super.set(key.toLowerCase(), value)
  }

  override has(key: string): boolean {
    return super.has(key.toLowerCase())
  }

  override delete(key: string): boolean {
    return super.delete(key.toLowerCase())
  }
}

function nfc(text: string): string {
  return text.normalize('NFC')
}

function randomHex(): string {
  return randomBytes(3).toString('hex').toUpperCase()
}

const REPLACE_RULES: Record<string, string> = JSON.parse(
  await readFile(REPLACE_RULES_PATH, 'utf-8')
)

const REPLACE_RE = new RegExp(
  Object.keys(REPLACE_RULES)
    .map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|'),
  'g'
)

const LANG_FIX_RE = /---\s*\n(.*?)\n---/s

const WIKILINK_RE = /\[\[([^\]]+?)]]/g
const CODE_BLOCK_RE = /```.*?```/gs
const IMG_RE = /!\[([^\]]*?)\]\(([^)]+?)\)$/gm
const SLUG_RE = /^slug:\s+['"]?([^\s'"#]+)['"]?/m
const WHITESPACE_RE = /\s+/

async function sanitiseMd(root: string): Promise<void> {
  const mdFiles = await findFiles(root, ['.md', '.mdx'])
  console.log(`📝 Sanitizing ${mdFiles.length} markdown files...`)

  await Promise.all(mdFiles.map(sanitiseOne))
  console.log('✨ Completed markdown sanitization')
}

async function sanitiseOne(filePath: string): Promise<void> {
  let text = nfc(await readFile(filePath, 'utf-8'))

  if (text.includes('{{hex}}') && !filePath.includes('template')) {
    text = text.replace('{{hex}}', `/${randomHex()}`)
  }

  text = text.replace(REPLACE_RE, (match) => REPLACE_RULES[match] ?? match)

  const fm = text.match(LANG_FIX_RE)
  if (
    fm?.[1]?.includes("lang: 'en'") &&
    !(text.includes("div lang='ko") || text.includes('div lang="ko'))
  ) {
    const fileName = basename(filePath)
    const koName = [...fileName].some((ch) => ch >= '\uAC00' && ch <= '\uD7A3')
    const koChars = [...text].filter(
      (ch) => ch >= '\uAC00' && ch <= '\uD7A3'
    ).length
    const enChars = [...text].filter(
      (ch) => (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')
    ).length

    if (koName || koChars > enChars) {
      text = text.replace("lang: 'en'", "lang: 'ko'")
    }
  }

  await writeFile(filePath, text, 'utf-8')
}

async function findFiles(dir: string, extensions: string[]): Promise<string[]> {
  const files: string[] = []

  async function walk(currentDir: string) {
    const entries = await readdir(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name)
      if (entry.isDirectory()) {
        await walk(fullPath)
      } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
        files.push(fullPath)
      }
    }
  }

  await walk(dir)
  return files
}

async function copyRecursive(src: string, dest: string): Promise<void> {
  const srcStat = await stat(src)

  if (srcStat.isDirectory()) {
    await mkdir(dest, { recursive: true })
    const entries = await readdir(src)

    for (const entry of entries) {
      await copyRecursive(join(src, entry), join(dest, entry))
    }
  } else {
    await copyFile(src, dest)
  }
}

async function rmrf(dir: string): Promise<void> {
  if (existsSync(dir)) {
    await rm(dir, { recursive: true, force: true })
  }
}

async function processBlog(
  src: string,
  en: string,
  ko: string,
  cfg: string
): Promise<void> {
  console.log('📚 Processing blog content...')

  await rmrf(en)
  await rmrf(ko)
  await mkdir(en, { recursive: true })
  await mkdir(ko, { recursive: true })

  const entries = await readdir(src, { withFileTypes: true })
  const fileCount = await countFiles(src)
  console.log(
    `📋 Copying ${fileCount} blog files to English and Korean destinations`
  )

  for (const entry of entries) {
    const srcPath = join(src, entry.name)
    if (entry.isFile()) {
      await copyFile(srcPath, join(en, entry.name))
      await copyFile(srcPath, join(ko, entry.name))
    } else {
      await copyRecursive(srcPath, join(en, entry.name))
      await copyRecursive(srcPath, join(ko, entry.name))
    }
  }

  await copyFile(join(cfg, 'english.yml'), join(en, 'authors.yml'))
  await copyFile(join(cfg, 'korean.yml'), join(ko, 'authors.yml'))

  await walkRename(en, 'en', 'ko')
  await walkRename(ko, 'ko', 'en')

  console.log('🌐 Completed blog processing')
}

async function walkRename(
  base: string,
  toIndex: string,
  toDelete: string
): Promise<void> {
  const files = await findFiles(base, ['.md', '.mdx'])

  for (const file of files) {
    const dir = dirname(file)
    const fileBasename = basename(file, extname(file))
    const ext = extname(file)

    if (fileBasename.startsWith(toIndex)) {
      await rename(file, join(dir, `index${ext}`))
    } else if (fileBasename.startsWith(toDelete)) {
      await unlink(file)
    }
  }
}

async function countFiles(dir: string): Promise<number> {
  let count = 0
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      count += await countFiles(fullPath)
    } else {
      count++
    }
  }

  return count
}

async function processDocs(src: string, dst: string): Promise<void> {
  console.log('📔 Processing documentation...')

  await rmrf(dst)
  await copyRecursive(src, dst)

  const mdFiles = await findFiles(dst, ['.md'])
  console.log(`🔗 Resolving links in ${mdFiles.length} markdown files`)

  const linkMap = new CaseInsensitiveMap<string>()
  for (const file of mdFiles) {
    linkMap.set(nfc(basename(file, '.md')), file)
  }

  const ymlFiles = await findFiles(src, ['.yml'])
  for (const yml of ymlFiles) {
    const rel = relative(src, yml)
    const target = join(dst, rel)
    await mkdir(dirname(target), { recursive: true })
    await copyFile(yml, target)
  }

  const assetsDir = join(src, 'assets')
  if (existsSync(assetsDir)) {
    await copyRecursive(assetsDir, join(dst, 'assets'))
  }

  console.log(`📸 Processing images in ${mdFiles.length} files...`)
  await Promise.all(mdFiles.map((file) => processImages(file)))

  console.log('🔗 Resolving wikilinks...')
  await Promise.all(mdFiles.map((file) => resolveFile(file, linkMap)))

  console.log('📘 Completed documentation processing')
}

async function processImages(filePath: string): Promise<void> {
  let txt = await readFile(filePath, 'utf-8')

  txt = txt.replace(/!\[\[([^\]]+?)\]\]/g, (_match, p1) => {
    return `![${p1}](../assets/${p1})`
  })

  await writeFile(filePath, txt, 'utf-8')
}

async function resolveFile(
  filePath: string,
  linkMap: CaseInsensitiveMap<string>
): Promise<void> {
  const txt = await readFile(filePath, 'utf-8')
  const parts: string[] = []
  let lastIndex = 0

  const matches = [...txt.matchAll(CODE_BLOCK_RE)]

  for (const match of matches) {
    const start = match.index ?? 0
    const end = start + match[0].length

    const outside = txt.slice(lastIndex, start)
    const processedOutside = outside.replace(WIKILINK_RE, (m, p1) =>
      resolveWikilink(m, p1, filePath, linkMap)
    )

    parts.push(processedOutside)
    parts.push(match[0])
    lastIndex = end
  }

  const remainder = txt.slice(lastIndex)
  const processedRemainder = remainder.replace(WIKILINK_RE, (m, p1) =>
    resolveWikilink(m, p1, filePath, linkMap)
  )
  parts.push(processedRemainder)

  const out = parts.join('')
  if (out !== txt) {
    await writeFile(filePath, out, 'utf-8')
  }
}

function resolveWikilink(
  match: string,
  raw: string,
  currentFile: string,
  linkMap: CaseInsensitiveMap<string>
): string {
  if (
    !raw ||
    raw[0] === ' ' ||
    raw.at(-1) === ' ' ||
    raw.trimStart().startsWith('-')
  ) {
    return match
  }

  const pipeIndex = raw.indexOf('|')
  const target = pipeIndex === -1 ? raw : raw.slice(0, pipeIndex)
  const display = pipeIndex === -1 ? raw : raw.slice(pipeIndex + 1) || target
  const mdFile = linkMap.get(nfc(target))

  if (!mdFile) {
    return match
  }

  let rel = relative(dirname(currentFile), mdFile)
  rel = rel
    .split(sep)
    .map((segment) => encodeURIComponent(segment))
    .join('/')
  return `[${display}](./${rel})`
}

interface BacklinkMap {
  [key: string]: {
    [source: string]: string
  }
}

interface UidMap {
  [key: string]: string
}

function extractUid(txt: string): string | undefined {
  const uidMatch = txt.match(SLUG_RE)
  return uidMatch?.[1]
}

function processWikilinks(
  txt: string,
  fname: string,
  backlinkMap: BacklinkMap
): number {
  const wikilinks = [...txt.matchAll(WIKILINK_RE)]
  let linkCount = 0

  for (const match of wikilinks) {
    const rawWikilink = match[1]
    if (!rawWikilink) {
      continue
    }

    const pipeIndex = rawWikilink.indexOf('|')
    const source =
      pipeIndex === -1 ? rawWikilink : rawWikilink.slice(0, pipeIndex)
    if (!source) {
      continue
    }

    if (!backlinkMap[source]) {
      backlinkMap[source] = {}
    }

    backlinkMap[source][fname] = getContext(txt, rawWikilink)
    linkCount++
  }

  return linkCount
}

function sortBacklinkMap(backlinkMap: BacklinkMap): BacklinkMap {
  const sorted: BacklinkMap = {}

  for (const key of Object.keys(backlinkMap).sort()) {
    sorted[key] = {}
    const entries = backlinkMap[key]
    if (!entries) {
      continue
    }

    for (const nestedKey of Object.keys(entries).sort()) {
      const value = entries[nestedKey]
      if (value !== undefined) {
        sorted[key][nestedKey] = value
      }
    }
  }

  return sorted
}

function sortUidMap(uidMap: UidMap): UidMap {
  const sorted: UidMap = {}

  for (const key of Object.keys(uidMap).sort()) {
    const value = uidMap[key]
    if (value !== undefined) {
      sorted[key] = value
    }
  }

  return sorted
}

async function buildBacklinks(root: string, outDir: string): Promise<void> {
  console.log('🔄 Building backlink map...')

  const backlinkMap: BacklinkMap = {}
  const uidMap: UidMap = {}

  let fileCount = 0
  let linkCount = 0

  const allMdFiles = await findFiles(root, ['.md'])
  const mdFiles = allMdFiles.filter((file) => !file.includes('/templates/'))

  for (const file of mdFiles) {
    fileCount++
    const fname = basename(file, '.md')

    if (!backlinkMap[fname]) {
      backlinkMap[fname] = {}
    }

    const txt = await readFile(file, 'utf-8')

    const uid = extractUid(txt)
    if (uid) {
      uidMap[fname] = uid
    }

    linkCount += processWikilinks(txt, fname, backlinkMap)
  }

  await mkdir(outDir, { recursive: true })

  const sortedBacklinkMap = sortBacklinkMap(backlinkMap)
  const sortedUidMap = sortUidMap(uidMap)

  await writeFile(
    join(outDir, 'backlinks.json'),
    JSON.stringify(sortedBacklinkMap, null, 2)
  )

  await writeFile(
    join(outDir, 'filenames.json'),
    JSON.stringify(sortedUidMap, null, 2)
  )

  console.log(
    `🧩 Created backlink map with ${fileCount} files and ${linkCount} links`
  )
}

function getContext(txt: string, needle: string, keep = 6): string {
  const tag = `[[${needle}]]`
  const lines = txt.split('\n')

  for (const line of lines) {
    if (!line.includes(tag)) {
      continue
    }

    const [preRaw = '', postRaw = ''] = line.split(tag)
    const preParts = preRaw.split(WHITESPACE_RE)
    const postParts = postRaw.split(WHITESPACE_RE)

    const pre = preParts.slice(-keep).join(' ')
    const post = postParts.slice(0, keep).join(' ')

    return (
      (preRaw !== pre ? `... ${pre}` : pre) +
      tag +
      (postRaw !== post ? `${post} ...` : post)
    )
  }

  return ''
}

async function fixImgAlt(root: string): Promise<void> {
  const files = await findFiles(root, ['.md', '.mdx'])

  for (const file of files) {
    if (basename(file) === 'Welcome.md') {
      continue
    }

    const txt = await readFile(file, 'utf-8')

    const out = txt.replace(IMG_RE, (_match, alt, src) => {
      const ext = extname(src).toLowerCase()

      if (alt.endsWith(ext) || alt.toUpperCase().startsWith('ALT:')) {
        const clean = alt.replace('ALT:', '').trim()
        return `\n<figure>\n\n![${clean}](${src})\n\n</figure>\n`
      }

      return `\n<figure>\n\n![${alt}](${src})\n\n<figcaption>${alt}</figcaption>\n</figure>\n`
    })

    if (out !== txt) {
      await writeFile(file, out, 'utf-8')
    }
  }
}

async function cleanupAssets(
  assetsDir: string,
  researchRoot: string
): Promise<void> {
  console.log('🧹 Checking for unused assets...')

  if (!existsSync(assetsDir)) {
    return
  }

  const assets = await readdir(assetsDir)
  const assetFiles: string[] = []
  for (const asset of assets) {
    const assetStat = await stat(join(assetsDir, asset))
    if (assetStat.isFile()) {
      assetFiles.push(asset)
    }
  }
  console.log(`🔍 Analyzing ${assetFiles.length} assets for usage`)

  const mentioned = new Map<string, boolean>()
  for (const asset of assetFiles) {
    mentioned.set(asset, false)
  }

  const mdFiles = await findFiles(researchRoot, ['.md'])

  for (const mdFile of mdFiles) {
    const txt = await readFile(mdFile, 'utf-8')
    for (const asset of assetFiles) {
      if (txt.includes(asset)) {
        mentioned.set(asset, true)
      }
    }
  }

  const unused = assetFiles.filter((a) => !mentioned.get(a))

  if (unused.length === 0) {
    console.log('✅ No unused assets found.')
    return
  }

  console.log(`🗑️ Found ${unused.length} unused assets:`)
  for (const f of unused) {
    console.log(' •', f)
  }

  const readline = await import('node:readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const answer = await new Promise<string>((resolve) => {
    rl.question('Delete them? (y/N): ', resolve)
  })

  rl.close()

  if (answer.toLowerCase().startsWith('y')) {
    for (const f of unused) {
      await unlink(join(assetsDir, f))
      console.log(`🗑️ Deleted ${f}`)
    }
  }
}

async function main(): Promise<void> {
  console.log('🚀 Starting preprocessing...')

  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      clean: {
        type: 'boolean',
        default: false,
      },
    },
  })

  const research = join(REPO, 'Research')
  const docs = join(REPO, 'docs')
  const blogEn = join(REPO, 'blog')
  const blogKo = join(REPO, 'i18n', 'ko', 'docusaurus-plugin-content-blog')
  const postsSrc = join(REPO, 'posts')
  const cfg = join(REPO, 'config')
  const outTs = join(REPO, 'src', 'data')
  const assets = join(research, 'assets')

  await sanitiseMd(research)
  await processBlog(postsSrc, blogEn, blogKo, cfg)
  await buildBacklinks(research, outTs)
  await processDocs(research, docs)
  await fixImgAlt(docs)

  if (values.clean) {
    await cleanupAssets(assets, research)
  }

  console.log('✅ Preprocess completed.')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}
