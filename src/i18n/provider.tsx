import { useRouterState } from "@tanstack/react-router";
import { createContext, type ReactNode, useContext, useMemo } from "react";
import enMessages from "../../messages/en.json";
import koMessages from "../../messages/ko.json";
import { getLocaleFromPathname, type Locale } from "./routing";

interface MessageDictionary {
  [key: string]: string | MessageDictionary;
}
type TranslationValues = Record<string, string | number>;
type TranslationFunction = (key: string, values?: TranslationValues) => string;

const messagesByLocale: Record<Locale, MessageDictionary> = {
  en: enMessages as MessageDictionary,
  ko: koMessages as MessageDictionary,
};

interface I18nContextValue {
  locale: Locale;
  messages: MessageDictionary;
  t: TranslationFunction;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedMessage(
  messages: MessageDictionary,
  key: string
): string | MessageDictionary | undefined {
  return key
    .split(".")
    .reduce<string | MessageDictionary | undefined>((current, segment) => {
      if (!current || typeof current === "string") {
        return undefined;
      }

      return current[segment];
    }, messages);
}

function formatMessage(template: string, values?: TranslationValues): string {
  if (!values) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = values[key];
    return value === undefined ? `{${key}}` : String(value);
  });
}

export function I18nProvider({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const value = useMemo<I18nContextValue>(() => {
    const locale = getLocaleFromPathname(pathname);
    const messages = messagesByLocale[locale];

    return {
      locale,
      messages,
      t: (key, values) => {
        const message = getNestedMessage(messages, key);

        if (typeof message !== "string") {
          return key;
        }

        return formatMessage(message, values);
      },
    };
  }, [pathname]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18nContext(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("I18nProvider is required before calling i18n hooks");
  }

  return context;
}

export function useLocale(): Locale {
  return useI18nContext().locale;
}

export function useMessages(): MessageDictionary {
  return useI18nContext().messages;
}

export function useTranslations(namespace?: string): TranslationFunction {
  const { t } = useI18nContext();

  return (key, values) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return t(fullKey, values);
  };
}
