import type GameManager from './game-manager';

import EnemyWaveService from '../services/enemy/enemy-wave-service';

class GameEnemyManager {
  private waveService: EnemyWaveService;

  constructor() {
    this.waveService = new EnemyWaveService();
  }

  public update(ctx: GameManager): void {
    const activeEnemies = ctx.state.enemies;

    if (this.waveService.canSpawnWave(ctx.LOGIC_TICK)) {
      this.waveService.generateWave(ctx, activeEnemies);
    }

    for (const enemy of activeEnemies) {
      enemy.attackPlayer(ctx);
    }
  }
}

export default GameEnemyManager;
