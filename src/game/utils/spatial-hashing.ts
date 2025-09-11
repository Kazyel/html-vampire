import type Enemy from '../models/entities/enemy';
import type ExperiencePoint from '../models/entities/drops/experience-point';
import type GameEntityObject from '../models/entities/game-entity-object';
import type Player from '../models/entities/player';
import type Chest from '../models/entities/drops/chest';

export type PossibleEntities = Enemy | ExperiencePoint | Chest;
export type SpatialGrid<T extends PossibleEntities> = Map<string, Array<T>>;

const CELL_SIZE = 100;

export const getCellId = (x: number, y: number) => {
  const cellX = Math.floor(x / CELL_SIZE);
  const cellY = Math.floor(y / CELL_SIZE);
  return `${cellX}-${cellY}`;
};

export const buildSpatialGrid = <T extends PossibleEntities>(
  entities: Array<T>
) => {
  const spatialGrid = new Map<string, Array<T>>();

  for (const entity of entities) {
    const cellId = getCellId(entity.x, entity.y);

    if (!spatialGrid.has(cellId)) {
      spatialGrid.set(cellId, []);
    }

    spatialGrid.get(cellId)!.push(entity);
  }

  return spatialGrid;
};

export const getPotentialColliders = <T extends PossibleEntities>(
  entity: GameEntityObject,
  spatialGrid: SpatialGrid<T>
): Array<T> => {
  const cellId = getCellId(entity.x, entity.y);

  const [cellX, cellY] = cellId.split('-').map(Number);
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

export const getPotentialCollidersWithinRange = <T extends PossibleEntities>(
  player: Player,
  spatialGrid: SpatialGrid<T>
): Array<T> => {
  const minX = player.x - player.expRangeCircle.radius;
  const maxX = player.x + player.expRangeCircle.radius;
  const minY = player.y - player.expRangeCircle.radius;
  const maxY = player.y + player.expRangeCircle.radius;

  const startCellX = Math.floor(minX / CELL_SIZE);
  const endCellX = Math.floor(maxX / CELL_SIZE);
  const startCellY = Math.floor(minY / CELL_SIZE);
  const endCellY = Math.floor(maxY / CELL_SIZE);

  const potentialColliders: Array<T> = [];

  for (let y = startCellY; y <= endCellY; y++) {
    for (let x = startCellX; x <= endCellX; x++) {
      const cellId = `${x}-${y}`;

      if (spatialGrid.has(cellId)) {
        potentialColliders.push(...spatialGrid.get(cellId)!);
      }
    }
  }

  return potentialColliders;
};
