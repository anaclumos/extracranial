"use client";

import { cjk } from "@streamdown/cjk";
import { math } from "@streamdown/math";
import { startTransition, useEffect, useMemo, useState } from "react";
import type { PluginConfig } from "streamdown";

const codeFenceWithLanguageRe =
  /(^|\n)```(?!mermaid\b)([A-Za-z0-9_+.-]+)(?:\s|$)/m;
const mermaidFenceRe = /(^|\n)```mermaid(?:\s|$)/m;

let codePluginPromise: Promise<NonNullable<PluginConfig["code"]>> | null = null;
let mermaidPluginPromise: Promise<NonNullable<PluginConfig["mermaid"]>> | null =
  null;

function loadCodePlugin() {
  if (!codePluginPromise) {
    codePluginPromise = import("@/lib/streamdown/code-plugin").then(
      (module) => module.codePlugin
    );
  }

  return codePluginPromise;
}

function loadMermaidPlugin() {
  if (!mermaidPluginPromise) {
    mermaidPluginPromise = import("@/lib/streamdown/mermaid-plugin").then(
      (module) => module.mermaidPlugin
    );
  }

  return mermaidPluginPromise;
}

function getOptionalPluginNeeds(source: string) {
  return {
    needsCodePlugin: codeFenceWithLanguageRe.test(source),
    needsMermaidPlugin: mermaidFenceRe.test(source),
  };
}

export function useStreamdownPlugins(source: string): PluginConfig {
  const [optionalPlugins, setOptionalPlugins] = useState<
    Pick<PluginConfig, "code" | "mermaid">
  >({});

  const { needsCodePlugin, needsMermaidPlugin } = useMemo(
    () => getOptionalPluginNeeds(source),
    [source]
  );

  useEffect(() => {
    let cancelled = false;
    const loaders: Promise<Partial<Pick<PluginConfig, "code" | "mermaid">>>[] =
      [];

    if (needsCodePlugin && !optionalPlugins.code) {
      loaders.push(
        loadCodePlugin().then((codePlugin) => ({ code: codePlugin }))
      );
    }

    if (needsMermaidPlugin && !optionalPlugins.mermaid) {
      loaders.push(
        loadMermaidPlugin().then((mermaidPlugin) => ({
          mermaid: mermaidPlugin,
        }))
      );
    }

    if (loaders.length === 0) {
      return;
    }

    Promise.all(loaders).then((loadedPlugins) => {
      if (cancelled) {
        return;
      }

      startTransition(() => {
        setOptionalPlugins((currentPlugins) => ({
          ...currentPlugins,
          ...Object.assign({}, ...loadedPlugins),
        }));
      });
    });

    return () => {
      cancelled = true;
    };
  }, [
    needsCodePlugin,
    needsMermaidPlugin,
    optionalPlugins.code,
    optionalPlugins.mermaid,
  ]);

  return useMemo(() => {
    const plugins: PluginConfig = { cjk, math };

    if (needsCodePlugin && optionalPlugins.code) {
      plugins.code = optionalPlugins.code;
    }

    if (needsMermaidPlugin && optionalPlugins.mermaid) {
      plugins.mermaid = optionalPlugins.mermaid;
    }

    return plugins;
  }, [
    needsCodePlugin,
    needsMermaidPlugin,
    optionalPlugins.code,
    optionalPlugins.mermaid,
  ]);
}
