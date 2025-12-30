import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
	return intlMiddleware(request);
}

export const config = {
	matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/"],
};
