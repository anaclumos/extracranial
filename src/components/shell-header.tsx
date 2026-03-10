import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { useLocaleNavigation } from "@/i18n/navigation";
import { useLocale, useTranslations } from "@/i18n/provider";
import { useShellTheme } from "@/lib/shell-theme";

export function ShellHeader() {
  const locale = useLocale();
  const tLanguage = useTranslations("languageSwitcher");
  const tTheme = useTranslations("theme");
  const { switchLocale } = useLocaleNavigation();
  const { theme, setTheme } = useShellTheme();

  const toggleTheme = () => {
    let nextTheme: typeof theme;

    if (theme === "light") {
      nextTheme = "dark";
    } else if (theme === "dark") {
      nextTheme = "system";
    } else {
      nextTheme = "light";
    }

    setTheme(nextTheme);
  };

  return (
    <header className="sticky top-0 z-50 border-border border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Logo className="text-foreground" size={20} />
          <span className="font-semibold text-foreground text-lg">cho.sh</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="h-8 px-2 text-xs"
            onClick={() => switchLocale("en")}
            size="sm"
            title={tLanguage("selectLanguage")}
            variant={locale === "en" ? "secondary" : "ghost"}
          >
            EN
          </Button>
          <Button
            className="h-8 px-2 text-xs"
            onClick={() => switchLocale("ko")}
            size="sm"
            title={tLanguage("selectLanguage")}
            variant={locale === "ko" ? "secondary" : "ghost"}
          >
            KO
          </Button>
          <Button
            className="gap-2"
            onClick={toggleTheme}
            size="sm"
            title={tTheme("toggle")}
            variant="ghost"
          >
            {theme === "light" && <HugeiconsIcon icon={Sun01Icon} size={18} />}
            {theme === "dark" && <HugeiconsIcon icon={Moon01Icon} size={18} />}
            {theme === "system" && <HugeiconsIcon icon={Sun01Icon} size={18} />}
          </Button>
        </div>
      </div>
    </header>
  );
}
