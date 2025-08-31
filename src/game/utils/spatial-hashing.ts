import type Enemy from "../models/entities/enemy";

const CELL_SIZE = 100;

export const getCellId = (x: number, y: number) => {
  const cellX = Math.floor(x / CELL_SIZE);
  const cellY = Math.floor(y / CELL_SIZE);
  return `${cellX}-${cellY}`;
};

export const buildSpatialGrid = (enemies: Array<Enemy>) => {
  const spatialGrid = new Map<string, Array<Enemy>>();

  for (const enemy of enemies) {
    const cellId = getCellId(enemy.x, enemy.y);
    if (!spatialGrid.has(cellId)) {
      spatialGrid.set(cellId, []);
    }
    spatialGrid.get(cellId)!.push(enemy);
  }

  return spatialGrid;
};
