import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import { routing } from "@/i18n/routing";

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;

	if (!routing.locales.includes(locale as "en" | "ko")) {
		notFound();
	}

	setRequestLocale(locale);
	const messages = await getMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			<Header>
				<MobileNav locale={locale as "en" | "ko"} />
			</Header>
			<div className="flex min-h-0 flex-1 overflow-hidden">
				<Sidebar locale={locale as "en" | "ko"} />
				<main className="flex min-h-0 flex-1 overflow-hidden">{children}</main>
			</div>
		</NextIntlClientProvider>
	);
}
