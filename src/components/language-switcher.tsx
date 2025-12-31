"use client";

import { GlobeIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const otherLocale = locale === "en" ? "ko" : "en";
	const label = locale === "en" ? "한국어" : "English";

	function handleSwitch() {
		router.replace(pathname, { locale: otherLocale });
	}

	return (
		<Button className="gap-2" onClick={handleSwitch} size="sm" variant="ghost">
			<GlobeIcon className="size-4" />
			<span className="hidden sm:inline">{label}</span>
		</Button>
	);
}
