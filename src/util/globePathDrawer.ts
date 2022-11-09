import { Coordinate } from './coordinate';

export const globePathDrawer = (
  start: Coordinate,
  end: Coordinate,
  step: number,
  pathDotSize: number,
) => {
  const path: Coordinate[] = [];
  const [startX, startY] = start.location;
  const [endX, endY] = end.location;

  const dx = endX - startX;
  const dy = endY - startY;

  const stepX = dx / step;
  const stepY = dy / step;

  path.push(start);
  for (let i = 1; i < step - 1; i++) {
    const x = startX + stepX * i;
    const y = startY + stepY * i;
    path.push({ location: [x, y], size: pathDotSize });
  }
  path.push(end);

  return path;
};
