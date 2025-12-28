import type { ReactNode } from "react";

interface CalloutProps {
	type?: "info" | "warning" | "error" | "success";
	title?: string;
	icon?: string;
	children: ReactNode;
}

const typeStyles = {
	info: "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
	warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30",
	error: "border-red-500 bg-red-50 dark:bg-red-950/30",
	success: "border-green-500 bg-green-50 dark:bg-green-950/30",
};

export function Callout({
	type = "info",
	title,
	icon,
	children,
}: CalloutProps) {
	return (
		<div className={`my-6 rounded-lg border-l-4 p-4 ${typeStyles[type]}`}>
			{(icon || title) && (
				<div className="mb-2 flex items-center gap-2 font-semibold">
					{icon && <span>{icon}</span>}
					{title && <span>{title}</span>}
				</div>
			)}
			<div className="prose-sm">{children}</div>
		</div>
	);
}
