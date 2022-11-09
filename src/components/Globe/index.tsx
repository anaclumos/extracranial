import createGlobe from 'cobe';
import { Marker } from 'cobe';
import React from 'react';
import { useEffect, useRef } from 'react';
import styles from './index.module.css';
import { useSpring } from 'react-spring';

const seoul: Marker = {
  location: [37.5665, 126.978],
  size: 0.05,
};
const losangeles: Marker = {
  location: [34.0522, 241.7563],
  size: 0.05,
};

const markers: Marker[] = [seoul, losangeles];

export const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  if (!canvasRef) {
    return null;
  }
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 0.1,
      tension: 100,
      friction: 40,
      precision: 0.001,
    },
  }));
  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: (23.5 * Math.PI) / 180,
      dark: 1,
      diffuse: 0.2,
      mapSamples: 24000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [121 / 256, 181 / 256, 242 / 256],
      glowColor: [0.5, 0.5, 0.5],
      markers: markers,
      onRender: (state) => {
        state.phi = phi + r.get();
        phi += 0.005;
        state.width = width * 2;
        state.height = width * 2;
      },
    });
    setTimeout(() => (canvasRef.current.style.opacity = '1'));
    return () => globe.destroy();
  }, []);
  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.globe}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 200,
            });
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 100,
            });
          }
        }}
      />
    </div>
  );
};
