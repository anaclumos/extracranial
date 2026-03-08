"use client"

interface PaneHeaderProps {
  title: string
  description?: string
}

export function PaneHeader({ title, description }: PaneHeaderProps) {
  return (
    <header className="px-4 pt-4 pb-2">
      <h1 className="font-normal text-3xl text-foreground tracking-tight dark:bg-gradient-to-br dark:from-white dark:via-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent">
        {title}
      </h1>
      {description && (
        <p className="mt-2 font-normal text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </header>
  )
}
