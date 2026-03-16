"use client";

import { useMemo } from "react";
import { Streamdown } from "streamdown";
import { allowedTags, createComponents } from "./mdx-component-map";
import { useStreamdownPlugins } from "./mdx-plugin-loader";

interface NoteContentProps {
  onLinkClick: (slug: string) => void;
  source: string;
}

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
