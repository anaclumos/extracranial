"use client";

import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo, useRef, useTransition } from "react";
import { buildLocalePathname, usePathname } from "@/i18n/navigation";
import { getLocaleFromPathname } from "@/i18n/routing";
import { Route as LocaleRoute } from "@/routes/{-$locale}";
import {
  parseNoteStackSearch,
  toNoteStackSearchParams,
} from "./stores/note-stack-parsers";
import {
  buildFullStack,
  getFocusIndex,
  popFromStack,
  pushToStack,
} from "./stores/stack-utils";

export function useNoteStack(rootSlug: string) {
  const pathname = usePathname();
  const locale = useMemo(() => getLocaleFromPathname(pathname), [pathname]);
  const navigate = useNavigate({ from: LocaleRoute.fullPath });
  const rawSearch = LocaleRoute.useSearch();
  const [isPending, startTransition] = useTransition();
  const urlState = useMemo(() => {
    return parseNoteStackSearch(rawSearch as Record<string, unknown>);
  }, [rawSearch]);

  const setUrlState = useCallback(
    (
      nextState: Partial<{ stack: string[]; focus: number | null }>,
      options?: { scroll?: boolean }
    ) => {
      navigate({
        to: pathname,
        replace: true,
        resetScroll: options?.scroll === false ? false : undefined,
        search: (prev: Record<string, unknown>) => {
          const nextSearch = { ...prev };

          if ("stack" in nextState) {
            const stackValue = toNoteStackSearchParams(
              nextState.stack ?? [],
              null
            ).stack;
            if (stackValue) {
              nextSearch.stack = stackValue;
            } else {
              nextSearch.stack = undefined;
            }
          }

          if ("focus" in nextState) {
            const focusValue = toNoteStackSearchParams(
              [],
              nextState.focus ?? null
            ).focus;
            if (typeof focusValue === "number") {
              nextSearch.focus = focusValue;
            } else {
              nextSearch.focus = undefined;
            }
          }

          return nextSearch;
        },
      });
    },
    [navigate, pathname]
  );

  const buildNotePath = useCallback(
    (slug: string) => {
      return buildLocalePathname(`/${slug}`, locale);
    },
    [locale]
  );

  const stack = useMemo(
    () => buildFullStack(rootSlug, urlState.stack),
    [rootSlug, urlState.stack]
  );

  const focusIndex = useMemo(
    () => getFocusIndex(urlState.focus, stack.length),
    [urlState.focus, stack.length]
  );

  const stackRef = useRef(stack);
  stackRef.current = stack;

  const pushNote = useCallback(
    (slug: string, fromPaneIndex: number) => {
      const currentStack = stackRef.current;
      const newStack = pushToStack(currentStack, slug, fromPaneIndex);

      if (newStack.length === 1) {
        const newRootSlug = newStack[0];
        startTransition(() => {
          navigate({ to: buildNotePath(newRootSlug) });
        });
      } else {
        const newRootSlug = newStack[0];
        const additionalSlugs = newStack.slice(1);

        if (newRootSlug !== rootSlug) {
          const basePath = buildNotePath(newRootSlug);
          const nextSearch = toNoteStackSearchParams(additionalSlugs, null);
          startTransition(() => {
            navigate({ to: basePath, search: nextSearch });
          });
        } else {
          setUrlState({ stack: additionalSlugs, focus: null });
        }
      }
    },
    [buildNotePath, navigate, rootSlug, setUrlState]
  );

  const popNote = useCallback(() => {
    const currentStack = stackRef.current;
    const newStack = popFromStack(currentStack);

    if (newStack.length <= 1) {
      setUrlState({ stack: [], focus: null });
    } else {
      const additionalSlugs = newStack.slice(1);
      setUrlState({ stack: additionalSlugs, focus: null });
    }
  }, [setUrlState]);

  const focusPane = useCallback(
    (index: number) => {
      const currentStack = stackRef.current;
      if (index < 0 || index >= currentStack.length) {
        return;
      }
      const currentFocusIndex = getFocusIndex(
        urlState.focus,
        currentStack.length
      );
      if (index === currentFocusIndex) {
        return;
      }
      const newFocus = index === currentStack.length - 1 ? null : index;
      setUrlState({ focus: newFocus }, { scroll: false });
    },
    [urlState.focus, setUrlState]
  );

  const setStack = useCallback(
    (newStack: string[], focusIdx?: number) => {
      if (newStack.length === 0) {
        startTransition(() => {
          navigate({ to: buildNotePath("000000") });
        });
        return;
      }

      const newRootSlug = newStack[0];
      const additionalSlugs = newStack.slice(1);
      const newFocus =
        focusIdx !== undefined && focusIdx !== newStack.length - 1
          ? focusIdx
          : null;

      if (newRootSlug !== rootSlug) {
        const basePath = buildNotePath(newRootSlug);
        const nextSearch = toNoteStackSearchParams(additionalSlugs, newFocus);
        startTransition(() => {
          navigate({ to: basePath, search: nextSearch });
        });
      } else {
        setUrlState({ stack: additionalSlugs, focus: newFocus });
      }
    },
    [buildNotePath, navigate, rootSlug, setUrlState]
  );

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  return useMemo(
    () => ({
      stack,
      focusIndex,
      isPending,
      pushNote,
      popNote,
      focusPane,
      setStack,
      goBack,
    }),
    [
      stack,
      focusIndex,
      isPending,
      pushNote,
      popNote,
      focusPane,
      setStack,
      goBack,
    ]
  );
}
