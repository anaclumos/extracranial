"use client"

import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export function Container({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-7xl lg:px-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
