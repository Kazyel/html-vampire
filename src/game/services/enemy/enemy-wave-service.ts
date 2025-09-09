import type GameEngine from '../../core/game-engine';

import { checkOutsideCamera } from '../../utils/spawn-conditions';
import Enemy from '../../models/entities/enemy';

const MAX_ENTITY_SPAWN = 75;
const ENEMIES_PER_WAVE = 15;
const DEFAULT_SPAWN_RATE = 1500;

class EnemyWaveService {
  public spawnRate: number;
  public spawnTimer: number;

  constructor() {
    this.spawnRate = DEFAULT_SPAWN_RATE;
    this.spawnTimer = 0;
  }

  public canSpawnWave(tick: number): boolean {
    this.spawnTimer += tick;
    if (this.spawnTimer >= this.spawnRate) {
      this.spawnTimer -= this.spawnRate;
      return true;
    }
    return false;
  }

  public generateWave(ctx: GameEngine, enemies: Array<Enemy>): void {
    for (let i = 0; i < ENEMIES_PER_WAVE; i++) {
      if (enemies.length >= MAX_ENTITY_SPAWN) {
        return;
      }

      const { camera } = ctx.state;
      const [spawnX, spawnY] = checkOutsideCamera(camera);
      const newEnemy = new Enemy(spawnX, spawnY, 'blue');
      enemies.push(newEnemy);
    }
  }
}

export default EnemyWaveService;
