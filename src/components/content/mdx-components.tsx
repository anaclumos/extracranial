"use client";

import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cjk } from "@streamdown/cjk";
import { math } from "@streamdown/math";
import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  type AllowedTags,
  type Components,
  type PluginConfig,
  Streamdown,
} from "streamdown";
import {
  buildNoteHref,
  isExternalHref,
  normalizeNoteSlug,
} from "@/lib/note-links";
import { useResolvedShellTheme } from "@/lib/shell-theme";
import { cn } from "@/lib/utils";
import { PreviewLink } from "../preview-link";
import styles from "./korea-netherlands-globe.module.css";

interface NoteContentProps {
  onLinkClick: (slug: string) => void;
  source: string;
}

interface ListElementProps {
  children?: ReactNode;
}

interface TabItemProps {
  children: ReactNode;
  default?: boolean | string;
  label?: string;
  source?: string;
  value?: string;
}

const codeFenceWithLanguageRe =
  /(^|\n)```(?!mermaid\b)([A-Za-z0-9_+.-]+)(?:\s|$)/m;
const mermaidFenceRe = /(^|\n)```mermaid(?:\s|$)/m;

let codePluginPromise: Promise<NonNullable<PluginConfig["code"]>> | null = null;
let mermaidPluginPromise: Promise<NonNullable<PluginConfig["mermaid"]>> | null =
  null;

function loadCodePlugin() {
  if (!codePluginPromise) {
    codePluginPromise = import("@/lib/streamdown/code-plugin").then(
      (module) => module.codePlugin
    );
  }

  return codePluginPromise;
}

function loadMermaidPlugin() {
  if (!mermaidPluginPromise) {
    mermaidPluginPromise = import("@/lib/streamdown/mermaid-plugin").then(
      (module) => module.mermaidPlugin
    );
  }

  return mermaidPluginPromise;
}

function useStreamdownPlugins(source: string): PluginConfig {
  const [optionalPlugins, setOptionalPlugins] = useState<
    Pick<PluginConfig, "code" | "mermaid">
  >({});

  const needsCodePlugin = useMemo(
    () => codeFenceWithLanguageRe.test(source),
    [source]
  );
  const needsMermaidPlugin = useMemo(
    () => mermaidFenceRe.test(source),
    [source]
  );

  useEffect(() => {
    let cancelled = false;
    const loaders: Promise<Partial<Pick<PluginConfig, "code" | "mermaid">>>[] =
      [];

    if (needsCodePlugin && !optionalPlugins.code) {
      loaders.push(
        loadCodePlugin().then((codePlugin) => ({ code: codePlugin }))
      );
    }

    if (needsMermaidPlugin && !optionalPlugins.mermaid) {
      loaders.push(
        loadMermaidPlugin().then((mermaidPlugin) => ({
          mermaid: mermaidPlugin,
        }))
      );
    }

    if (loaders.length === 0) {
      return;
    }

    Promise.all(loaders).then((loadedPlugins) => {
      if (cancelled) {
        return;
      }

      startTransition(() => {
        setOptionalPlugins((currentPlugins) => ({
          ...currentPlugins,
          ...Object.assign({}, ...loadedPlugins),
        }));
      });
    });

    return () => {
      cancelled = true;
    };
  }, [
    needsCodePlugin,
    needsMermaidPlugin,
    optionalPlugins.code,
    optionalPlugins.mermaid,
  ]);

  return useMemo(() => ({ cjk, math, ...optionalPlugins }), [optionalPlugins]);
}

function NoteAnchor({
  href = "",
  children,
  node: _node,
  onLinkClick,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  node?: unknown;
  onLinkClick: (slug: string) => void;
}) {
  if (isExternalHref(href)) {
    return (
      <a {...props} href={href} rel="noopener noreferrer" target="_blank">
        {children}
        <HugeiconsIcon
          aria-hidden="true"
          className="ml-1 inline-block align-baseline"
          icon={ArrowUpRight01Icon}
          size={12}
          strokeWidth={1.5}
        />
      </a>
    );
  }

  const slug = normalizeNoteSlug(href);
  if (!(slug && onLinkClick)) {
    return (
      <a {...props} href={href}>
        {children}
      </a>
    );
  }

  return (
    <PreviewLink
      href={buildNoteHref(slug)}
      onClick={(event) => {
        event.preventDefault();
        onLinkClick(slug);
      }}
    >
      {children}
    </PreviewLink>
  );
}

