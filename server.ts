/// <reference types="@types/bun" />
import path from "node:path";

const PORT = Number(process.env.PORT ?? 3000);
const CLIENT_DIR = "./dist/client";
const SERVER_ENTRY = "./dist/server/server.js";

const serverModule = await import(SERVER_ENTRY);
const handler = serverModule.default;

const routes: Record<string, (req: Request) => Response | Promise<Response>> =
  {};
const glob = new Bun.Glob("**/*");
for await (const relativePath of glob.scan({ cwd: CLIENT_DIR })) {
  const filepath = path.join(CLIENT_DIR, relativePath);
  const route = `/${relativePath}`;
  const isHashed = /[-.][\da-f]{8,}\.\w+$/.test(relativePath);
  routes[route] = () => {
    return new Response(Bun.file(filepath), {
      headers: isHashed
        ? { "Cache-Control": "public, max-age=31536000, immutable" }
        : { "Cache-Control": "public, max-age=3600" },
    });
  };
}

Bun.serve({
  port: PORT,
  routes: {
    ...routes,
    "/*": (req: Request) => handler.fetch(req),
  },
});

console.log(`Server listening on port ${PORT}`);
