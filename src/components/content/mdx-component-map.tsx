"use client";

import type { ReactNode } from "react";
import { type AllowedTags, type Components, type PluginConfig, Streamdown } from "streamdown";
import { BrowserOnlyIsland, KoreaNetherlandsGlobeIsland } from "./mdx-browser-islands";
import {
  Admonition,
  AppleMusicSong,
  DisplayFlex,
  SpotifySong,
  WIP,
  YouTube,
} from "./mdx-content-blocks";
import { DetailsAccordion, Shuffle, TabItem, Tabs } from "./mdx-interactive-widgets";
import { extractMarkdownSource, NoteAnchor, toReactNode } from "./mdx-render-helpers";

export const allowedTags = {
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

export function createComponents(
  onLinkClick: (slug: string) => void,
  plugins: PluginConfig,
): Components {
  let components = {} as Components;

  const renderMarkdown = (value: ReactNode) => {
    const source = extractMarkdownSource(value);
    if (!source) {
      return value;
    }

    return (
      <Streamdown allowedTags={allowedTags} components={components} mode="static" plugins={plugins}>
        {source}
      </Streamdown>
    );
  };

  components = {
    a: (props) => <NoteAnchor {...props} onLinkClick={onLinkClick} />,
    admonition: (props) => (
      <Admonition
        icon={typeof props.icon === "string" ? props.icon : undefined}
        renderMarkdown={renderMarkdown}
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
    browseronly: (props) => <BrowserOnlyIsland>{toReactNode(props.children)}</BrowserOnlyIsland>,
    details: (props) => (
      <DetailsAccordion
        open={props.open === true || typeof props.open === "string" ? props.open : undefined}
        renderMarkdown={renderMarkdown}
      >
        {toReactNode(props.children)}
      </DetailsAccordion>
    ),
    displayflex: (props) => <DisplayFlex>{toReactNode(props.children)}</DisplayFlex>,
    koreanetherlandsglobe: (props) => (
      <KoreaNetherlandsGlobeIsland lang={typeof props.lang === "string" ? props.lang : "en"} />
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
        default={props.default === true || props.default === "" || props.default === "true"}
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
    wip: (props) => <WIP state={typeof props.state === "string" ? props.state : undefined} />,
    youtube: (props) => (
      <YouTube
        id={typeof props.id === "string" ? props.id : undefined}
        title={typeof props.title === "string" ? props.title : undefined}
      />
    ),
  };

  return components;
}
