interface YouTubeProps {
	id: string;
}

export function YouTube({ id }: YouTubeProps) {
	return (
		<div className="relative my-6 aspect-video">
			<iframe
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				className="absolute inset-0 h-full w-full rounded-lg"
				src={`https://www.youtube.com/embed/${id}`}
				title="YouTube video player"
			/>
		</div>
	);
}
