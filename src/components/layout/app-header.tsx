"use client"

import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  LaptopIcon,
  Menu01Icon,
  Moon01Icon,
  Sun01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { useQueryStates } from "nuqs"
import { useEffect, useState } from "react"
import { HeaderLogo } from "@/components/header-logo"
import { LanguageSwitcher, localeNames } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Group, GroupSeparator } from "@/components/ui/group"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname, useRouter } from "@/i18n/navigation"
import { type Locale, routing } from "@/i18n/routing"
import {
  focusParser,
  noteStackParsers,
  stackParser,
} from "@/lib/stores/note-stack-parsers"
import { cn } from "@/lib/utils"

interface AppHeaderProps {
  brand: string
  brandWithManifesto: string
  githubLabel: string
}

const themes = [
  { value: "light", icon: Sun01Icon },
  { value: "dark", icon: Moon01Icon },
  { value: "system", icon: LaptopIcon },
] as const

export function AppHeader({
  brand,
  brandWithManifesto,
  githubLabel,
}: AppHeaderProps) {
  const tLanguage = useTranslations("languageSwitcher")
  const tTheme = useTranslations("theme")
  const tNavigation = useTranslations("navigation")
  const [isMainOpen, setIsMainOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isThemeOpen, setIsThemeOpen] = useState(false)

  // Language Logic
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [urlState] = useQueryStates(noteStackParsers)

  const handleLanguageChange = (value: string) => {
    if (value && value !== locale) {
      const params: string[] = []
      const stackStr = stackParser.serialize(urlState.stack)
      if (stackStr) {
        params.push(`stack=${stackStr}`)
      }
      if (urlState.focus !== null) {
        const focusStr = focusParser.serialize(urlState.focus)
        if (focusStr) {
          params.push(`focus=${focusStr}`)
        }
      }
      const fullPath =
        params.length > 0 ? `${pathname}?${params.join("&")}` : pathname
      router.replace(fullPath, { locale: value as Locale })
    }
    setIsLanguageOpen(false)
    setIsMainOpen(false)
  }

  // Theme Logic
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const resolvedTheme = mounted ? (theme ?? "system") : "system"

  const handleThemeChange = (value: string) => {
    setTheme(value)
    setIsThemeOpen(false)
    setIsMainOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 flex-shrink-0 items-center justify-between border-border border-b bg-card px-6">
      <HeaderLogo brand={brand} brandWithManifesto={brandWithManifesto} />
      <div className="flex items-center gap-2">
        <Group aria-label="Header actions" className="hidden sm:flex">
          <Button
            render={
              <a
                href="https://github.com/anaclumos/extracranial"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  height="18"
                  viewBox="0 0 24 24"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="sr-only">{githubLabel}</span>
              </a>
            }
            size="icon"
            variant="outline"
          />
          <GroupSeparator />
          <LanguageSwitcher />
          <GroupSeparator />
          <ThemeToggle />
        </Group>

        <Sheet onOpenChange={setIsMainOpen} open={isMainOpen}>
          <SheetTrigger
            aria-label={tNavigation("more")}
            className="sm:hidden"
            render={<Button size="icon" variant="outline" />}
          >
            <HugeiconsIcon icon={Menu01Icon} size={18} strokeWidth={1.5} />
          </SheetTrigger>
          <SheetPopup className="sm:hidden" side="bottom">
            <SheetHeader>
              <SheetTitle>{tNavigation("more")}</SheetTitle>
            </SheetHeader>
            <SheetPanel>
              <div className="flex flex-col gap-1">
                <Button
                  className="h-12 w-full justify-start gap-2 px-2 font-normal text-base"
                  render={
                    // biome-ignore lint/a11y/useAnchorContent: Content provided by Button children
                    <a
                      aria-label={githubLabel}
                      href="https://github.com/anaclumos/extracranial"
                      rel="noopener noreferrer"
                      target="_blank"
                    />
                  }
                  variant="ghost"
                >
                  <span>{githubLabel}</span>
                  <HugeiconsIcon
                    className="text-muted-foreground"
                    icon={ArrowUpRight01Icon}
                    size={20}
                    strokeWidth={1.5}
                  />
                </Button>

                <Separator className="my-2" />

                <Button
                  className="h-12 w-full justify-between px-2 font-normal text-base"
                  onClick={() => setIsLanguageOpen(true)}
                  variant="ghost"
                >
                  <span className="flex items-center gap-2">
                    {tLanguage("label")}
                    <span className="text-muted-foreground text-sm">
                      {localeNames[locale as Locale]}
                    </span>
                  </span>
                  <HugeiconsIcon
                    className="text-muted-foreground"
                    icon={ArrowRight01Icon}
                    size={20}
                    strokeWidth={1.5}
                  />
                </Button>

                <Button
                  className="h-12 w-full justify-between px-2 font-normal text-base"
                  onClick={() => setIsThemeOpen(true)}
                  variant="ghost"
                >
                  <span className="flex items-center gap-2">
                    {tTheme("toggle")}
                    <span className="text-muted-foreground text-sm capitalize">
                      {mounted ? tTheme(resolvedTheme) : ""}
                    </span>
                  </span>
                  <HugeiconsIcon
                    className="text-muted-foreground"
                    icon={ArrowRight01Icon}
                    size={20}
                    strokeWidth={1.5}
                  />
                </Button>
              </div>
            </SheetPanel>
          </SheetPopup>
        </Sheet>

        <Sheet onOpenChange={setIsLanguageOpen} open={isLanguageOpen}>
          <SheetPopup
            backdropClassName="bg-transparent"
            className="sm:hidden"
            side="bottom"
          >
            <SheetHeader className="flex-row items-center gap-2 border-b p-4">
              <Button
                className="-ml-2 h-8 w-8"
                onClick={() => setIsLanguageOpen(false)}
                size="icon"
                variant="ghost"
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  size={20}
                  strokeWidth={1.5}
                />
              </Button>
              <SheetTitle className="text-base">
                {tLanguage("selectLanguage")}
              </SheetTitle>
            </SheetHeader>
            <SheetPanel className="pt-2">
              <div className="flex flex-col">
                {routing.locales.map((loc) => (
                  <Button
                    className={cn(
                      "h-12 w-full justify-between px-2 font-normal text-base",
                      loc === locale && "font-medium"
                    )}
                    key={loc}
                    onClick={() => handleLanguageChange(loc)}
                    variant="ghost"
                  >
                    {localeNames[loc]}
                    {loc === locale && (
                      <HugeiconsIcon
                        className="text-primary"
                        icon={Tick01Icon}
                        size={20}
                        strokeWidth={1.5}
                      />
                    )}
                  </Button>
                ))}
              </div>
            </SheetPanel>
          </SheetPopup>
        </Sheet>

        <Sheet onOpenChange={setIsThemeOpen} open={isThemeOpen}>
          <SheetPopup
            backdropClassName="bg-transparent"
            className="sm:hidden"
            side="bottom"
          >
            <SheetHeader className="flex-row items-center gap-2 border-b p-4">
              <Button
                className="-ml-2 h-8 w-8"
                onClick={() => setIsThemeOpen(false)}
                size="icon"
                variant="ghost"
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  size={20}
                  strokeWidth={1.5}
                />
              </Button>
              <SheetTitle className="text-base">{tTheme("toggle")}</SheetTitle>
            </SheetHeader>
            <SheetPanel className="pt-2">
              <div className="flex flex-col">
                {themes.map(({ value, icon: Icon }) => (
                  <Button
                    className={cn(
                      "h-12 w-full justify-between px-2 font-normal text-base",
                      value === resolvedTheme && "font-medium"
                    )}
                    key={value}
                    onClick={() => handleThemeChange(value)}
                    variant="ghost"
                  >
                    <span className="flex items-center gap-3">
                      <HugeiconsIcon icon={Icon} size={20} strokeWidth={1.5} />
                      {tTheme(value)}
                    </span>
                    {value === resolvedTheme && (
                      <HugeiconsIcon
                        className="text-primary"
                        icon={Tick01Icon}
                        size={20}
                        strokeWidth={1.5}
                      />
                    )}
                  </Button>
                ))}
              </div>
            </SheetPanel>
          </SheetPopup>
        </Sheet>
      </div>
    </header>
  )
}
