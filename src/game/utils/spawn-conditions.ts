import type Camera from '../core/camera';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/constants/dimensions';

export const checkOutsideCamera = (camera: Camera) => {
  let spawnX: number = 0;
  let spawnY: number = 0;

  const side = Math.floor(Math.random() * 4);
  const SPAWN_MARGIN = 25;

  switch (side) {
    case 0:
      spawnX = camera.x + Math.random() * CANVAS_WIDTH;
      spawnY = camera.y - SPAWN_MARGIN;
      break;
    case 1:
      spawnX = camera.x + Math.random() * CANVAS_WIDTH;
      spawnY = camera.y + CANVAS_HEIGHT + SPAWN_MARGIN;
      break;
    case 2:
      spawnX = camera.x - SPAWN_MARGIN;
      spawnY = camera.y + Math.random() * CANVAS_HEIGHT;
      break;
    case 3:
      spawnX = camera.x + CANVAS_WIDTH + SPAWN_MARGIN;
      spawnY = camera.y + Math.random() * CANVAS_HEIGHT;
      break;
  }

  return [spawnX, spawnY];
};