function Admonition({
  children,
  icon,
  title,
  type = "info",
}: {
  children: ReactNode;
  icon?: string;
  title?: string;
  type?: "caution" | "danger" | "info" | "note" | "tip" | "warning";
}) {
  const toneClassName =
    {
      caution:
        "border-warning/25 bg-warning/6 text-warning-foreground dark:bg-warning/12",
      danger:
        "border-destructive/25 bg-destructive/6 text-destructive-foreground dark:bg-destructive/12",
      info: "border-info/25 bg-info/6 text-info-foreground dark:bg-info/12",
      note: "border-border bg-muted/50 text-foreground dark:bg-muted/30",
      tip: "border-success/25 bg-success/6 text-success-foreground dark:bg-success/12",
      warning:
        "border-warning/25 bg-warning/6 text-warning-foreground dark:bg-warning/12",
    }[type] ?? "border-border bg-muted/50 text-foreground";

  return (
    <aside className={cn("my-6 rounded-2xl border px-5 py-4", toneClassName)}>
      {(title || icon) && (
        <header className="mb-2 flex items-center gap-2 font-medium text-sm">
          {icon && <span aria-hidden="true">{icon}</span>}
          {title && <span>{title}</span>}
        </header>
      )}
      <div className="text-sm/7">{children}</div>
    </aside>
  );
}

function DisplayFlex({ children }: { children: ReactNode }) {
  return <div className="my-4 flex gap-4 overflow-x-auto">{children}</div>;
}

