import type { ReactNode } from "react";

interface DisplayFlexProps {
	children: ReactNode;
}

export function DisplayFlex({ children }: DisplayFlexProps) {
	return (
		<div className="my-6 flex flex-wrap items-center justify-center gap-4">
			{children}
		</div>
	);
}

export function Horizontal({ children }: DisplayFlexProps) {
	return <DisplayFlex>{children}</DisplayFlex>;
}
