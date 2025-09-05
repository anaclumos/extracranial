export default function YouTube({ id }: { id: string }) {
  return <iframe className="aspect-video w-full" src={`https://www.youtube.com/embed/${id}`} allowFullScreen />
}
