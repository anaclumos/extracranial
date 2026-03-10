"use client";

import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AnimatePresence,
  animate,
  type MotionValue,
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "motion/react";
import { memo, useCallback, useEffect, useRef } from "react";
import { BacklinksSection } from "@/components/backlinks-section";
import { MdxNoteContent } from "@/components/content/mdx-components";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTranslations } from "@/i18n/provider";
import { reducedMotionTransition, springSubtle } from "@/lib/animations";
import type { NotePaneData } from "@/lib/types";

interface MobilePaneCarouselProps {
  focusIndex: number;
  onClose: (index: number) => void;
  onLinkClick: (slug: string, fromIndex: number) => void;
  panes: NotePaneData[];
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function calculatePaneTransform(
  index: number,
  progress: number,
  prefersReducedMotion: boolean
) {
  const offset = (index - progress) * 200;
  const distance = Math.abs(offset);

  return {
    x: (index - progress) * 260,
    rotateY: prefersReducedMotion ? 0 : clamp(-20, offset * 0.1, 20),
    scale: prefersReducedMotion ? 1 : clamp(0.8, 1 - distance * 0.001, 1),
    opacity: clamp(0.3, 1 - distance * 0.0015, 1),
    zIndex: Math.max(0, Math.round(100 - distance)),
  };
}

function calculateDragTarget(
  currentIndex: number,
  velocity: number,
  offsetX: number,
  cardWidth: number,
  maxIndex: number
) {
  if (Math.abs(velocity) > 400) {
    return clamp(
      0,
      velocity < 0 ? Math.ceil(currentIndex) : Math.floor(currentIndex),
      maxIndex
    );
  }

  if (Math.abs(offsetX) > cardWidth * 0.15) {
    return clamp(
      0,
      offsetX < 0 ? Math.ceil(currentIndex) : Math.floor(currentIndex),
      maxIndex
    );
  }

  return clamp(0, Math.round(currentIndex), maxIndex);
}

function usePaneTransforms({
  index,
  progress,
  prefersReducedMotion,
}: {
  index: number;
  progress: MotionValue<number>;
  prefersReducedMotion: boolean;
}) {
  const all = useTransform(progress, (value) =>
    calculatePaneTransform(index, value, prefersReducedMotion)
  );
  const x = useTransform(all, (t) => t.x);
  const rotateY = useTransform(all, (t) => t.rotateY);
  const scale = useTransform(all, (t) => t.scale);
  const opacity = useTransform(all, (t) => t.opacity);
  const zIndex = useTransform(all, (t) => t.zIndex);

  return { x, rotateY, scale, opacity, zIndex };
}

const paneVariants = {
  initial: { opacity: 0, scale: 0.92, x: 40 },
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.92, x: -40 },
};

const SliderNotch = memo(function SliderNotch({
  activeIndex,
  ariaLabel,
  index,
  onTap,
}: {
  activeIndex: MotionValue<number>;
  ariaLabel: string;
  index: number;
  onTap: (index: number) => void;
}) {
  const distance = useTransform(activeIndex, (value) =>
    Math.abs(Math.round(value) - index)
  );
  const scaleY = useTransform(distance, (value) => (value === 0 ? 1 : 0.5));
  const opacity = useTransform(distance, (value) => (value === 0 ? 1 : 0.3));

  return (
    <button
      aria-label={ariaLabel}
      className="flex h-10 touch-none items-center justify-center px-1"
      onClick={() => onTap(index)}
      type="button"
    >
      <motion.div
        className="h-6 w-1.5 bg-foreground"
        style={{ opacity, scaleY, transformOrigin: "center" }}
      />
    </button>
  );
});

function MobilePaneContent({
  closeLabel,
  isClosable,
  onClose,
  onLinkClick,
  pane,
}: {
  closeLabel: string;
  isClosable: boolean;
  onClose: () => void;
  onLinkClick: (slug: string) => void;
  pane: NotePaneData;
}) {
  return (
    <>
      <ScrollArea className="h-full">
        <div className="p-5 pb-10">
          <header className="mb-4 pr-8">
            <h1 className="font-semibold text-foreground text-xl leading-snug">
              {pane.title}
            </h1>
            {pane.description && (
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {pane.description}
              </p>
            )}
          </header>
          <MdxNoteContent
            onLinkClick={onLinkClick}
            source={pane.serializedContent}
          />
          {pane.backlinks.length > 0 && (
            <footer className="mt-6 border-border/40 border-t pt-4">
              <BacklinksSection
                backlinks={pane.backlinks}
                onBacklinkClick={onLinkClick}
              />
            </footer>
          )}
        </div>
      </ScrollArea>

      {isClosable && (
        <button
          aria-label={closeLabel}
          className="absolute top-3 right-3 z-50 flex size-7 items-center justify-center rounded-full bg-muted/80 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          type="button"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={1.5} />
        </button>
      )}
    </>
  );
}

