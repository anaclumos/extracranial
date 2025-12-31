import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
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
				<div className="grid h-screen grid-rows-[auto_1fr] overflow-hidden">
					{children}
				</div>
				<Analytics />
			</body>
		</html>
	);
}
