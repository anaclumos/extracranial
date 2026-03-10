import { createContext, type ReactNode, useContext } from "react";

interface MessageDictionary {
  [key: string]: string | MessageDictionary;
}
type TranslationValues = Record<string, string | number>;
type TranslationFunction = (key: string, values?: TranslationValues) => string;

const messages: MessageDictionary = {
  allNotes: {
    blogOnly: "Blog",
    blogOnlyToggle: "Show blog posts only",
    currentlyOpen: "Currently Open at Position {position}",
    noteCount: "{count} Notes",
    title: "All Notes",
  },
  backlinks: {
    plural: "{count} Notes Link Here",
    singular: "{count} Notes Link Here",
  },
  common: {
    close: "Close",
    loading: "Loading Research...",
    opensInNewTab: "Opens in a New Tab",
    remove: "Remove",
  },
  notePane: {
    closeNote: "Close {title}",
    editOnGitHub: "Edit on GitHub",
    expand: "Expand Workspace",
    expandNote: "Explore {title}",
  },
  theme: {
    dark: "Dark",
    light: "Light",
    system: "System",
    toggle: "Change Theme",
  },
  mobileCarousel: {
    goToNote: "Go to Note {position}: {title}",
  },
};

interface I18nContextValue {
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
  const value: I18nContextValue = {
    messages,
    t: (key, values) => {
      const message = getNestedMessage(messages, key);

      if (typeof message !== "string") {
        return key;
      }

      return formatMessage(message, values);
    },
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18nContext() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("I18nProvider is required before calling i18n hooks");
  }

  return context;
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
