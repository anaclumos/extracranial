"use client";

import { useMDXComponent } from "@content-collections/mdx/react";

const Callout = ({
	children,
	title,
	type,
}: {
	children: React.ReactNode;
	title?: string;
	type?: string;
}) => {
	const colors: Record<string, string> = {
		info: "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
		warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30",
		tip: "border-green-500 bg-green-50 dark:bg-green-950/30",
		danger: "border-red-500 bg-red-50 dark:bg-red-950/30",
	};
	const colorClass = colors[type || "info"] || colors.info;
	return (
		<div className={`my-4 rounded-lg border-l-4 p-4 ${colorClass}`}>
			{title && <div className="mb-2 font-semibold">{title}</div>}
			<div>{children}</div>
		</div>
	);
};

const DisplayFlex = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-wrap gap-4">{children}</div>
);

const Horizontal = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-wrap gap-4">{children}</div>
);

const YouTube = ({ id }: { id: string }) => (
	<div className="relative my-4 aspect-video overflow-hidden rounded-lg">
		<iframe
			allowFullScreen
			className="absolute inset-0 h-full w-full"
			src={`https://www.youtube.com/embed/${id}`}
			title="YouTube video"
		/>
	</div>
);

const Shuffle = ({ children }: { children: React.ReactNode }) => (
	<div>{children}</div>
);
const WIP = () => (
	<div className="my-4 rounded-lg bg-yellow-100 p-4 dark:bg-yellow-900/30">
		Work in progress
	</div>
);
const SpotifySong = () => null;
const AppleMusicSong = () => null;
const Accordion = ({ children }: { children: React.ReactNode }) => (
	<details className="my-2">{children}</details>
);
const Accordions = ({ children }: { children: React.ReactNode }) => (
	<div>{children}</div>
);

const components = {
	Accordion,
	Accordions,
	Admonition: Callout,
	AppleMusicSong,
	Callout,
	DisplayFlex,
	Horizontal,
	Shuffle,
	SpotifySong,
	WIP,
	YouTube,
};

export function MDXContent({ code }: { code: string }) {
	const Component = useMDXComponent(code);
	return <Component components={components} />;
}
