import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
	title: "Extracranial",
	description:
		"The Exosuit for Superbrains - A personal wiki and digital garden",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="bg-background text-foreground">
				<div className="grid min-h-screen grid-rows-[auto_1fr]">
					<Header />
					{children}
				</div>
				<Analytics />
			</body>
		</html>
	);
}
