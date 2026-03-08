"use client"

import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export function Heading({
  children,
  className,
  ...props
}: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "text-balance text-5xl/12 tracking-tight sm:text-[5rem]/20",
        "text-neutral-950",
        "dark:bg-gradient-to-br dark:from-white dark:via-white dark:to-neutral-400 dark:bg-clip-text dark:text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function Subheading({
  children,
  className,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "text-pretty text-[2rem]/10 tracking-tight sm:text-5xl/14",
        "text-neutral-950",
        "dark:bg-gradient-to-br dark:from-white dark:via-white dark:to-neutral-400 dark:bg-clip-text dark:text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function Eyebrow({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "font-semibold text-sm/7",
        "text-neutral-700 dark:text-neutral-400",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Text({
  children,
  className,
  size = "md",
  ...props
}: ComponentProps<"div"> & { size?: "md" | "lg" }) {
  return (
    <div
      className={cn(
        size === "md" && "text-base/7",
        size === "lg" && "text-lg/8",
        "text-neutral-700 dark:text-neutral-400",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
