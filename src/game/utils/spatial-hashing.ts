import type { PossibleEntities } from "../services/game-collision-manager";

const CELL_SIZE = 100;

export const getCellId = (x: number, y: number) => {
  const cellX = Math.floor(x / CELL_SIZE);
  const cellY = Math.floor(y / CELL_SIZE);
  return `${cellX}-${cellY}`;
};

export const buildSpatialGrid = <T extends PossibleEntities>(enemies: Array<T>) => {
  const spatialGrid = new Map<string, Array<T>>();

  for (const enemy of enemies) {
    const cellId = getCellId(enemy.x, enemy.y);
    if (!spatialGrid.has(cellId)) {
      spatialGrid.set(cellId, []);
    }
    spatialGrid.get(cellId)!.push(enemy);
  }

  return spatialGrid;
};
