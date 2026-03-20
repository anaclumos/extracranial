import {
  createRootRoute,
  type ErrorComponentProps,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { EscapeInAppBrowser } from "eiab/react";
import { type ReactNode, Suspense } from "react";
import { PreloadErrorRecovery } from "@/components/client/preload-error-recovery";
import { MagneticCursorLazy } from "@/components/magnetic-cursor-lazy";
import { I18nProvider } from "@/i18n/provider";
import { ShellThemeProvider, THEME_INIT_SCRIPT } from "@/lib/shell-theme";
import { cn } from "@/lib/utils";
import appCss from "../app/globals.css?url";

const SUNGHYUN_SANS_FONT_BASE_URL =
  "https://cdn.jsdelivr.net/gh/anaclumos/sunghyun-sans@29f779b837efd794f8ff09904235b7712cbee630/dist/web/woff2";

const SUNGHYUN_SANS_FONT_CSS = `
@font-face {
  font-family: "Sunghyun Sans KR Hanja";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("${SUNGHYUN_SANS_FONT_BASE_URL}/SunghyunSansKRHanja-Regular.woff2") format("woff2");
}

@font-face {
  font-family: "Sunghyun Sans KR Hanja";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("${SUNGHYUN_SANS_FONT_BASE_URL}/SunghyunSansKRHanja-Medium.woff2") format("woff2");
}

@font-face {
  font-family: "Sunghyun Sans KR Hanja";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("${SUNGHYUN_SANS_FONT_BASE_URL}/SunghyunSansKRHanja-SemiBold.woff2") format("woff2");
}

@font-face {
  font-family: "Sunghyun Sans KR Hanja";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("${SUNGHYUN_SANS_FONT_BASE_URL}/SunghyunSansKRHanja-Bold.woff2") format("woff2");
}
`.trim();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "cho.sh",
      },
      {
        name: "theme-color",
        content: "#ffffff",
        media: "(prefers-color-scheme: light)",
      },
      {
        name: "theme-color",
        content: "#0a0a0a",
        media: "(prefers-color-scheme: dark)",
      },
      {
        name: "color-scheme",
        content: "light dark",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://cdn.jsdelivr.net",
        crossOrigin: "",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: `${SUNGHYUN_SANS_FONT_BASE_URL}/SunghyunSansKRHanja-Regular.woff2`,
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/streamdown@2.4.0/styles.css",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/logo.svg",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/logo.png",
      },
      {
        rel: "apple-touch-icon",
        href: "/logo.png",
      },
    ],
  }),
  component: RootComponent,
  errorComponent: RootErrorComponent,
  notFoundComponent: RootNotFoundComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <ShellThemeProvider>
        <I18nProvider>
          <Outlet />
        </I18nProvider>
      </ShellThemeProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className="h-full" dir="ltr" lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
        <style>{SUNGHYUN_SANS_FONT_CSS}</style>
      </head>
      <body className={cn("flex h-full flex-col font-sans antialiased")}>
        <Suspense>
          <PreloadErrorRecovery />
          <EscapeInAppBrowser />
          <MagneticCursorLazy />
          {children}
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}

function RootErrorComponent({ error, reset }: ErrorComponentProps) {
  const message =
    error instanceof Error ? error.message : "Unknown application error";
  const isDynamicImportFetchError = message.includes(
    "Failed to fetch dynamically imported module",
  );

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 items-center border-border/50 border-b bg-background/80 px-4 backdrop-blur-sm">
        <a className="font-medium text-sm tracking-tight" href="/">
          cho.sh
        </a>
      </header>
      <ShellStatusView
        action={
          isDynamicImportFetchError ? (
            <button
              className="inline-flex items-center justify-center rounded-md border border-foreground/30 bg-transparent px-3 py-2 font-medium text-sm transition-colors hover:bg-foreground/10"
              onClick={() => window.location.reload()}
              type="button"
            >
              Reload page
            </button>
          ) : (
            <button
              className="inline-flex items-center justify-center rounded-md border border-foreground/30 bg-transparent px-3 py-2 font-medium text-sm transition-colors hover:bg-foreground/10"
              onClick={() => reset()}
              type="button"
            >
              Try again
            </button>
          )
        }
        description="The page failed to load. Try again, or go back to the home page."
        detail={message}
        title="Something went wrong"
      />
    </>
  );
}

function RootNotFoundComponent() {
  return (
    <ShellStatusView
      action={
        <Link
          className="inline-flex items-center justify-center rounded-md border border-foreground/30 bg-transparent px-3 py-2 font-medium text-sm transition-colors hover:bg-foreground/10"
          to="/"
        >
          Go home
        </Link>
      }
      description="The page you requested does not exist."
      title="Page not found"
    />
  );
}

function ShellStatusView({
  title,
  description,
  detail,
  action,
}: Readonly<{
  title: string;
  description: string;
  detail?: string;
  action: ReactNode;
}>) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 items-center px-4 py-12 md:px-8">
      <section className="w-full rounded-lg border border-foreground/20 bg-background/80 p-6 backdrop-blur-sm md:p-8">
        <h1 className="font-semibold text-2xl tracking-tight">{title}</h1>
        <p className="mt-3 text-foreground/80 text-sm md:text-base">
          {description}
        </p>
        {detail ? (
          <p className="mt-4 rounded-md border border-foreground/15 bg-foreground/4 px-3 py-2 text-foreground/80 text-xs md:text-sm">
            {detail}
          </p>
        ) : null}
        <div className="mt-6">{action}</div>
      </section>
    </main>
  );
}
