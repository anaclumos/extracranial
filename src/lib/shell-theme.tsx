import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  setTheme: (theme: Theme) => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "coscientist-theme";

function resolveStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = localStorage.getItem(STORAGE_KEY);
  return storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
    ? storedTheme
    : "system";
}

function applyTheme(theme: "light" | "dark") {
  const html = document.documentElement;
  if (theme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

function resolveEffectiveTheme(
  theme: Theme,
  prefersDarkTheme: boolean
): "light" | "dark" {
  if (theme === "system") {
    return prefersDarkTheme ? "dark" : "light";
  }

  return theme;
}

export function ShellThemeProvider({ children }: { children: ReactNode }) {
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    setThemeState(resolveStoredTheme());
  }, []);

  useEffect(() => {
    applyTheme(resolveEffectiveTheme(theme, prefersDarkTheme));
  }, [theme, prefersDarkTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useShellTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useShellTheme must be used within ShellThemeProvider");
  }
  return context;
}

export function useResolvedShellTheme(): "light" | "dark" {
  const { theme } = useShellTheme();
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");

  return resolveEffectiveTheme(theme, prefersDarkTheme);
}
