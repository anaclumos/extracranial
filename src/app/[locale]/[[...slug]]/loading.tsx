import { PaneSkeleton } from "@/components/pane/pane-skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden bg-background">
      <PaneSkeleton />
      <PaneSkeleton collapsed />
    </div>
  )
}
