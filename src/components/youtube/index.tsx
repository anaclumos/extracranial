interface YouTubeProps {
  id: string
}

export default function YouTube({ id }: YouTubeProps) {
  return (
    <figure>
      <iframe
        className="mx-auto my-4 flex aspect-video max-h-96 w-full items-center justify-center rounded-lg border-2 border-emphasis"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube"
      />
    </figure>
  )
}
