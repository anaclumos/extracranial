import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  setTheme: (theme: Theme) => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "cho-sh-theme";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return "system";
}

function applyThemeClass(theme: Theme) {
  const html = document.documentElement;
  html.classList.toggle("dark", theme === "dark");
  html.classList.toggle("light", theme === "light");
}

export function ShellThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    if (typeof window !== "undefined") {
      if (next === "system") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, next);
      }
    }
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [setTheme, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useShellTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useShellTheme must be used within ShellThemeProvider");
  }
  return context;
}

const darkMQL =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

function subscribeToDarkMQL(callback: () => void) {
  darkMQL?.addEventListener("change", callback);
  return () => darkMQL?.removeEventListener("change", callback);
}

function getDarkMQLSnapshot() {
  return darkMQL?.matches ?? false;
}

function getDarkMQLServerSnapshot() {
  return false;
}

export function useResolvedShellTheme(): "light" | "dark" {
  const { theme } = useShellTheme();
  const osDark = useSyncExternalStore(
    subscribeToDarkMQL,
    getDarkMQLSnapshot,
    getDarkMQLServerSnapshot,
  );

  if (theme === "light" || theme === "dark") {
    return theme;
  }
  return osDark ? "dark" : "light";
}

export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="dark")document.documentElement.classList.add("dark");else if(t==="light")document.documentElement.classList.add("light")}catch(e){}})();`;
