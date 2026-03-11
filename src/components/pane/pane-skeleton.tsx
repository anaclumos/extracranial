import { cn } from "@/lib/utils";

function ShimmerLine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded bg-muted-foreground/8 dark:bg-muted-foreground/12",
        "animate-skeleton bg-[length:200%_100%] bg-[position:200%_0]",
        "bg-gradient-to-r from-transparent via-muted-foreground/6 to-transparent dark:via-muted-foreground/10",
        className
      )}
    />
  );
}

interface PaneSkeletonProps {
  collapsed?: boolean;
}

export function PaneSkeleton({ collapsed }: PaneSkeletonProps) {
  if (collapsed) {
    return (
      <div className="h-full w-pane-spine flex-shrink-0 border-border/50 border-l bg-card/80">
        <div className="flex h-full flex-col items-center gap-6 py-4">
          <ShimmerLine className="size-5 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col border-border border-l bg-background md:w-1/2 md:max-w-3xl md:min-w-pane-min">
      <header className="px-4 pt-4 pb-2">
        <ShimmerLine className="mb-3 h-8 w-3/4" />
        <ShimmerLine className="h-5 w-1/2" />
      </header>
      <div className="flex-1 px-4 py-3 md:px-8">
        <div className="flex max-w-prose flex-col gap-4">
          <ShimmerLine className="h-4 w-full" />
          <ShimmerLine className="h-4 w-11/12" />
          <ShimmerLine className="h-4 w-4/5" />
          <ShimmerLine className="mt-2 h-4 w-full" />
          <ShimmerLine className="h-4 w-10/12" />
          <ShimmerLine className="h-4 w-3/4" />
          <ShimmerLine className="mt-2 h-4 w-full" />
          <ShimmerLine className="h-4 w-5/6" />
          <ShimmerLine className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}
