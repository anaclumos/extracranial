"use client"

import { Logo } from "@/components/brand/logo"
import { Link, usePathname } from "@/i18n/navigation"

interface HeaderLogoProps {
  brand: string
  brandWithManifesto: string
}

export function HeaderLogo({ brand, brandWithManifesto }: HeaderLogoProps) {
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const title = pathname.includes("/library") ? brandWithManifesto : brand

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
