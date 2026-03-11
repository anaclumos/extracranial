import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

interface PaneSpineProps {
  className?: string;
  description?: string;
  index: number;
  showIndex?: boolean;
  title: string;
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
        className="opacity-50 transition-all duration-300 group-hover/spine:opacity-100"
      >
        <Logo size={20} />
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
  );
}
