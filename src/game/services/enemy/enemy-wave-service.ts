import type GameEngine from '../../core/game-engine';

import Enemy from '../../models/entities/enemy';
import EnemyFactory from '@/game/models/factory/enemy-factory';

import { checkOutsideCamera } from '../../utils/spawn-conditions';

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

  public generateWave(ctx: GameEngine, currentEnemies: Array<Enemy>): void {
    for (let i = 0; i < ENEMIES_PER_WAVE; i++) {
      if (currentEnemies.length >= MAX_ENTITY_SPAWN) {
        return;
      }

      const { camera } = ctx.state;
      const [spawnX, spawnY] = checkOutsideCamera(camera);

      const shouldSpawnRare = Math.floor(Math.random() * 200);
      const type = shouldSpawnRare >= 199 ? 'rare' : 'small';

      const enemyFactory = new EnemyFactory();

      switch (type) {
        case 'rare':
          currentEnemies.push(enemyFactory.createEnemy('rare', spawnX, spawnY));
          continue;
        case 'small':
          currentEnemies.push(
            enemyFactory.createEnemy('small', spawnX, spawnY)
          );
      }
    }
  }
}

export default EnemyWaveService;
