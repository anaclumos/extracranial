"use client";

import type { DiagramPlugin } from "streamdown";

const MERMAID_CDN_URL =
  "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

type MermaidConfig = Record<string, unknown>;

const defaultConfig: MermaidConfig = {
  fontFamily: "monospace",
  securityLevel: "strict",
  startOnLoad: false,
  suppressErrorRendering: true,
  theme: "default",
};
interface MermaidModule {
  default: {
    initialize: (config: MermaidConfig) => void;
    render: (id: string, source: string) => Promise<{ svg: string }>;
  };
}

let mermaidModulePromise: Promise<MermaidModule["default"]> | null = null;

function getMermaidModule() {
  if (!mermaidModulePromise) {
    mermaidModulePromise = import(
      /* @vite-ignore */
      MERMAID_CDN_URL
    ).then((module) => module.default);
  }

  return mermaidModulePromise;
}

export function createMermaidPlugin(
  options: { config?: MermaidConfig } = {}
): DiagramPlugin {
  let initialized = false;
  let config = { ...defaultConfig, ...options.config };

  return {
    language: "mermaid",
    name: "mermaid",
    type: "diagram",
    getMermaid(nextConfig) {
      if (nextConfig) {
        config = { ...defaultConfig, ...options.config, ...nextConfig };
      }

      return {
        initialize(update) {
          config = { ...defaultConfig, ...options.config, ...update };
          initialized = false;
        },
        async render(id, source) {
          const mermaid = await getMermaidModule();

          if (!initialized) {
            mermaid.initialize(config);
            initialized = true;
          }

          return mermaid.render(id, source);
        },
      };
    },
  };
}

export const mermaidPlugin = createMermaidPlugin();
