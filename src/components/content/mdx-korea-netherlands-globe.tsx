"use client";

import { useEffect, useRef } from "react";
import { useResolvedShellTheme } from "@/lib/shell-theme";
import { cn } from "@/lib/utils";
import styles from "./korea-netherlands-globe.module.css";

export function KoreaNetherlandsGlobe({ lang = "en" }: { lang?: "en" | "ko" | string }) {
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
      let startTheta = 0.3;

      const clamp = (value: number, min: number, max: number) =>
        Math.min(Math.max(value, min), max);

      const toAngles = (latitude: number, longitude: number): [number, number] => [
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
        targetTheta = clamp(startTheta + (deltaY / safeWidth) * Math.PI, -Math.PI / 2, Math.PI / 2);
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
        canvasRef.current?.removeEventListener("pointerdown", handlePointerDown);
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
    netherlands: lang === "ko" ? "네덜란드 · 암스테르담" : "Netherlands · Amsterdam",
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