const MobilePaneCard = memo(function MobilePaneCard({
  closeLabel,
  index,
  isClosable,
  onClose,
  onLinkClick,
  pane,
  prefersReducedMotion,
  progress,
}: {
  closeLabel: string;
  index: number;
  isClosable: boolean;
  onClose: (index: number) => void;
  onLinkClick: (slug: string, index: number) => void;
  pane: NotePaneData;
  prefersReducedMotion: boolean;
  progress: MotionValue<number>;
}) {
  const transition = prefersReducedMotion
    ? reducedMotionTransition
    : springSubtle;
  const { x, rotateY, scale, opacity, zIndex } = usePaneTransforms({
    index,
    progress,
    prefersReducedMotion,
  });

  return (
    <motion.li
      animate="animate"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      exit="exit"
      initial={prefersReducedMotion ? false : "initial"}
      style={{ zIndex }}
      transition={transition}
      variants={paneVariants}
    >
      <motion.article
        className="pointer-events-auto h-full w-[92dvw] overflow-hidden rounded-2xl border border-border bg-background shadow-lg"
        style={{
          opacity,
          rotateY,
          scale,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
          x,
        }}
      >
        <MobilePaneContent
          closeLabel={closeLabel}
          isClosable={isClosable}
          onClose={() => onClose(index)}
          onLinkClick={(slug) => onLinkClick(slug, index)}
          pane={pane}
        />
      </motion.article>
    </motion.li>
  );
});

export const MobilePaneCarousel = memo(function MobilePaneCarousel({
  panes,
  onLinkClick,
  onClose,
  focusIndex,
}: MobilePaneCarouselProps) {
  const t = useTranslations("mobileCarousel");
  const tPane = useTranslations("notePane");
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useMotionValue(focusIndex);
  const isDragging = useRef(false);
  const dragStartIndex = useRef(focusIndex);
  const previousLength = useRef(panes.length);

  const animateToIndex = useCallback(
    (index: number) => {
      const nextIndex = clamp(0, index, Math.max(0, panes.length - 1));
      if (prefersReducedMotion) {
        currentIndex.set(nextIndex);
        return;
      }
      animate(currentIndex, nextIndex, {
        type: "spring",
        duration: 0.5,
        bounce: 0.12,
      });
    },
    [currentIndex, panes.length, prefersReducedMotion]
  );

  useEffect(() => {
    const panesAdded = panes.length > previousLength.current;
    previousLength.current = panes.length;
    dragStartIndex.current = focusIndex;

    if (isDragging.current) {
      return;
    }

    if (panesAdded) {
      requestAnimationFrame(() => animateToIndex(focusIndex));
      return;
    }

    animateToIndex(focusIndex);
  }, [animateToIndex, focusIndex, panes.length]);

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
    dragStartIndex.current = currentIndex.get();
  }, [currentIndex]);

  const handleDrag = useCallback(
    (_: unknown, info: PanInfo) => {
      const cardWidth = containerRef.current?.offsetWidth ?? 350;
      const dragProgress = -info.offset.x / cardWidth;
      currentIndex.set(
        clamp(-0.15, dragStartIndex.current + dragProgress, panes.length - 0.85)
      );
    },
    [currentIndex, panes.length]
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      isDragging.current = false;
      const cardWidth = containerRef.current?.offsetWidth ?? 350;
      const nextIndex = calculateDragTarget(
        currentIndex.get(),
        info.velocity.x,
        info.offset.x,
        cardWidth,
        Math.max(0, panes.length - 1)
      );
      dragStartIndex.current = nextIndex;
      animateToIndex(nextIndex);
    },
    [animateToIndex, currentIndex, panes.length]
  );

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center overflow-hidden bg-background">
      <div className="flex h-10 w-full items-center justify-center px-4">
        <div className="flex h-10 items-end justify-center">
          {panes.map((pane, index) => (
            <SliderNotch
              activeIndex={currentIndex}
              ariaLabel={t("goToNote", {
                position: index + 1,
                title: pane.title,
              })}
              index={index}
              key={`notch-${pane.slug}`}
              onTap={animateToIndex}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="relative flex w-full flex-1 cursor-grab items-center justify-center overflow-hidden active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        ref={containerRef}
        style={{ perspective: 1000 }}
      >
        <ul className="relative h-full w-full">
          <AnimatePresence initial={false} mode="sync">
            {panes.map((pane, index) => (
              <MobilePaneCard
                closeLabel={tPane("closeNote", { title: pane.title })}
                index={index}
                isClosable={index > 0}
                key={`pane-${pane.slug}`}
                onClose={onClose}
                onLinkClick={onLinkClick}
                pane={pane}
                prefersReducedMotion={prefersReducedMotion}
                progress={currentIndex}
              />
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>
    </div>
  );
});
