import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite-plus";

function getManualChunk(id: string) {
  if (id.includes("node_modules/streamdown/dist/mermaid-")) {
    return "streamdown-mermaid";
  }

  if (id.includes("node_modules/remend/")) {
    return "streamdown-remend";
  }

  if (id.includes("node_modules/streamdown/dist")) {
    return "streamdown-core";
  }

  return undefined;
}

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: getManualChunk,
      },
    },
  },
  fmt: {
    ignorePatterns: [
      "library/**",
      "public/content-assets/**",
      "public/og/**",
      ".output/**",
      "dist/**",
    ],
  },
  optimizeDeps: {
    exclude: ["@resvg/resvg-js", "@resvg/resvg-js-darwin-arm64"],
  },
  lint: {
    ignorePatterns: ["scripts/**", ".output/**", "dist/**"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ["motion", "motion-plus"],
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: "src",
      router: {
        routesDirectory: "routes",
      },
      pages: [{ path: "/000000" }],
      prerender: {
        enabled: true,
        crawlLinks: true,
        concurrency: 16,
        failOnError: false,
        maxRedirects: 5,
      },
    }),
    nitro(),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
});
