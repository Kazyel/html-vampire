import type Enemy from "../models/entities/enemy";
import type ExperiencePoint from "../models/entities/experience-point";

export type PossibleEntities = Enemy | ExperiencePoint;
export type SpatialGrid<T extends PossibleEntities> = Map<string, Array<T>>;

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

export const getPotentialColliders = <T extends PossibleEntities>(
  x: number,
  y: number,
  spatialGrid: SpatialGrid<T>
): Array<T> => {
  const cellId = getCellId(x, y);

  const [cellX, cellY] = cellId.split("-").map(Number);
  const potentialColliders: Array<T> = [];

  for (let y = cellY - 1; y <= cellY + 1; y++) {
    for (let x = cellX - 1; x <= cellX + 1; x++) {
      const neighborId = `${x}-${y}`;

      if (spatialGrid.has(neighborId)) {
        potentialColliders.push(...spatialGrid.get(neighborId)!);
      }
    }
  }

  return potentialColliders;
};
