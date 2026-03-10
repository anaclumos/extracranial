export const locales = ["en", "ko"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales: Locale[] = [];

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

export function isLocale(value: string | undefined): value is Locale {
  if (!value) {
    return false;
  }

  return locales.includes(value as Locale);
}

export function resolveLocale(localeParam: string | undefined): Locale {
  return isLocale(localeParam) ? localeParam : defaultLocale;
}

export function toLocaleParam(locale: Locale): Locale | undefined {
  return locale === defaultLocale ? undefined : locale;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const [firstSegment] = pathname.split("/").filter(Boolean);
  return resolveLocale(firstSegment);
}

export const routing = {
  locales,
  defaultLocale,
  localePrefix: "as-needed",
} as const;
