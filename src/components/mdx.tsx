"use client";

import { useMDXComponent } from "@content-collections/mdx/react";
import mermaid from "mermaid";
import { Children, isValidElement, useEffect, useId, useState } from "react";
import { KoreaNetherlandsGlobe } from "@/components/mdx/korea-netherlands-globe";
import {
	AccordionItem,
	AccordionPanel,
	Accordion as AccordionRoot,
	AccordionTrigger,
} from "@/components/ui/accordion";

// Initialize mermaid
mermaid.initialize({
	startOnLoad: false,
	theme: "neutral",
	securityLevel: "loose",
});

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

const Mermaid = ({ chart }: { chart: string }) => {
	const id = useId().replace(/:/g, "");
	const [svg, setSvg] = useState<string>("");

	useEffect(() => {
		const render = async () => {
			try {
				const { svg: renderedSvg } = await mermaid.render(
					`mermaid-${id}`,
					chart
				);
				setSvg(renderedSvg);
			} catch {
				setSvg(`<pre>${chart}</pre>`);
			}
		};
		render();
	}, [chart, id]);

	return (
		<div
			className="my-4 flex justify-center overflow-x-auto"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: mermaid renders SVG
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
};

// Handle mermaid code blocks from markdown
const Pre = ({
	children,
	...props
}: React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLPreElement>,
	HTMLPreElement
>) => {
	// Check if this is a mermaid code block
	if (
		isValidElement<{ className?: string; children?: React.ReactNode }>(
			children
		) &&
		children.props.className === "language-mermaid"
	) {
		const code =
			typeof children.props.children === "string"
				? children.props.children
				: "";
		return <Mermaid chart={code.trim()} />;
	}
	return <pre {...props}>{children}</pre>;
};

// Custom details/summary components using coss/ui Accordion
const Details = ({ children }: { children: React.ReactNode }) => {
	let summaryContent: React.ReactNode = null;
	const otherChildren: React.ReactNode[] = [];

	Children.forEach(children, (child) => {
		if (
			isValidElement<{ children: React.ReactNode }>(child) &&
			child.type === Summary
		) {
			summaryContent = child.props.children;
		} else {
			otherChildren.push(child);
		}
	});

	return (
		<AccordionRoot className="my-2">
			<AccordionItem value="item">
				<AccordionTrigger>{summaryContent}</AccordionTrigger>
				<AccordionPanel>{otherChildren}</AccordionPanel>
			</AccordionItem>
		</AccordionRoot>
	);
};

const Summary = ({ children }: { children: React.ReactNode }) => {
	// This component is extracted by Details, so it doesn't render directly
	return <>{children}</>;
};

const Accordion = ({
	children,
	title,
}: {
	children: React.ReactNode;
	title?: string;
}) => {
	// If title prop is provided, use it directly instead of extracting from children
	if (title) {
		return (
			<AccordionRoot className="my-2">
				<AccordionItem value="item">
					<AccordionTrigger>{title}</AccordionTrigger>
					<AccordionPanel>{children}</AccordionPanel>
				</AccordionItem>
			</AccordionRoot>
		);
	}
	// Fallback to Details behavior for Summary child extraction
	return <Details>{children}</Details>;
};
const Accordions = ({ children }: { children: React.ReactNode }) => (
	<div className="space-y-2">{children}</div>
);

const components = {
	Accordion,
	Accordions,
	Admonition: Callout,
	AppleMusicSong,
	Callout,
	Details,
	DisplayFlex,
	Horizontal,
	KoreaNetherlandsGlobe,
	Mermaid,
	pre: Pre,
	Shuffle,
	SpotifySong,
	Summary,
	WIP,
	YouTube,
};

export function MDXContent({ code }: { code: string }) {
	const Component = useMDXComponent(code);
	return <Component components={components} />;
}
