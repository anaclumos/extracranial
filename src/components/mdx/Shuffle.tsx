import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface ShuffleProps {
	children: ReactNode;
}

export function Shuffle({ children }: ShuffleProps) {
	const [shuffledChildren, setShuffledChildren] = useState<ReactNode[]>([]);

	useEffect(() => {
		const childArray = Array.isArray(children) ? children : [children];
		const shuffled = [...childArray].sort(() => Math.random() - 0.5);
		setShuffledChildren(shuffled);
	}, [children]);

	return <div>{shuffledChildren}</div>;
}
