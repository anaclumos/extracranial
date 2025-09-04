import Image from 'next/image'

const Figure = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => {
  return (
    <figure>
      <Image src={src} alt={alt} />
      <figcaption className="text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  )
}

export default Figure
