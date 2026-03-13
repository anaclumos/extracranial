import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

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
  optimizeDeps: {
    exclude: ["@resvg/resvg-js", "@resvg/resvg-js-darwin-arm64"],
  },
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ["motion", "motion-plus"],
  },
  plugins: [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      srcDirectory: "src",
      router: {
        routesDirectory: "routes",
      },
      prerender: {
        enabled: true,
        crawlLinks: true,
        concurrency: 16,
        failOnError: true,
        maxRedirects: 5,
      },
      pages: [{ path: "/000000", prerender: { enabled: true } }],
    }),
    viteReact(),
  ],
});
