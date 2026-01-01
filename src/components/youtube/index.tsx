interface YouTubeProps {
  id: string
}

export default function YouTube({ id }: YouTubeProps) {
  return (
    <figure>
      <iframe
        className="mx-auto my-4 flex aspect-video max-h-[25rem] w-full items-center justify-center rounded-lg border-2 border-[var(--ifm-color-emphasis-200)]"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube"
      />
    </figure>
  )
}
