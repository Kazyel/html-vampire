import type Player from './player';

import GameEntityObject from './game-entity-object';

const DEFAULT_EXP_WIDTH = 10;
const DEFAULT_EXP_HEIGHT = 10;

class ExperiencePoint extends GameEntityObject {
  public shouldRemove: boolean;
  public value: number;

  constructor(x: number, y: number, value: number = 50) {
    super(x + DEFAULT_EXP_WIDTH / 2, y + DEFAULT_EXP_HEIGHT / 2, '#77ee50');
    this.width = DEFAULT_EXP_WIDTH;
    this.height = DEFAULT_EXP_HEIGHT;

    this.value = value;
    this.shouldRemove = false;
  }

  public checkPlayerExpRange(player: Player): boolean {
    const { expRangeCircle } = player;

    const closestX = Math.max(
      this.x,
      Math.min(expRangeCircle.x, this.x + this.width)
    );
    const closestY = Math.max(
      this.y,
      Math.min(expRangeCircle.y, this.y + this.height)
    );

    const distanceX = expRangeCircle.x - closestX;
    const distanceY = expRangeCircle.y - closestY;

    const distanceSquared = distanceX * distanceX + distanceY * distanceY;
    const radiusSquared = expRangeCircle.radius * expRangeCircle.radius;

    return distanceSquared <= radiusSquared;
  }
}

export default ExperiencePoint;