function YouTube({
  id,
  title = "YouTube video player",
}: {
  id?: string;
  title?: string;
}) {
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

function AppleMusicSong({
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

function SpotifySong({
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

function WIP({ state }: { state?: "translating" | string }) {
  return (
    <Admonition icon="💬" title="Work in Progress" type="info">
      {!state && <p>Work in progress. Check back later.</p>}
      {state === "translating" && (
        <p>
          This note exists in another language, but this translation is not done
          yet.
        </p>
      )}
    </Admonition>
  );
}

function BrowserOnly({
  children,
}: {
  children: ReactNode | (() => ReactNode);
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{typeof children === "function" ? children() : children}</>;
}

function shuffleNodes(nodes: ReactNode[]): ReactNode[] {
  const shuffled = [...nodes];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const currentNode = shuffled[index];
    const swapNode = shuffled[swapIndex];
    if (currentNode === undefined || swapNode === undefined) {
      continue;
    }
    shuffled[index] = swapNode;
    shuffled[swapIndex] = currentNode;
  }
  return shuffled;
}

function Shuffle({ children }: { children: ReactNode }) {
  const childArray = Children.toArray(children);
  const listElement =
    childArray.length === 1 && isValidElement(childArray[0])
      ? (childArray[0] as ReactElement<ListElementProps>)
      : null;
  const items = listElement
    ? Children.toArray(listElement.props.children)
    : childArray;

  const signatureRef = useRef("");
  const shuffledRef = useRef<ReactNode[]>([]);

  const signature = items
    .map((item, index) =>
      isValidElement(item) && item.key != null
        ? String(item.key)
        : `item-${index}`
    )
    .join("|");

  if (signatureRef.current !== signature) {
    signatureRef.current = signature;
    shuffledRef.current = shuffleNodes(items);
  }

  if (listElement) {
    return cloneElement(listElement, undefined, shuffledRef.current);
  }

  return <ul>{shuffledRef.current}</ul>;
}

function TabItem({ children }: TabItemProps) {
  return <>{children}</>;
}

function decodeMarkdownSource(source?: string): string | undefined {
  if (!source) {
    return undefined;
  }

  try {
    if (typeof window === "undefined" && typeof Buffer !== "undefined") {
      return Buffer.from(source, "base64").toString("utf8");
    }

    const binary = atob(source);
    const bytes = Uint8Array.from(binary, (character) =>
      character.charCodeAt(0)
    );
    return new TextDecoder().decode(bytes);
  } catch {
    return source;
  }
}

function Tabs({
  children,
  renderMarkdown,
}: {
  children: ReactNode;
  groupid?: string;
  renderMarkdown: (value: ReactNode) => ReactNode;
}) {
  const items = Children.toArray(children).filter(
    isValidElement
  ) as ReactElement<TabItemProps>[];
  const defaultValue =
    items.find((item) => item.props.default)?.props.value ??
    items[0]?.props.value;
  const [activeValue, setActiveValue] = useState<string | undefined>(
    defaultValue
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border/70">
      <div className="flex flex-wrap gap-2 border-border/70 border-b bg-muted/40 p-2">
        {items.map((item) => (
          <button
            className={cn(
              "rounded-full px-3 py-1.5 text-sm transition-colors",
              item.props.value === activeValue
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted"
            )}
            key={item.props.value}
            onClick={() => setActiveValue(item.props.value)}
            type="button"
          >
            {item.props.label ?? item.props.value}
          </button>
        ))}
      </div>
      <div className="p-4">
        {items.map((item) => {
          if (item.props.value !== activeValue) {
            return null;
          }

          const panelContent =
            decodeMarkdownSource(
              typeof item.props.source === "string"
                ? item.props.source
                : undefined
            ) ?? item.props.children;
          return (
            <div key={item.props.value}>{renderMarkdown(panelContent)}</div>
          );
        })}
      </div>
    </div>
  );
}

function KoreaNetherlandsGlobe({
  lang = "en",
}: {
  lang?: "en" | "ko" | string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resolvedTheme = useResolvedShellTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    let isDisposed = false;
    let globeDestroy: (() => void) | null = null;

    const setupGlobe = async () => {
      const { default: createGlobe } = await import("cobe");
      if (!(canvasRef.current && !isDisposed)) {
        return;
      }

      let width = canvasRef.current.offsetWidth;
      let phi = 0;
      let theta = 0.3;
      let targetPhi = 0;
      let targetTheta = 0.3;
      let pointerDown = false;
      let startX = 0;
      let startY = 0;
      let startPhi = 0;
      let startTheta = 0;

      const clamp = (value: number, min: number, max: number) =>
        Math.min(Math.max(value, min), max);

      const toAngles = (
        latitude: number,
        longitude: number
      ): [number, number] => [
        Math.PI - ((longitude * Math.PI) / 180 - Math.PI / 2),
        (latitude * Math.PI) / 180,
      ];

      const onResize = () => {
        width = canvasRef.current?.offsetWidth ?? width;
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!pointerDown) {
          return;
        }

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;
        const safeWidth = width || 1;
        targetPhi = startPhi + (deltaX / safeWidth) * Math.PI * 2;
        targetTheta = clamp(
          startTheta + (deltaY / safeWidth) * Math.PI,
          -Math.PI / 2,
          Math.PI / 2
        );
      };

      const handlePointerUp = () => {
        pointerDown = false;
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        const step = Math.PI / 18;
        switch (event.key) {
          case "ArrowLeft":
            event.preventDefault();
            targetPhi -= step;
            break;
          case "ArrowRight":
            event.preventDefault();
            targetPhi += step;
            break;
          case "ArrowUp":
            event.preventDefault();
            targetTheta = clamp(targetTheta - step, -Math.PI / 2, Math.PI / 2);
            break;
          case "ArrowDown":
            event.preventDefault();
            targetTheta = clamp(targetTheta + step, -Math.PI / 2, Math.PI / 2);
            break;
          default:
            break;
        }
      };

      const globe = createGlobe(canvasRef.current, {
        baseColor: isDark ? [0.12, 0.18, 0.14] : [0.72, 0.83, 0.77],
        dark: isDark ? 1 : 0,
        devicePixelRatio: 2,
        diffuse: 1.5,
        glowColor: isDark ? [0.05, 0.08, 0.06] : [0.86, 0.92, 0.89],
        height: width * 2,
        mapBrightness: 6,
        mapSamples: 20_000,
        markerColor: [0.1, 0.8, 1],
        markers: [
          { location: [37.5665, 126.978], size: 0.08 },
          { location: [52.3676, 4.9041], size: 0.08 },
        ],
        onRender: (state) => {
          phi = phi * 0.9 + targetPhi * 0.1;
          theta = theta * 0.9 + targetTheta * 0.1;
          state.phi = phi;
          state.theta = theta;
          state.width = width * 2;
          state.height = width * 2;
        },
        phi: 0,
        theta: 0.3,
        width: width * 2,
      });

      const handlePointerDown = (event: PointerEvent) => {
        pointerDown = true;
        startX = event.clientX;
        startY = event.clientY;
        startPhi = targetPhi;
        startTheta = targetTheta;
      };

      canvasRef.current.addEventListener("pointerdown", handlePointerDown);
      canvasRef.current.addEventListener("pointermove", onPointerMove);
      canvasRef.current.addEventListener("pointerup", handlePointerUp);
      canvasRef.current.addEventListener("pointerleave", handlePointerUp);
      canvasRef.current.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", onResize);

      canvasRef.current.style.opacity = "1";

      globeDestroy = () => {
        globe.destroy();
        window.removeEventListener("resize", onResize);
        canvasRef.current?.removeEventListener(
          "pointerdown",
          handlePointerDown
        );
        canvasRef.current?.removeEventListener("pointermove", onPointerMove);
        canvasRef.current?.removeEventListener("pointerup", handlePointerUp);
        canvasRef.current?.removeEventListener("pointerleave", handlePointerUp);
        canvasRef.current?.removeEventListener("keydown", handleKeyDown);
      };

      const handleCityClick = (latitude: number, longitude: number) => {
        [targetPhi, targetTheta] = toAngles(latitude, longitude);
      };

      (
        canvasRef.current as HTMLCanvasElement & {
          __focusCity?: (latitude: number, longitude: number) => void;
        }
      ).__focusCity = handleCityClick;
    };

    setupGlobe();

    return () => {
      isDisposed = true;
      globeDestroy?.();
    };
  }, [isDark]);

  const labels = {
    netherlands:
      lang === "ko" ? "네덜란드 · 암스테르담" : "Netherlands · Amsterdam",
    korea: lang === "ko" ? "대한민국 · 서울" : "South Korea · Seoul",
  };

  const focusCity = (latitude: number, longitude: number) => {
    const canvas = canvasRef.current as HTMLCanvasElement & {
      __focusCity?: (latitude: number, longitude: number) => void;
    };
    canvas.__focusCity?.(latitude, longitude);
  };

  return (
    <div className={styles.container}>
      <div className={cn(styles.card, isDark && styles.darkCard)}>
        <div className={styles.canvasWrapper}>
          <canvas
            aria-label={
              lang === "ko"
                ? "화살표 키로 지구본을 회전하세요"
                : "Use arrow keys to rotate the globe"
            }
            className={styles.canvas}
            ref={canvasRef}
            style={{ opacity: 0 }}
            tabIndex={0}
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={cn(styles.button, isDark && styles.darkButton)}
          onClick={() => focusCity(52.3676, 4.9041)}
          type="button"
        >
          <span className={styles.emoji}>&#x1F1F3;&#x1F1F1;</span>
          <span className={styles.label}>{labels.netherlands}</span>
        </button>
        <button
          className={cn(styles.button, isDark && styles.darkButton)}
          onClick={() => focusCity(37.5665, 126.978)}
          type="button"
        >
          <span className={styles.emoji}>&#x1F1F0;&#x1F1F7;</span>
          <span className={styles.label}>{labels.korea}</span>
        </button>
      </div>
    </div>
  );
}

function toReactNode(value: unknown): ReactNode {
  return value as ReactNode;
}

function extractMarkdownSource(value: ReactNode): string | null {
  const parts: string[] = [];

  const visit = (node: ReactNode): boolean => {
    if (node == null || typeof node === "boolean") {
      return true;
    }

    if (typeof node === "string" || typeof node === "number") {
      parts.push(String(node));
      return true;
    }

    if (Array.isArray(node)) {
      return node.every(visit);
    }

    if (
      isValidElement<{ children?: ReactNode }>(node) &&
      node.type === Fragment
    ) {
      return visit(node.props.children);
    }

    return false;
  };

  if (!visit(value)) {
    return null;
  }

  return parts.join("");
}

function createComponents(
  onLinkClick: (slug: string) => void,
  plugins: PluginConfig
): Components {
  let components = {} as Components;

  const renderMarkdown = (value: ReactNode) => {
    const source = extractMarkdownSource(value);
    if (!source) {
      return value;
    }

    return (
      <Streamdown
        allowedTags={allowedTags}
        components={components}
        mode="static"
        plugins={plugins}
      >
        {source}
      </Streamdown>
    );
  };

  components = {
    a: (props) => <NoteAnchor {...props} onLinkClick={onLinkClick} />,
    admonition: (props) => (
      <Admonition
        icon={typeof props.icon === "string" ? props.icon : undefined}
        title={typeof props.title === "string" ? props.title : undefined}
        type={typeof props.type === "string" ? (props.type as never) : "info"}
      >
        {toReactNode(props.children)}
      </Admonition>
    ),
    applemusicsong: (props) => (
      <AppleMusicSong
        title={typeof props.title === "string" ? props.title : undefined}
        url={typeof props.url === "string" ? props.url : undefined}
      />
    ),
    browseronly: (props) => (
      <BrowserOnly>{toReactNode(props.children)}</BrowserOnly>
    ),
    displayflex: (props) => (
      <DisplayFlex>{toReactNode(props.children)}</DisplayFlex>
    ),
    koreanetherlandsglobe: (props) => (
      <KoreaNetherlandsGlobe
        lang={typeof props.lang === "string" ? props.lang : "en"}
      />
    ),
    shuffle: (props) => <Shuffle>{toReactNode(props.children)}</Shuffle>,
    spotifysong: (props) => (
      <SpotifySong
        title={typeof props.title === "string" ? props.title : undefined}
        url={typeof props.url === "string" ? props.url : undefined}
      />
    ),
    tabitem: (props) => (
      <TabItem
        default={
          props.default === true ||
          props.default === "" ||
          props.default === "true"
        }
        label={typeof props.label === "string" ? props.label : undefined}
        source={typeof props.source === "string" ? props.source : undefined}
        value={typeof props.value === "string" ? props.value : undefined}
      >
        {toReactNode(props.children)}
      </TabItem>
    ),
    tabs: (props) => (
      <Tabs
        groupid={typeof props.groupid === "string" ? props.groupid : undefined}
        renderMarkdown={renderMarkdown}
      >
        {toReactNode(props.children)}
      </Tabs>
    ),
    wip: (props) => (
      <WIP state={typeof props.state === "string" ? props.state : undefined} />
    ),
    youtube: (props) => (
      <YouTube
        id={typeof props.id === "string" ? props.id : undefined}
        title={typeof props.title === "string" ? props.title : undefined}
      />
    ),
  };

  return components;
}

const allowedTags = {
  admonition: ["icon", "title", "type"],
  applemusicsong: ["title", "url"],
  browseronly: [],
  displayflex: [],
  koreanetherlandsglobe: ["lang"],
  shuffle: [],
  spotifysong: ["title", "url"],
  tabitem: ["default", "label", "source", "value"],
  tabs: ["groupid"],
  wip: ["state"],
  youtube: ["id", "title"],
} satisfies AllowedTags;

export function MdxNoteContent({ onLinkClick, source }: NoteContentProps) {
  const plugins = useStreamdownPlugins(source);
  const components = useMemo(
    () => createComponents(onLinkClick, plugins),
    [onLinkClick, plugins]
  );

  return (
    <Streamdown
      allowedTags={allowedTags}
      className="prose-note md:px-4 md:py-3"
      components={components}
      mode="static"
      plugins={plugins}
    >
      {source}
    </Streamdown>
  );
}
