import {
  ComputerIcon,
  Moon01Icon,
  Sun01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocaleNavigation } from "@/i18n/navigation";
import { useLocale, useTranslations } from "@/i18n/provider";
import { type Locale, locales } from "@/i18n/routing";
import { useShellTheme } from "@/lib/shell-theme";

const localeLabels: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
};

const themeIcons = {
  light: Sun01Icon,
  dark: Moon01Icon,
  system: ComputerIcon,
} as const;

const themeOrder = ["light", "dark", "system"] as const;

export function ShellHeader() {
  const locale = useLocale();
  const tLanguage = useTranslations("languageSwitcher");
  const tTheme = useTranslations("theme");
  const { switchLocale } = useLocaleNavigation();
  const { theme, setTheme } = useShellTheme();

  const toggleTheme = () => {
    const idx = themeOrder.indexOf(theme);
    setTheme(themeOrder[(idx + 1) % themeOrder.length]);
  };

  return (
    <header className="sticky top-0 z-50 border-border border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Logo className="text-foreground" size={20} />
          <span className="font-semibold text-foreground text-lg">cho.sh</span>
        </div>

        <div className="flex items-center gap-2">
          <Select
            onValueChange={(value) => switchLocale(value as Locale)}
            value={locale}
          >
            <SelectTrigger
              aria-label={tLanguage("selectLanguage")}
              className="h-8 min-w-24 px-2 text-xs"
              size="sm"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {locales.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {localeLabels[loc]}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
          <Button
            className="gap-2"
            onClick={toggleTheme}
            size="sm"
            title={tTheme("toggle")}
            variant="ghost"
          >
            <HugeiconsIcon icon={themeIcons[theme]} size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
