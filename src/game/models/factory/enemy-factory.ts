import type Enemy from '../entities/enemy';

import RareEnemy from '../entities/enemies/rare-enemy';
import SmallEnemy from '../entities/enemies/small-enemy';

class EnemyFactory {
  public createEnemy(type: 'small' | 'rare', x: number, y: number): Enemy {
    switch (type) {
      case 'small':
        return new SmallEnemy(x, y);
      case 'rare':
        return new RareEnemy(x, y);
      default:
        throw new Error(`Unknown enemy type: ${type}`);
    }
  }
}

export default EnemyFactory;
