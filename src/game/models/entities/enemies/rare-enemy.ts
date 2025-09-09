import type GameEngine from '@/game/core/game-engine';

import Enemy from '../enemy';
import ExperiencePoint from '../drops/experience-point';
import Chest from '../drops/chest';

import { EXPERIENCE_SIZE, NORMAL_CHEST_SIZE } from '@/constants/dimensions';

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

  public onDeathUpdate(ctx: GameEngine) {
    this.shouldRemove = true;

    const chestSpawnX = this.x + this.width / 2 - NORMAL_CHEST_SIZE / 2;
    const chestSpawnY = this.y + this.height / 2 - NORMAL_CHEST_SIZE / 2;

    const expSpawnX = this.x + this.width / 2 - EXPERIENCE_SIZE / 2;
    const expSpawnY = this.y + this.height / 2 - EXPERIENCE_SIZE / 2;

    new ExperiencePoint(expSpawnX, expSpawnY, this.experienceDropValue).spawn(
      ctx
    );

    new Chest(chestSpawnX, chestSpawnY).spawn(ctx);
  }
}

export default RareEnemy;
