import { ImageZoom } from 'fumadocs-ui/components/image-zoom'

const Figure = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => {
  return (
    <figure className="my-4">
      <ImageZoom src={src} alt={alt} />
      {caption ? <figcaption className="mt-2 text-sm text-muted-foreground text-center">{caption}</figcaption> : null}
    </figure>
  )
}

export default Figure
