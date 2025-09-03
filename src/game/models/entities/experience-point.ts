import type Player from "./player";

import GameEntityObject from "./game-entity-object";

const DEFAULT_EXP_WIDTH = 10;
const DEFAULT_EXP_HEIGHT = 10;

class ExperiencePoint extends GameEntityObject {
  public shouldRemove: boolean;
  public value: number;

  constructor(x: number, y: number, value: number = 50) {
    super(x + DEFAULT_EXP_WIDTH / 2, y + DEFAULT_EXP_HEIGHT / 2, "#77ee50");
    this.width = DEFAULT_EXP_WIDTH;
    this.height = DEFAULT_EXP_HEIGHT;

    this.value = value;
    this.shouldRemove = false;
  }

  public checkPlayerRange(player: Player): boolean {
    const { x, y, width, height, expPickupRange } = player;

    const leftSize = this.x < x + expPickupRange + width;
    const rightSize = this.x + this.width > x - expPickupRange;
    const topSize = this.y < y + height + expPickupRange;
    const bottomSize = this.y + this.height > y;

    const isTouchingX = leftSize && rightSize;
    const isTouchingY = topSize && bottomSize;
    return isTouchingX && isTouchingY;
  }
}

export default ExperiencePoint;
