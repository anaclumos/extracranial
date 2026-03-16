import { existsSync } from "node:fs";
import path from "node:path";
import { buildNoteHref, normalizeNoteSlug } from "../note-links";
import type { SourceNoteBase } from "./content-index";

const CODE_BLOCK_RE = /```[\s\S]*?```/g;
const MARKDOWN_IMAGE_RE = /!\[([^\]]*)]\(([^)\s]+)([^)]*)\)/g;
const MARKDOWN_LINK_RE = /(?<!!)\[([^\]]+)]\(([^)\s]+)([^)]*)\)/g;
const NOTE_ROUTE_RE =
  /^(?:https?:\/\/(?:www\.)?cho\.sh)?\/(?:library|manifesto|r|w|research|blog|journals|pages)\/([^/?#]+)/i;
const ADMONITION_CLOSE_RE = /^(\s*):::\s*$/;
const ADMONITION_OPEN_RE = /^(\s*):::(\w+)(?:\s+(.*))?$/;
const EXTERNAL_IMAGE_HREF_RE = /^(?:https?:|data:|#)/i;
const EXTERNAL_LINK_HREF_RE = /^(?:https?:|mailto:|#)/i;
const LEADING_RELATIVE_PATH_RE = /^(?:\.\.\/|\.\/)+/;
const MARKDOWN_SUFFIX_RE = /\.(md|mdx)$/i;
const TOP_LEVEL_IMPORT_RE = /^(?:import|export)\s.+$/gm;
const TRUNCATE_COMMENT_RE = /<!--\s*truncate\s*-->/g;
const WIKI_IMAGE_RE = /!\[\[([^\]]+)]]/g;
const WIKI_LINK_RE = /(?<!!)\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?]]/g;

function transformOutsideCodeBlocks(
  content: string,
  transform: (segment: string) => string
): string {
  const parts: string[] = [];
  let lastIndex = 0;

  for (const match of content.matchAll(CODE_BLOCK_RE)) {
    const index = match.index ?? 0;
    parts.push(transform(content.slice(lastIndex, index)));
    parts.push(match[0]);
    lastIndex = index + match[0].length;
  }

  parts.push(transform(content.slice(lastIndex)));
  return parts.join("");
}

function encodePathSegments(href: string): string {
  return href
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function normalizeAssetReference(href: string): string {
  return href.replace(LEADING_RELATIVE_PATH_RE, "");
}

function toAssetHref(note: SourceNoteBase, href: string): string {
  const normalized = normalizeAssetReference(href);
  if (note.dirPath) {
    const localPath = path.resolve(note.dirPath, normalized);
    if (localPath.startsWith(note.dirPath) && existsSync(localPath)) {
      return `/content-assets/${note.slug}/${encodePathSegments(normalized)}`;
    }
  }
  return `/content-assets/_assets/${encodePathSegments(path.basename(normalized))}`;
}

const CUSTOM_TAG_NAME_MAP = {
  Admonition: "admonition",
  AppleMusicSong: "applemusicsong",
  BrowserOnly: "browseronly",
  DisplayFlex: "displayflex",
  KoreaNetherlandsGlobe: "koreanetherlandsglobe",
  Shuffle: "shuffle",
  SpotifySong: "spotifysong",
  TabItem: "tabitem",
  Tabs: "tabs",
  WIP: "wip",
  YouTube: "youtube",
} as const;

const CUSTOM_SELF_CLOSING_TAGS = [
  "applemusicsong",
  "browseronly",
  "koreanetherlandsglobe",
  "spotifysong",
  "wip",
  "youtube",
] as const;

const SELF_CLOSING_TAG_REGEXES = CUSTOM_SELF_CLOSING_TAGS.map(
  (tag) => [new RegExp(`<${tag}([^>]*)/>`, "g"), tag] as const
);

function rewriteAdmonitions(segment: string): string {
  const lines = segment.split("\n");
  const output: string[] = [];
  let isInsideAdmonition = false;
  let admonitionIndent = "";

  for (const [index, line] of lines.entries()) {
    const openMatch = line.match(ADMONITION_OPEN_RE);
    if (openMatch) {
      const [, indent, type, title] = openMatch;
      if (output.at(-1)?.trim() !== "") {
        output.push(indent);
      }
      output.push(
        `${indent}<admonition type="${type}"${title ? ` title=${JSON.stringify(title)}` : ""}>`
      );
      isInsideAdmonition = true;
      admonitionIndent = indent;
      continue;
    }

    const closeMatch = line.match(ADMONITION_CLOSE_RE);
    if (isInsideAdmonition && closeMatch) {
      const closeIndent = closeMatch[1] ?? admonitionIndent;
      output.push(`${closeIndent}</admonition>`);
      isInsideAdmonition = false;
      admonitionIndent = "";
      if (lines[index + 1]?.trim() !== "") {
        output.push(closeIndent);
      }
      continue;
    }

    output.push(line);
  }

  return output.join("\n");
}

function stripTopLevelRuntimeStatements(segment: string): string {
  return segment.replace(TOP_LEVEL_IMPORT_RE, "");
}

function normalizeLegacyMath(segment: string): string {
  return segment.replace(/\$\{([\s\S]*?)\}\$/g, (_, expression: string) => {
    return `$${expression}$`;
  });
}

function normalizeCustomTags(segment: string): string {
  let normalizedSegment = segment;

  for (const [sourceTag, targetTag] of Object.entries(CUSTOM_TAG_NAME_MAP)) {
    normalizedSegment = normalizedSegment.replaceAll(
      `<${sourceTag}`,
      `<${targetTag}`
    );
    normalizedSegment = normalizedSegment.replaceAll(
      `</${sourceTag}>`,
      `</${targetTag}>`
    );
  }

  for (const [regex, tagName] of SELF_CLOSING_TAG_REGEXES) {
    regex.lastIndex = 0;
    normalizedSegment = normalizedSegment.replace(
      regex,
      `<${tagName}$1></${tagName}>`
    );
  }

  return normalizedSegment;
}

function resolveReferenceSlug(
  href: string,
  titleLookup: Map<string, string>
): string | null {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("#")) {
    return null;
  }

  const routeMatch = trimmed.match(NOTE_ROUTE_RE);
  if (routeMatch?.[1]) {
    return normalizeNoteSlug(routeMatch[1]);
  }

  const directSlug = normalizeNoteSlug(trimmed);
  if (directSlug && titleLookup.has(directSlug.toLowerCase())) {
    return titleLookup.get(directSlug.toLowerCase()) ?? directSlug;
  }

  const bySlug = normalizeNoteSlug(trimmed);
  if (bySlug && titleLookup.has(bySlug.normalize("NFC").trim().toLowerCase())) {
    return (
      titleLookup.get(bySlug.normalize("NFC").trim().toLowerCase()) ?? null
    );
  }

  const withoutExtension = trimmed.replace(MARKDOWN_SUFFIX_RE, "");
  return (
    titleLookup.get(withoutExtension.normalize("NFC").trim().toLowerCase()) ??
    null
  );
}

function rewriteWikiImages(segment: string, note: SourceNoteBase): string {
  return segment.replace(WIKI_IMAGE_RE, (_, rawTarget: string) => {
    const target = rawTarget.split("|")[0]?.trim() ?? rawTarget.trim();
    return `![${target}](${toAssetHref(note, target)})`;
  });
}

function rewriteMarkdownImages(segment: string, note: SourceNoteBase): string {
  return segment.replace(
    MARKDOWN_IMAGE_RE,
    (_, alt: string, href: string, suffix: string) => {
      if (EXTERNAL_IMAGE_HREF_RE.test(href) || href.startsWith("/")) {
        return `![${alt}](${href}${suffix})`;
      }
      return `![${alt}](${toAssetHref(note, href)}${suffix})`;
    }
  );
}

function rewriteWikiLinks(
  segment: string,
  titleLookup: Map<string, string>
): string {
  return segment.replace(
    WIKI_LINK_RE,
    (match, rawTarget: string, rawLabel: string | undefined) => {
      const slug = resolveReferenceSlug(rawTarget, titleLookup);
      const label = rawLabel?.trim() || rawTarget.trim();
      if (!slug) {
        return label || match;
      }
      return `[${label}](${buildNoteHref(slug)})`;
    }
  );
}

function rewriteMarkdownLinks(
  segment: string,
  titleLookup: Map<string, string>
): string {
  return segment.replace(
    MARKDOWN_LINK_RE,
    (_, label: string, href: string, suffix: string) => {
      if (EXTERNAL_LINK_HREF_RE.test(href)) {
        return `[${label}](${href}${suffix})`;
      }

      const slug = resolveReferenceSlug(href, titleLookup);
      if (!slug) {
        return `[${label}](${href}${suffix})`;
      }

      return `[${label}](${buildNoteHref(slug)}${suffix})`;
    }
  );
}

function rewriteTabItemContent(segment: string): string {
  return segment.replace(
    /<tabitem\b([^>]*)>([\s\S]*?)<\/tabitem>/g,
    (_, attributes: string, content: string) => {
      const encodedContent = Buffer.from(content.trim(), "utf8").toString(
        "base64"
      );
      return `<tabitem${attributes} source=${JSON.stringify(encodedContent)}></tabitem>`;
    }
  );
}

export function preprocessNoteSource(
  note: SourceNoteBase,
  titleLookup: Map<string, string>
): string {
  const contentWithoutComments = note.content.replace(TRUNCATE_COMMENT_RE, "");

  return transformOutsideCodeBlocks(contentWithoutComments, (segment) => {
    const withoutRuntimeStatements = stripTopLevelRuntimeStatements(segment);
    const withNormalizedMath = normalizeLegacyMath(withoutRuntimeStatements);
    const withNormalizedTags = normalizeCustomTags(withNormalizedMath);
    const withAdmonitions = rewriteAdmonitions(withNormalizedTags);
    const withWikiImages = rewriteWikiImages(withAdmonitions, note);
    const withMarkdownImages = rewriteMarkdownImages(withWikiImages, note);
    const withWikiLinks = rewriteWikiLinks(withMarkdownImages, titleLookup);
    const withMarkdownLinks = rewriteMarkdownLinks(withWikiLinks, titleLookup);
    return rewriteTabItemContent(withMarkdownLinks);
  }).trim();
}

function stripCodeBlocks(content: string): string {
  return content.replace(CODE_BLOCK_RE, "");
}

export function extractOutboundLinks(
  note: SourceNoteBase,
  titleLookup: Map<string, string>
): string[] {
  const links = new Set<string>();
  const transformed = stripCodeBlocks(note.content);

  for (const match of transformed.matchAll(WIKI_LINK_RE)) {
    const target = match[1];
    if (!target) {
      continue;
    }
    const slug = resolveReferenceSlug(target, titleLookup);
    if (slug && slug !== note.slug) {
      links.add(slug);
    }
  }

  for (const match of transformed.matchAll(MARKDOWN_LINK_RE)) {
    const href = match[2];
    if (!href) {
      continue;
    }
    const slug = resolveReferenceSlug(href, titleLookup);
    if (slug && slug !== note.slug) {
      links.add(slug);
    }
  }

  return Array.from(links);
}

export function generateExcerpt(content: string, maxLength = 280): string {
  const plainText = content
    .replace(TRUNCATE_COMMENT_RE, "")
    .replace(WIKI_IMAGE_RE, "")
    .replace(WIKI_LINK_RE, (_, target: string, label: string | undefined) => {
      return label?.trim() || target.trim();
    })
    .replace(MARKDOWN_IMAGE_RE, "")
    .replace(MARKDOWN_LINK_RE, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  const truncated = plainText.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated}...`;
}
