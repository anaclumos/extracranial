import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

function getManualChunk(id: string) {
  if (id.includes("node_modules/streamdown/dist/mermaid-")) {
    return "streamdown-mermaid";
  }

  if (
    (id.includes("node_modules/remark-") &&
      !id.includes("node_modules/remark-rehype")) ||
    id.includes("node_modules/mdast-") ||
    id.includes("node_modules/micromark") ||
    id.includes("node_modules/unified/") ||
    id.includes("node_modules/unist-") ||
    id.includes("node_modules/vfile/") ||
    id.includes("node_modules/remend/")
  ) {
    return "streamdown-remark";
  }

  if (
    id.includes("node_modules/property-information/") ||
    id.includes("node_modules/html-url-attributes/")
  ) {
    return "streamdown-dom";
  }

  if (
    id.includes("node_modules/remark-rehype") ||
    id.includes("node_modules/rehype-") ||
    id.includes("node_modules/hast-")
  ) {
    return "streamdown-rehype";
  }

  if (id.includes("node_modules/streamdown/dist")) {
    return "streamdown-core";
  }

  if (
    id.includes("node_modules/cytoscape") ||
    id.includes("node_modules/cytoscape-cose-bilkent") ||
    id.includes("node_modules/cytoscape-fcose")
  ) {
    return "mermaid-cytoscape";
  }

  if (id.includes("node_modules/dagre-d3-es")) {
    return "mermaid-dagre";
  }

  if (id.includes("node_modules/d3/") || id.includes("node_modules/d3-")) {
    return "mermaid-d3";
  }

  if (id.includes("node_modules/@mermaid-js/parser")) {
    return "mermaid-parser";
  }

  if (id.includes("node_modules/mermaid/")) {
    return "mermaid-runtime";
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
    }),
    viteReact(),
  ],
});
