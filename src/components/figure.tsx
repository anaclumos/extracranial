import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'

type FigureProps = React.ComponentProps<'figure'> & {
  asChild?: boolean
  // Convenience props for simple usage: <Figure src alt caption />
  src?: any
  alt?: string
  caption?: React.ReactNode
  width?: number
  height?: number
}

const FigureRoot = React.forwardRef<HTMLElement, FigureProps>(
  ({ className, asChild, src, alt, caption, width, height, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'figure'

    // If src is provided, render a zoomable image + optional caption
    if (src) {
      return (
        <Comp
          ref={ref as any}
          className={cn('my-4', className)}
          data-slot="figure"
          {...props}
        >
          <ImageZoom src={src} alt={alt ?? ''} width={width} height={height} />
          {caption ? (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {caption}
            </figcaption>
          ) : null}
        </Comp>
      )
    }

    // Otherwise, render children (MDX img is already mapped to ImageZoom)
    return (
      <Comp ref={ref as any} className={cn('my-4', className)} data-slot="figure" {...props}>
        {children}
      </Comp>
    )
  }
)
FigureRoot.displayName = 'Figure'

const FigureCaption = React.forwardRef<HTMLElement, React.ComponentProps<'figcaption'>>(
  ({ className, ...props }, ref) => (
    <figcaption
      ref={ref as any}
      data-slot="figure-caption"
      className={cn('mt-2 text-center text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
FigureCaption.displayName = 'FigureCaption'

const Figure = Object.assign(FigureRoot, { Caption: FigureCaption })

export default Figure
