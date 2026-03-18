import { createBundledHighlighter } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import type { CodeHighlighterPlugin, ThemeInput } from "streamdown";

const defaultThemes = ["github-light", "github-dark"] as const;
type SupportedTheme = (typeof defaultThemes)[number];
const lineSplitRe = /\r?\n/;

interface HighlightResult {
  bg?: string;
  fg?: string;
  rootStyle?: string | false;
  tokens: Array<
    Array<{
      bgColor?: string;
      color?: string;
      content: string;
      htmlAttrs?: Record<string, string>;
      htmlStyle?: Record<string, string>;
      offset?: number;
    }>
  >;
}

const languageLoaders = {
  bash: () => import("@shikijs/langs/bash"),
  c: () => import("@shikijs/langs/c"),
  css: () => import("@shikijs/langs/css"),
  handlebars: () => import("@shikijs/langs/handlebars"),
  html: () => import("@shikijs/langs/html"),
  javascript: () => import("@shikijs/langs/javascript"),
  json: () => import("@shikijs/langs/json"),
  jsx: () => import("@shikijs/langs/jsx"),
  latex: () => import("@shikijs/langs/latex"),
  markdown: () => import("@shikijs/langs/markdown"),
  mdx: () => import("@shikijs/langs/mdx"),
  nix: () => import("@shikijs/langs/nix"),
  python: () => import("@shikijs/langs/python"),
  swift: () => import("@shikijs/langs/swift"),
  tsx: () => import("@shikijs/langs/tsx"),
  typescript: () => import("@shikijs/langs/typescript"),
  xml: () => import("@shikijs/langs/xml"),
  yaml: () => import("@shikijs/langs/yaml"),
} as const;

type SupportedLanguage = keyof typeof languageLoaders;

const languageAliases: Record<string, SupportedLanguage> = {
  bash: "bash",
  c: "c",
  "c++": "c",
  cpp: "c",
  css: "css",
  hbs: "handlebars",
  html: "html",
  js: "javascript",
  json: "json",
  json5: "json",
  jsonc: "json",
  jsx: "jsx",
  md: "markdown",
  markdown: "markdown",
  mdx: "mdx",
  nix: "nix",
  py: "python",
  python: "python",
  sh: "bash",
  shell: "bash",
  shellscript: "bash",
  swift: "swift",
  tex: "latex",
  ts: "typescript",
  tsx: "tsx",
  typescript: "typescript",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml",
  zsh: "bash",
};

const themeLoaders = {
  "github-dark": () => import("@shikijs/themes/github-dark"),
  "github-light": () => import("@shikijs/themes/github-light"),
} as const;

const supportedLanguages = new Set<SupportedLanguage>(
  Object.keys(languageLoaders) as SupportedLanguage[],
);
const supportedThemes = new Set<SupportedTheme>(defaultThemes);

const createHighlighter = createBundledHighlighter({
  engine: () => createJavaScriptRegexEngine({ forgiving: true }),
  langs: languageLoaders,
  themes: themeLoaders,
});

const highlighterCache = new Map<string, ReturnType<typeof createHighlighter>>();
const highlightResultCache = new Map<string, HighlightResult>();
const pendingCallbacks = new Map<string, Set<(result: HighlightResult) => void>>();

function normalizeLanguage(language: string): SupportedLanguage | null {
  const normalized = language.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  return languageAliases[normalized] ?? null;
}

function normalizeThemes(themes: [ThemeInput, ThemeInput]): [SupportedTheme, SupportedTheme] {
  const [lightTheme, darkTheme] = themes;

  const resolvedLightTheme =
    typeof lightTheme === "string" && supportedThemes.has(lightTheme as SupportedTheme)
      ? (lightTheme as SupportedTheme)
      : defaultThemes[0];
  const resolvedDarkTheme =
    typeof darkTheme === "string" && supportedThemes.has(darkTheme as SupportedTheme)
      ? (darkTheme as SupportedTheme)
      : defaultThemes[1];

  return [resolvedLightTheme, resolvedDarkTheme];
}

function getHighlighter(language: SupportedLanguage, themes: [SupportedTheme, SupportedTheme]) {
  const cacheKey = `${language}:${themes[0]}:${themes[1]}`;
  const cachedHighlighter = highlighterCache.get(cacheKey);
  if (cachedHighlighter) {
    return cachedHighlighter;
  }

  const highlighterPromise = createHighlighter({
    langs: [language],
    themes: [...themes],
  });

  highlighterCache.set(cacheKey, highlighterPromise);
  return highlighterPromise;
}

function createPlainTextResult(code: string): HighlightResult {
  const lines = code.length === 0 ? [""] : code.split(lineSplitRe);

  return {
    tokens: lines.map((line) => [
      {
        bgColor: "transparent",
        color: "inherit",
        content: line,
        htmlStyle: {},
        offset: 0,
      },
    ]),
  };
}

function createHighlightCacheKey(
  code: string,
  language: SupportedLanguage,
  themes: [SupportedTheme, SupportedTheme],
) {
  const prefix = code.slice(0, 120);
  const suffix = code.length > 120 ? code.slice(-120) : "";
  return `${language}:${themes[0]}:${themes[1]}:${code.length}:${prefix}:${suffix}`;
}

function notifyPendingCallbacks(cacheKey: string, result: HighlightResult) {
  const callbacks = pendingCallbacks.get(cacheKey);
  if (!callbacks) {
    return;
  }

  pendingCallbacks.delete(cacheKey);
  for (const callback of callbacks) {
    callback(result);
  }
}

export const codePlugin: CodeHighlighterPlugin = {
  name: "shiki",
  type: "code-highlighter",
  getSupportedLanguages: () => Array.from(supportedLanguages),
  getThemes: () => [...defaultThemes],
  supportsLanguage: (language) => normalizeLanguage(language) !== null,
  highlight: ({ code, language, themes }, callback) => {
    const normalizedLanguage = normalizeLanguage(language);
    if (!normalizedLanguage) {
      return createPlainTextResult(code);
    }

    const normalizedThemes = normalizeThemes(themes);
    const cacheKey = createHighlightCacheKey(code, normalizedLanguage, normalizedThemes);
    const cachedResult = highlightResultCache.get(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    if (callback) {
      const callbacks = pendingCallbacks.get(cacheKey) ?? new Set();
      callbacks.add(callback);
      pendingCallbacks.set(cacheKey, callbacks);
    }

    getHighlighter(normalizedLanguage, normalizedThemes)
      .then(
        (highlighter) =>
          highlighter.codeToTokens(code, {
            lang: normalizedLanguage,
            themes: {
              dark: normalizedThemes[1],
              light: normalizedThemes[0],
            },
          }) as HighlightResult,
      )
      .catch(() => createPlainTextResult(code))
      .then((result) => {
        highlightResultCache.set(cacheKey, result);
        notifyPendingCallbacks(cacheKey, result);
      });

    return null;
  },
};
