interface AppleMusicSongProps {
	url: string;
}

export function AppleMusicSong({ url }: AppleMusicSongProps) {
	return (
		<div className="my-6">
			<iframe
				allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
				className="w-full overflow-hidden rounded-lg bg-transparent"
				height="175"
				sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
				src={url}
				title="Apple Music"
			/>
		</div>
	);
}
