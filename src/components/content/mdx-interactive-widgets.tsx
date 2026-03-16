"use client";

import { Accordion } from "@base-ui/react";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { isBlankTextNode, isSummaryElement } from "./mdx-render-helpers";

interface ListElementProps {
  children?: ReactNode;
}

export interface TabItemProps {
  children: ReactNode;
  default?: boolean | string;
  label?: string;
  source?: string;
  value?: string;
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

export function Shuffle({ children }: { children: ReactNode }) {
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

export function TabItem({ children }: TabItemProps) {
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

export function Tabs({
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

export function DetailsAccordion({
  children,
  open,
  renderMarkdown,
}: {
  children?: ReactNode;
  open?: boolean | string;
  renderMarkdown: (value: ReactNode) => ReactNode;
}) {
  const nodes = Children.toArray(children).filter(
    (node) => !isBlankTextNode(node)
  );
  const summaryNode = nodes.find(isSummaryElement);
  const panelNodes = nodes.filter((node) => !isSummaryElement(node));
  const summaryContent = summaryNode?.props.children ?? "Details";
  const panelContent =
    panelNodes.length <= 1 ? (panelNodes[0] ?? null) : panelNodes;
  const defaultValue =
    open === true || open === "" || open === "true" ? ["details"] : [];

  return (
    <Accordion.Root
      className="my-6 overflow-hidden rounded-lg border border-border/60 bg-background/40"
      defaultValue={defaultValue}
    >
      <Accordion.Item value="details">
        <Accordion.Header className="m-0">
          <Accordion.Trigger
            className={(state) =>
              cn(
                "flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-medium text-foreground transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                state.open && "[&_.accordion-indicator]:rotate-45"
              )
            }
          >
            <span className="flex-1">{summaryContent}</span>
            <span
              aria-hidden="true"
              className="accordion-indicator font-mono text-muted-foreground text-xs transition-transform"
            >
              +
            </span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel className="px-4 pt-1 pb-4">
          {renderMarkdown(panelContent)}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}
