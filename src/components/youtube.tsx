export default function YouTube({ id }: { id: string }) {
  return <iframe src={`https://www.youtube.com/embed/${id}`} allowFullScreen />
}
