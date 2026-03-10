import {
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { defaultLocale, isLocale, type Locale } from "./routing";

function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "/";
  }

  if (isLocale(segments[0])) {
    const withoutLocale = segments.slice(1);
    return withoutLocale.length > 0 ? `/${withoutLocale.join("/")}` : "/";
  }

  return pathname;
}

export function buildLocalePathname(pathname: string, locale: Locale): string {
  const basePath = stripLocalePrefix(pathname);

  if (locale === defaultLocale) {
    return basePath;
  }

  return basePath === "/" ? `/${locale}/` : `/${locale}${basePath}`;
}

export function usePathname(): string {
  return useLocation({ select: (location) => location.pathname });
}

export function useLocaleNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const switchLocale = (locale: Locale) => {
    navigate({
      to: buildLocalePathname(location.pathname, locale),
      search: (prev) => prev,
      replace: true,
    });
  };

  return {
    pathname: location.pathname,
    switchLocale,
  };
}

export const Link = RouterLink;
