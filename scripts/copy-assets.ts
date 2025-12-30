import { cpSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PUBLIC_ASSETS = join(ROOT, "public", "assets");

// Clean and recreate
rmSync(PUBLIC_ASSETS, { recursive: true, force: true });
mkdirSync(PUBLIC_ASSETS, { recursive: true });

// Copy research assets
cpSync(join(ROOT, "contents", "research", "assets"), PUBLIC_ASSETS, {
	recursive: true,
});

// Copy blog assets (each blog folder may have images)
cpSync(join(ROOT, "contents", "blog"), join(PUBLIC_ASSETS, "blog"), {
	recursive: true,
	filter: (src) => {
		// Only copy image/media files, not .md files
		if (src.endsWith(".md")) return false;
		return true;
	},
});

console.log("Assets copied to public/assets/");
