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
  settings: {
    appearance: "Appearance",
    appearanceDescription: "Pick the note view you want to read in.",
    blogOnly: "Blog only",
    blogOnlyDescription: "Filter the all notes list down to blog posts.",
    blogOnlyToggle: "Show blog posts only",
    close: "Done",
    description: "Adjust how the notes workspace looks and filters.",
    language: "Language",
    languageAll: "All",
    languageDescription: "Limit the notes list to a specific writing language.",
    languageEnglish: "English",
    languageKorean: "Korean",
    open: "Settings",
    title: "Workspace settings",
  },
  theme: {
    dark: "Dark",
    light: "Light",
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

const translate: TranslationFunction = (key, values) => {
  const message = getNestedMessage(messages, key);

  if (typeof message !== "string") {
    return key;
  }

  return formatMessage(message, values);
};

const i18nContextValue: I18nContextValue = {
  messages,
  t: translate,
};

export function I18nProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <I18nContext.Provider value={i18nContextValue}>
      {children}
    </I18nContext.Provider>
  );
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
