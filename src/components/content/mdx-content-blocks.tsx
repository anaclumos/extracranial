import type * as React from "react";
import { cn } from "@/lib/utils";

const ADMONITION_TITLE_WRAPPER_RES = [/^\*\*(.+)\*\*$/s, /^__(.+)__$/s, /^\*(.+)\*$/s, /^_(.+)_$/s];

function formatAdmonitionTitle(title?: string): string | undefined {
  if (!title) {
    return title;
  }

  let normalizedTitle = title.trim();
  let didUnwrap = true;

  while (didUnwrap) {
    didUnwrap = false;

    for (const wrapperRe of ADMONITION_TITLE_WRAPPER_RES) {
      const match = normalizedTitle.match(wrapperRe);
      if (!match?.[1]) {
        continue;
      }

      normalizedTitle = match[1].trim();
      didUnwrap = true;
    }
  }

  return normalizedTitle;
}

export function Admonition({
  children,
  icon,
  renderMarkdown,
  title,
  type = "info",
}: {
  children: React.ReactNode;
  icon?: string;
  renderMarkdown?: (value: React.ReactNode) => React.ReactNode;
  title?: string;
  type?: "caution" | "danger" | "info" | "note" | "tip" | "warning";
}) {
  const toneClassName =
    {
      caution: "border-warning/25 bg-warning/6 text-warning-foreground dark:bg-warning/12",
      danger:
        "border-destructive/25 bg-destructive/6 text-destructive-foreground dark:bg-destructive/12",
      info: "border-info/25 bg-info/6 text-info-foreground dark:bg-info/12",
      note: "border-border bg-muted/50 text-foreground dark:bg-muted/30",
      tip: "border-success/25 bg-success/6 text-success-foreground dark:bg-success/12",
      warning: "border-warning/25 bg-warning/6 text-warning-foreground dark:bg-warning/12",
    }[type] ?? "border-border bg-muted/50 text-foreground";
  const formattedTitle = formatAdmonitionTitle(title);

  return (
    <aside className={cn("my-6 rounded-2xl border px-5 py-4", toneClassName)}>
      {(formattedTitle || icon) && (
        <header className="mb-2 flex items-center gap-2 font-medium text-sm">
          {icon && <span aria-hidden="true">{icon}</span>}
          {formattedTitle && <span>{formattedTitle}</span>}
        </header>
      )}
      <div className="text-sm/7">{renderMarkdown ? renderMarkdown(children) : children}</div>
    </aside>
  );
}

export function DisplayFlex({ children }: { children: React.ReactNode }) {
  return <div className="my-4 flex gap-4 overflow-x-auto">{children}</div>;
}

export function YouTube({ id, title = "YouTube video player" }: { id?: string; title?: string }) {
  if (!id) {
    return null;
  }

  return (
    <figure className="my-6">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-xl border border-border/60"
        loading="lazy"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
      />
    </figure>
  );
}

export function AppleMusicSong({
  title = "Apple Music player",
  url,
}: {
  title?: string;
  url?: string;
}) {
  if (!url) {
    return null;
  }

  return (
    <iframe
      allow="autoplay *; encrypted-media *; clipboard-write"
      className="my-6 w-full overflow-hidden rounded-xl border-0"
      height="175"
      loading="lazy"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
      src={url}
      title={title}
    />
  );
}

export function SpotifySong({
  title = "Spotify music player",
  url,
}: {
  title?: string;
  url?: string;
}) {
  if (!url) {
    return null;
  }

  return (
    <iframe
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen={false}
      className="my-6 w-full rounded-xl border-0"
      height="160"
      loading="lazy"
      src={url}
      title={title}
    />
  );
}

export function WIP({ state }: { state?: "translating" | string }) {
  return (
    <Admonition icon="💬" title="Work in Progress" type="info">
      {!state && <p>Work in progress. Check back later.</p>}
      {state === "translating" && (
        <p>This note exists in another language, but this translation is not done yet.</p>
      )}
    </Admonition>
  );
}
