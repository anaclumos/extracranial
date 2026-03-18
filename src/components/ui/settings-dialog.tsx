"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Tabs } from "@base-ui/react/tabs";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "@/i18n/provider";
import { useShellTheme } from "@/lib/shell-theme";
import type { NoteLanguageFilter } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SettingsDialogProps {
  compact?: boolean;
  isBlogOnly: boolean;
  languageFilter: NoteLanguageFilter;
  onBlogOnlyChange: (nextValue: boolean) => void;
  onLanguageFilterChange: (nextValue: NoteLanguageFilter) => void;
  triggerClassName?: string;
}

function isTheme(value: unknown): value is "light" | "dark" {
  return value === "light" || value === "dark";
}

function isLanguageFilter(value: unknown): value is NoteLanguageFilter {
  return value === "all" || value === "en" || value === "ko";
}

export function SettingsDialog({
  compact = false,
  isBlogOnly,
  languageFilter,
  onBlogOnlyChange,
  onLanguageFilterChange,
  triggerClassName,
}: SettingsDialogProps) {
  const { theme, setTheme } = useShellTheme();
  const tSettings = useTranslations("settings");
  const tTheme = useTranslations("theme");

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={cn(
          buttonVariants({
            size: compact ? "sm" : "default",
            variant: "outline",
          }),
          "rounded-full px-3.5",
          triggerClassName,
        )}
      >
        {tSettings("open")}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-modal bg-foreground/18 backdrop-blur-[2px]" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-modal w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-background/95 px-5 pt-6 pb-5 shadow-2xl outline-none backdrop-blur-xl">
          <div>
            <Dialog.Title className="font-medium text-foreground text-lg tracking-tight">
              {tSettings("title")}
            </Dialog.Title>
            <Dialog.Description className="mt-1 text-muted-foreground text-sm leading-relaxed">
              {tSettings("description")}
            </Dialog.Description>
          </div>

          <div className="mt-8 space-y-6">
            <section className="space-y-3">
              <div>
                <p className="font-medium text-foreground text-sm">{tSettings("appearance")}</p>
                <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                  {tSettings("appearanceDescription")}
                </p>
              </div>
              <Tabs.Root
                onValueChange={(value) => {
                  if (isTheme(value)) {
                    setTheme(value);
                  }
                }}
                value={theme}
              >
                <Tabs.List className="relative grid grid-cols-2 rounded-full border border-border/70 bg-muted/60 p-1">
                  <Tabs.Indicator className="absolute top-1 bottom-1 left-0 z-0 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] rounded-full bg-foreground shadow-sm transition-all duration-300 ease-out" />
                  <Tabs.Tab
                    className="relative z-10 rounded-full px-3 py-2 font-medium text-muted-foreground text-sm transition-colors aria-selected:text-background"
                    value="light"
                  >
                    {tTheme("light")}
                  </Tabs.Tab>
                  <Tabs.Tab
                    className="relative z-10 rounded-full px-3 py-2 font-medium text-muted-foreground text-sm transition-colors aria-selected:text-background"
                    value="dark"
                  >
                    {tTheme("dark")}
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs.Root>
            </section>

            <section className="space-y-3">
              <div>
                <p className="font-medium text-foreground text-sm">{tSettings("language")}</p>
                <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                  {tSettings("languageDescription")}
                </p>
              </div>
              <ToggleGroup
                className="grid grid-cols-3 gap-2"
                multiple={false}
                onValueChange={(groupValue) => {
                  const nextValue = groupValue[0];
                  if (isLanguageFilter(nextValue)) {
                    onLanguageFilterChange(nextValue);
                  }
                }}
                orientation="horizontal"
                value={[languageFilter]}
              >
                <Toggle
                  aria-label={tSettings("languageAll")}
                  className="rounded-full border border-border/70 px-3 py-2 font-medium text-muted-foreground text-sm transition-colors data-[pressed]:border-foreground data-[pressed]:bg-foreground data-[pressed]:text-background"
                  value="all"
                >
                  {tSettings("languageAll")}
                </Toggle>
                <Toggle
                  aria-label={tSettings("languageEnglish")}
                  className="rounded-full border border-border/70 px-3 py-2 font-medium text-muted-foreground text-sm transition-colors data-[pressed]:border-foreground data-[pressed]:bg-foreground data-[pressed]:text-background"
                  value="en"
                >
                  {tSettings("languageEnglish")}
                </Toggle>
                <Toggle
                  aria-label={tSettings("languageKorean")}
                  className="rounded-full border border-border/70 px-3 py-2 font-medium text-muted-foreground text-sm transition-colors data-[pressed]:border-foreground data-[pressed]:bg-foreground data-[pressed]:text-background"
                  value="ko"
                >
                  {tSettings("languageKorean")}
                </Toggle>
              </ToggleGroup>
            </section>

            <section className="flex items-start justify-between gap-4 rounded-2xl border border-border/70 bg-muted/30 px-4 py-3">
              <div className="space-y-1 pr-2">
                <p className="font-medium text-foreground text-sm">{tSettings("blogOnly")}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tSettings("blogOnlyDescription")}
                </p>
              </div>
              <Switch
                aria-label={tSettings("blogOnlyToggle")}
                checked={isBlogOnly}
                onCheckedChange={onBlogOnlyChange}
              />
            </section>
          </div>

          <div className="mt-6">
            <Dialog.Close
              className={cn(
                buttonVariants({ size: "sm", variant: "ghost" }),
                "w-full justify-center",
              )}
            >
              {tSettings("close")}
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
