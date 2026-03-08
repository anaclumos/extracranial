import { Spinner } from "@/components/ui/spinner"

export function PageSkeleton() {
  return (
    <div className="flex flex-1 items-center justify-center bg-muted">
      <Spinner size="lg" />
    </div>
  )
}
