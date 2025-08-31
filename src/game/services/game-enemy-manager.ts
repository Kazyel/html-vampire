import type GameManager from "../core/game-manager";

import Enemy from "../models/entities/enemy";
import { checkOutsideCamera } from "../utils/spawn-conditions";

const MAX_ENTITY_SPAWN = 25;
const ENEMIES_PER_WAVE = 5;
const DEFAULT_SPAWN_RATE = 2000; // -> milliseconds

class GameEnemyManager {
  spawnRate: number;
  spawnTimer: number;
  spawned: Array<Enemy>;

  constructor() {
    this.spawnRate = DEFAULT_SPAWN_RATE;
    this.spawnTimer = 0;
    this.spawned = [];
  }

  canSpawnWave(tick: number): boolean {
    this.spawnTimer += tick;
    if (this.spawnTimer >= this.spawnRate) {
      this.spawnTimer -= this.spawnRate;
      return true;
    }
    return false;
  }

  createEnemy(ctx: GameManager): void {
    const { camera } = ctx.state;
    const [spawnX, spawnY] = checkOutsideCamera(camera);
    const newEnemy = new Enemy(spawnX, spawnY, "blue");
    this.spawned.push(newEnemy);
  }

  spawn(ctx: GameManager): void {
    for (let i = 0; i < ENEMIES_PER_WAVE; i++) {
      if (this.spawned.length >= MAX_ENTITY_SPAWN) {
        return;
      }

      this.createEnemy(ctx);
    }
  }
}

export default GameEnemyManager;
