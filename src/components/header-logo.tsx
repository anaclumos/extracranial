"use client"

import { routing } from "@/i18n/routing"
import { Logo } from "@/components/brand/logo"
import { Link, usePathname } from "@/i18n/navigation"

interface HeaderLogoProps {
  brand: string
  brandWithManifesto: string
}

export function HeaderLogo({ brand, brandWithManifesto }: HeaderLogoProps) {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const isNotePath =
    (segments.length === 1 &&
      !routing.locales.includes(segments[0] as (typeof routing.locales)[number]) &&
      /^(?:[A-F0-9]{6}|\d{4}-\d{2}-\d{2})$/i.test(segments[0] ?? "")) ||
    (segments.length === 2 &&
      routing.locales.includes(segments[0] as (typeof routing.locales)[number]) &&
      /^(?:[A-F0-9]{6}|\d{4}-\d{2}-\d{2})$/i.test(segments[1] ?? ""))

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const title = isNotePath ? brandWithManifesto : brand

  return (
    <Link
      className="flex items-center gap-3 transition-opacity hover:opacity-80"
      href="/"
      onClick={handleClick}
    >
      <Logo className="text-foreground" size={20} />
      <span className="font-semibold text-foreground text-lg">{title}</span>
    </Link>
  )
}
