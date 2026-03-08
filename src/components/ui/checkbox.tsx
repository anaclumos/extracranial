"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { MinusSignIcon, Tick01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "relative inline-flex size-4.5 shrink-0 items-center justify-center rounded-[4px] border border-input bg-background not-dark:bg-clip-padding shadow-xs/5 outline-none ring-ring transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[3px] not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/6%)] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48 data-disabled:opacity-64 sm:size-4 dark:not-data-checked:bg-input/32 dark:aria-invalid:ring-destructive/24 dark:not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)] [[data-disabled],[data-checked],[aria-invalid]]:shadow-none",
        className
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="absolute -inset-px flex items-center justify-center rounded-[4px] text-primary-foreground data-unchecked:hidden data-checked:bg-primary data-indeterminate:text-foreground"
        data-slot="checkbox-indicator"
        render={(props, state) => (
          <span {...props}>
            {state.indeterminate ? (
              <HugeiconsIcon
                className="size-3.5 sm:size-3"
                icon={MinusSignIcon}
                size={14}
                strokeWidth={2}
              />
            ) : (
              <HugeiconsIcon
                className="size-3.5 sm:size-3"
                icon={Tick01Icon}
                size={14}
                strokeWidth={2}
              />
            )}
          </span>
        )}
      />
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
