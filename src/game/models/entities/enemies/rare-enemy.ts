import type GameEngine from '@/game/core/game-engine';

import Enemy from '../enemy';
import Chest from '../drops/chest';

import { NORMAL_CHEST_SIZE } from '@/constants/dimensions';

const DEFAULT_COLOR = '#ff0000cc';
const DEFAULT_EXPERIENCE_DROP_VALUE = 150;
const DEFAULT_HEALTH = 500;
const DEFAULT_DAMAGE = 5;
const DEFAULT_MOVEMENT_SPEED = 35;
const DEFAULT_TYPE = 'rare';

class RareEnemy extends Enemy {
  constructor(x: number, y: number) {
    super(
      x,
      y,
      DEFAULT_COLOR,
      DEFAULT_DAMAGE,
      DEFAULT_HEALTH,
      DEFAULT_MOVEMENT_SPEED,
      DEFAULT_EXPERIENCE_DROP_VALUE,
      DEFAULT_TYPE
    );

    super.growEntity(20, 20);
  }

  public dropRareItem(ctx: GameEngine) {
    const entityMiddleX = this.x + this.width / 2;
    const entityMiddleY = this.y + this.height / 2;

    const chestSpawnX = entityMiddleX - NORMAL_CHEST_SIZE / 2;
    const chestSpawnY = entityMiddleY - NORMAL_CHEST_SIZE / 2;

    new Chest(chestSpawnX, chestSpawnY).spawn(ctx);
  }
}

export default RareEnemy;
