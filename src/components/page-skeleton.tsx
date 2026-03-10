import { PaneSkeleton } from "@/components/pane/pane-skeleton";

export function PageSkeleton() {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden bg-background">
      <PaneSkeleton />
      <PaneSkeleton collapsed />
    </div>
  );
}
