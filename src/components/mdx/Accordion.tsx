import { Accordion } from "@base-ui-components/react/accordion";
import { useState } from "react";

interface AccordionItemProps {
	title: string;
	children: React.ReactNode;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
	return (
		<Accordion.Item className="border-border border-b last:border-b-0">
			<Accordion.Header>
				<Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between py-4 text-left font-medium text-foreground transition-colors hover:text-muted-foreground [&[data-panel-open]>span]:rotate-180">
					{title}
					<span className="text-muted-foreground transition-transform duration-200">
						▼
					</span>
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Panel className="overflow-hidden pb-4 text-foreground transition-all data-[ending-style]:h-0 data-[starting-style]:h-0">
				{children}
			</Accordion.Panel>
		</Accordion.Item>
	);
}

interface AccordionsProps {
	children: React.ReactNode;
}

export function Accordions({ children }: AccordionsProps) {
	const [value, setValue] = useState<number[]>([]);

	return (
		<Accordion.Root
			className="my-4 rounded-lg border border-border px-4"
			onValueChange={setValue}
			value={value}
		>
			{children}
		</Accordion.Root>
	);
}
