interface SpotifySongProps {
	url: string;
}

export function SpotifySong({ url }: SpotifySongProps) {
	const embedUrl = url.replace("open.spotify.com", "open.spotify.com/embed");

	return (
		<div className="my-6">
			<iframe
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				className="w-full rounded-lg"
				height="152"
				loading="lazy"
				src={embedUrl}
				title="Spotify"
			/>
		</div>
	);
}
