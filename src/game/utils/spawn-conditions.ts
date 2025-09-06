import type Player from '@/game/models/entities/player';
import type Camera from '../core/camera';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/constants/dimensions';

const PLAYER_SAFE_RADIUS = 800;

export const checkSpawnRadius = (
  player: Player,
  coords: { x: number; y: number },
) => {
  const dx = player.x - coords.x;
  const dy = player.y - coords.y;

  return dx * dx + dy * dy <= PLAYER_SAFE_RADIUS * PLAYER_SAFE_RADIUS;
};

export const getSafeSpawnPosition = (player: Player) => {
  const angle = Math.random() * 2 * Math.PI;
  const spawnX = player.x + PLAYER_SAFE_RADIUS * Math.cos(angle);
  const spawnY = player.y + PLAYER_SAFE_RADIUS * Math.sin(angle);

  return { x: spawnX, y: spawnY };
};

export const checkOutsideCamera = (camera: Camera) => {
  let spawnX: number = 0;
  let spawnY: number = 0;

  const side = Math.floor(Math.random() * 4);
  const SPAWN_MARGIN = 50;

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
