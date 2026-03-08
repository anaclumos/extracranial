import { cn } from "@/lib/utils"

interface AmbientGradientProps {
  position?: "top-right" | "bottom-left" | "center"
  color?: "white" | "blue"
  className?: string
}

export function AmbientGradient({
  position = "top-right",
  color = "white",
  className,
}: AmbientGradientProps) {
  const positionStyles = {
    "top-right": "-top-[300px] -right-[100px]",
    "bottom-left": "-bottom-[300px] -left-[100px]",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  }

  const colorStyles = {
    white: "rgba(255,255,255,0.03)",
    blue: "rgba(59, 130, 246, 0.05)",
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-[800px] w-[800px] select-none",
        "opacity-0 transition-opacity duration-1000 dark:opacity-100",
        positionStyles[position],
        className
      )}
      style={{
        background: `radial-gradient(circle, ${colorStyles[color]} 0%, transparent 70%)`,
        filter: "blur(80px)",
      }}
    />
  )
}
