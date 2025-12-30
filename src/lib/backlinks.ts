import { allBlogs, allResearch } from "content-collections";

export interface Backlink {
	sourceSlug: string;
	sourceTitle: string;
	excerpt: string;
	type: "research" | "blog";
}

export function getBacklinks(
	targetSlug: string,
	locale: "en" | "ko"
): Backlink[] {
	const backlinks: Backlink[] = [];
	const upperSlug = targetSlug.toUpperCase();

	// Search in research notes
	for (const doc of allResearch) {
		if (doc.lang !== locale) {
			continue;
		}
		for (const link of doc.outgoingLinks) {
			if (link.targetSlug === upperSlug) {
				backlinks.push({
					sourceSlug: doc.slug,
					sourceTitle: doc.title,
					excerpt: link.excerpt,
					type: "research",
				});
				break; // Only add each source once
			}
		}
	}

	// Search in blog posts
	for (const doc of allBlogs) {
		if (doc.lang !== locale) {
			continue;
		}
		for (const link of doc.outgoingLinks) {
			if (link.targetSlug === upperSlug) {
				backlinks.push({
					sourceSlug: doc.slug,
					sourceTitle: doc.title,
					excerpt: link.excerpt,
					type: "blog",
				});
				break;
			}
		}
	}

	return backlinks;
}
