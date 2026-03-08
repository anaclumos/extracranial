import { cn } from "@/lib/utils"

interface PaneSpineProps {
  index: number
  title: string
  description?: string
  showIndex?: boolean
  className?: string
}

export function PaneSpine({
  index,
  title,
  description,
  showIndex = true,
  className,
}: PaneSpineProps) {
  return (
    <div
      className={cn(
        "group/spine absolute top-0 bottom-0 left-0 z-sticky flex w-pane-spine flex-col items-center gap-6 border-border/50 border-r bg-card/80 py-4 backdrop-blur-md",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="flex flex-col items-center gap-1 opacity-50 grayscale transition-all duration-300 group-hover/spine:opacity-100 group-hover/spine:grayscale-0"
      >
        <div className="h-6 w-1.5 rounded-sm bg-foreground/90" />
        <div className="h-6 w-1.5 rounded-sm bg-foreground/50" />
        <div className="h-6 w-1.5 rounded-sm bg-foreground/20" />
      </div>

      {showIndex && (
        <span className="font-medium font-mono text-[10px] text-muted-foreground/50">
          {index < 10 ? `0${index}` : index}
        </span>
      )}

      <div className="relative flex w-full flex-1 items-start justify-center overflow-hidden pt-2">
        <div
          className="absolute flex items-center gap-2"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "sideways",
          }}
        >
          <span className="whitespace-nowrap font-medium text-foreground text-sm tracking-wide">
            {title}
          </span>
          {description && (
            <span className="whitespace-nowrap text-muted-foreground/50 text-xs">
              {description}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
