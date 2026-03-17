"use client";

import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo, useRef, useTransition } from "react";
import { buildNoteHref, buildNoteStackHref } from "@/lib/note-links";
import { Route as NoteRoute } from "@/routes/$slug";
import { toNoteStackSearchParams } from "./stores/note-stack-parsers";
import {
  getFocusIndex,
  parseStackString,
  popFromStack,
  pushToStack,
} from "./stores/stack-utils";

export function useNoteStack(rootSlug: string) {
  const navigate = useNavigate({ from: NoteRoute.fullPath });
  const stackPath = NoteRoute.useParams({
    select: (params) => params.slug,
  });
  const focus = NoteRoute.useSearch({
    select: (search) => search.focus ?? null,
  });
  const startTransition = useTransition()[1];

  const navigateToStack = useCallback(
    (
      nextStack: string[],
      focus: number | null,
      options?: { scroll?: boolean }
    ) => {
      const targetStack = nextStack.length > 0 ? nextStack : ["000000"];
      const nextSearchParams = toNoteStackSearchParams(focus);

      navigate({
        to: buildNoteStackHref(targetStack),
        replace: true,
        resetScroll: options?.scroll === false ? false : undefined,
        search: (prev: Record<string, unknown>) => {
          const nextSearch = { ...prev };

          if (typeof nextSearchParams.focus === "number") {
            nextSearch.focus = nextSearchParams.focus;
          } else {
            nextSearch.focus = undefined;
          }

          return nextSearch;
        },
      });
    },
    [navigate]
  );

  const buildNotePath = useCallback((slug: string) => buildNoteHref(slug), []);

  const stack = useMemo(() => {
    const pathStack = parseStackString(stackPath);
    if (pathStack.length > 0) {
      return pathStack;
    }

    return [rootSlug];
  }, [rootSlug, stackPath]);

  const focusIndex = useMemo(
    () => getFocusIndex(focus, stack.length),
    [focus, stack.length]
  );

  const stackRef = useRef(stack);
  stackRef.current = stack;
  const focusIndexRef = useRef(focusIndex);
  focusIndexRef.current = focusIndex;

  const pushNote = useCallback(
    (slug: string, fromPaneIndex: number) => {
      const currentStack = stackRef.current;
      const newStack = pushToStack(currentStack, slug, fromPaneIndex);

      startTransition(() => {
        navigateToStack(newStack, null);
      });
    },
    [navigateToStack]
  );

  const pushFocusedNote = useCallback(
    (slug: string) => {
      const currentStack = stackRef.current;
      const currentFocusIndex = focusIndexRef.current;
      const newStack = pushToStack(currentStack, slug, currentFocusIndex);

      startTransition(() => {
        navigateToStack(newStack, null);
      });
    },
    [navigateToStack]
  );

  const popNote = useCallback(() => {
    const currentStack = stackRef.current;
    const newStack = popFromStack(currentStack);

    startTransition(() => {
      navigateToStack(newStack, null);
    });
  }, [navigateToStack]);

  const focusPane = useCallback(
    (index: number) => {
      const currentStack = stackRef.current;
      if (index < 0 || index >= currentStack.length) {
        return;
      }
      const currentFocusIndex = focusIndexRef.current;
      if (index === currentFocusIndex) {
        return;
      }
      const newFocus = index === currentStack.length - 1 ? null : index;
      navigateToStack(currentStack, newFocus, { scroll: false });
    },
    [navigateToStack]
  );

  const setStack = useCallback(
    (newStack: string[], focusIdx?: number) => {
      if (newStack.length === 0) {
        startTransition(() => {
          navigate({
            to: buildNotePath("000000"),
            search: toNoteStackSearchParams(null),
          });
        });
        return;
      }

      const newFocus =
        focusIdx !== undefined && focusIdx !== newStack.length - 1
          ? focusIdx
          : null;

      startTransition(() => {
        navigateToStack(newStack, newFocus);
      });
    },
    [buildNotePath, navigate, navigateToStack]
  );

  const removePane = useCallback(
    (index: number, availableLength?: number) => {
      const currentStack = stackRef.current;
      const visibleStack =
        typeof availableLength === "number"
          ? currentStack.slice(0, availableLength)
          : currentStack;

      if (
        index === 0 ||
        visibleStack.length <= 1 ||
        index >= visibleStack.length
      ) {
        return;
      }

      const newStack = [
        ...visibleStack.slice(0, index),
        ...visibleStack.slice(index + 1),
      ];
      const newFocusIndex = Math.min(index, newStack.length - 1);
      setStack(newStack, newFocusIndex);
    },
    [setStack]
  );

  return useMemo(
    () => ({
      stack,
      focusIndex,
      pushNote,
      pushFocusedNote,
      popNote,
      focusPane,
      removePane,
    }),
    [
      stack,
      focusIndex,
      pushNote,
      pushFocusedNote,
      popNote,
      focusPane,
      removePane,
    ]
  );
}
