import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  buildNoteHref,
  isExternalHref,
  normalizeNoteSlug,
} from "@/lib/note-links";
import { PreviewLink } from "../preview-link";

export function toReactNode(value: unknown): ReactNode {
  return value as ReactNode;
}

export function extractMarkdownSource(value: ReactNode): string | null {
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

export function isSummaryElement(
  node: ReactNode
): node is ReactElement<{ children?: ReactNode }> {
  return (
    isValidElement<{ children?: ReactNode }>(node) && node.type === "summary"
  );
}

export function isBlankTextNode(node: ReactNode): boolean {
  return typeof node === "string" && node.trim().length === 0;
}

export function NoteAnchor({
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
