import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { type NextRequest, NextResponse } from "next/server";

const MIME_TYPES: Record<string, string> = {
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".webp": "image/webp",
	".svg": "image/svg+xml",
	".ico": "image/x-icon",
	".mp4": "video/mp4",
	".webm": "video/webm",
	".pdf": "application/pdf",
};

function getMimeType(filename: string): string {
	const ext = filename.toLowerCase().match(/\.[^.]+$/)?.[0] || "";
	return MIME_TYPES[ext] || "application/octet-stream";
}

export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> }
) {
	const { path } = await params;

	if (!path || path.length === 0) {
		return new NextResponse("Not Found", { status: 404 });
	}

	const isBlogAsset = path[0] === "blog" && path.length >= 2;

	const filePath = isBlogAsset
		? join(process.cwd(), "contents", "blog", ...path.slice(1))
		: join(process.cwd(), "contents", "research", "assets", ...path);

	try {
		const fileBuffer = await readFile(filePath);
		const mimeType = getMimeType(path[path.length - 1]);

		return new NextResponse(fileBuffer, {
			status: 200,
			headers: {
				"Content-Type": mimeType,
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		});
	} catch {
		return new NextResponse("Not Found", { status: 404 });
	}
}
