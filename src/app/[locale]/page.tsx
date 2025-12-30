import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { routing } from "@/i18n/routing";

type Props = {
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const prefix = locale === "en" ? "" : `/${locale}`;

	return (
		<div className="mx-auto max-w-3xl px-4 py-16">
			<h1 className="mb-4 font-bold text-4xl tracking-tight">Extracranial</h1>
			<p className="mb-8 text-lg text-muted-foreground">
				{locale === "ko"
					? "슈퍼브레인을 위한 엑소수트 - 개인 위키와 디지털 정원."
					: "The Exosuit for Superbrains - A personal wiki and digital garden."}
			</p>
			<div className="flex gap-4">
				<Button render={<Link href={`${prefix}/r/000000`} />}>
					{locale === "ko" ? "연구 노트" : "Research Notes"}
				</Button>
				<Button render={<Link href={`${prefix}/w`} />} variant="outline">
					{locale === "ko" ? "블로그" : "Blog"}
				</Button>
			</div>
		</div>
	);
}
